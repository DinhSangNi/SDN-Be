import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model, SortOrder, Types } from 'mongoose';
import { Lab, LabDocument } from './schema/lab.schema';
import { CreateLabDto } from './dto/create-lab.dto';
import { SeatService } from '../seat/seat.service';
import { SeatStatus } from '../seat/types/seat.enum';
import { UpdateLabDto } from './dto/update-lab.dto';
import { GetLabsQuery } from './dto/get-labs-query';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class LabService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Lab.name) private labModel: Model<LabDocument>,
    @Inject(forwardRef(() => SeatService))
    private readonly seatService: SeatService,
  ) {}

  async getLabs(query: GetLabsQuery): Promise<PaginatedResponse<LabDocument>> {
    const { keyword, status, page = 1, limit = 10 } = query;

    const filter: Record<string, any> = {};
    if (keyword) {
      filter.keyword = {
        $regex: keyword,
        $options: 'i',
      };
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.labModel.find(filter).skip(skip).limit(limit),
      this.labModel.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateLabDto, userId: string): Promise<LabDocument> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const existedLab = await this.labModel
        .findOne({ name: dto.name })
        .session(session);
      if (existedLab) throw new BadRequestException('Lab already exists');

      const lab = new this.labModel({
        ...dto,
        createdBy: new Types.ObjectId(userId),
      });
      await lab.save({ session });

      if (dto.autoGenerateSeats) {
        const seats = Array.from({ length: dto.totalSeats }, (_, i) => ({
          seatNumber: `A${i + 1}`,
          labId: (lab._id as Types.ObjectId).toString(),
          status: SeatStatus.AVAILABLE,
        }));

        await this.seatService.createMany({ seats }, session);
      }

      await session.commitTransaction();
      return lab;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async updateById(
    labId: string,
    updateDto: UpdateLabDto,
    session?: ClientSession,
  ): Promise<LabDocument> {
    const updatedLab = await this.labModel
      .findByIdAndUpdate(labId, updateDto, {
        new: true,
        runValidators: true,
      })
      .session(session ?? null);
    if (!updatedLab) {
      throw new NotFoundException(`Lab with id ${labId} not found`);
    }

    return updatedLab;
  }

  async findAll(): Promise<LabDocument[]> {
    return await this.labModel.find();
  }

  async findById(
    labId: string,
    session?: ClientSession,
  ): Promise<LabDocument | null> {
    return await this.labModel
      .findById(labId)
      .session(session ?? null)
      .populate('seats');
  }
}
