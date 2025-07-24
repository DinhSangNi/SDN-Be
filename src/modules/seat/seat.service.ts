import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Seat, SeatDocument } from './schemas/seat.schema';
import { ClientSession, Connection, Model, Types } from 'mongoose';
import { CreateSeatDto } from './dtos/create-seat.dto';
import { LabService } from '../lab/lab.service';
import { SeatStatus } from './types/seat.enum';
import { CreateManySeatsDto } from './dtos/create-many-seats.dto';
import { GetSeatsQueryDto } from './dtos/get-seats-query.dto';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Seat.name) private seatModel: Model<SeatDocument>,
    @Inject(forwardRef(() => LabService))
    private readonly labService: LabService,
  ) {}

  async create(createSeatDto: CreateSeatDto): Promise<SeatDocument> {
    const { seatNumber, labId, status } = createSeatDto;

    const lab = await this.labService.findById(labId);
    if (!lab) {
      throw new BadRequestException('Lab not found');
    }

    const existing = await this.seatModel.findOne({ lab: labId, seatNumber });
    if (existing) {
      throw new BadRequestException('Seat number already exists in this lab');
    }

    const seat = await this.seatModel.create({
      seatNumber,
      lab: new Types.ObjectId(labId),
      status: status || SeatStatus.AVAILABLE,
    });

    return seat;
  }

  async createMany(
    dto: CreateManySeatsDto,
    session?: ClientSession,
  ): Promise<SeatDocument[]> {
    let localSession: ClientSession | null = null;
    if (!session) {
      localSession = await this.connection.startSession();
      localSession.startTransaction();
    } else {
      localSession = session;
    }

    try {
      const seatDocs = dto.seats;

      const duplicatedSeats: string[] = [];

      const labSeatMap: Record<string, number> = {};

      for (const seat of seatDocs) {
        const exists = await this.seatModel
          .exists({
            seatNumber: seat.seatNumber,
            lab: seat.labId,
          })
          .session(localSession);

        if (exists) {
          duplicatedSeats.push(seat.seatNumber);
        } else {
          labSeatMap[seat.labId] = (labSeatMap[seat.labId] || 0) + 1;
        }
      }

      if (duplicatedSeats.length > 0) {
        throw new BadRequestException(
          `Seats already exist: ${duplicatedSeats.join(', ')}`,
        );
      }

      const inserted = await this.seatModel.insertMany(
        seatDocs.map((seatDoc) => {
          const { labId, ...rest } = seatDoc;
          return {
            ...rest,
            lab: new Types.ObjectId(labId),
          };
        }),
        { session },
      );

      for (const labId of Object.keys(labSeatMap)) {
        const additionalSeats = labSeatMap[labId];

        const lab = await this.labService.findById(labId, localSession);
        if (!lab) {
          throw new NotFoundException(`Lab with id ${labId} not found`);
        }
      }

      if (!session) {
        await localSession.commitTransaction();
      }

      return inserted;
    } catch (error) {
      if (!session && localSession?.inTransaction()) {
        await localSession.abortTransaction();
      }

      throw new InternalServerErrorException(
        'Create many seats failed: ' + error.message,
      );
    } finally {
      if (!session && localSession) {
        await localSession.endSession();
      }
    }
  }

  async findAll(
    dto: GetSeatsQueryDto,
  ): Promise<PaginatedResponse<SeatDocument>> {
    const { labId } = dto;

    const filters: Record<string, any> = {};

    if (labId) {
      filters.lab = labId;
    }

    const [seats, total] = await Promise.all([
      this.seatModel.find(filters),
      this.seatModel.countDocuments(filters),
    ]);

    return new PaginatedResponse(seats, 0, 0, total);
  }

  async findByLabId(labId: string): Promise<SeatDocument[]> {
    return await this.seatModel.find({
      lab: new Types.ObjectId(labId),
    });
  }
}
