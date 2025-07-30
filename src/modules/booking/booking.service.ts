import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schema/booking.schema';
import { Model, SortOrder, Types } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';
import { BookingStatus } from './types/booking.enum';
import { Connection } from 'mongoose';
import { LabService } from '../lab/lab.service';
import { SeatService } from '../seat/seat.service';
import { CancelManyBookingDto } from './dto/cancel-many-booking.dto';
import { GetBookingQueryDto } from './dto/get-bookings-query.dto';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
import { UserRole } from 'src/common/types/enums';

@Injectable()
export class BookingService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly labService: LabService,
    private readonly seatService: SeatService,
  ) {}

  async create(
    dto: CreateBookingDto,
    userId: string,
  ): Promise<BookingDocument> {
    const { labId, seatId, date, slot, status } = dto;

    const existing = await this.bookingModel.findOne({
      lab: new Types.ObjectId(labId),
      seat: new Types.ObjectId(seatId),
      date,
      slot,
      status: BookingStatus.APPROVED,
    });

    if (existing) {
      throw new BadRequestException(
        'Seat has already been booked for this time',
      );
    }

    const created = await this.bookingModel.create({
      user: new Types.ObjectId(userId),
      lab: new Types.ObjectId(labId),
      seat: new Types.ObjectId(seatId),
      date,
      slot,
      status: status ?? BookingStatus.APPROVED,
    });

    return created;
  }

  async createMany(
    dto: CreateMultipleBookingsDto,
    userId: string,
  ): Promise<BookingDocument[]> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const createdBookings: BookingDocument[] = [];

      const { bookings } = dto;

      for (const booking of bookings) {
        const { labId, seatId, date, slot, status } = booking;

        const exists = await this.bookingModel
          .findOne({ lab: labId, seat: seatId, date, slot })
          .session(session);
        if (exists) {
          throw new BadRequestException(
            `Seat ${seatId} already booked on ${date.toString()} for slot ${slot}`,
          );
        }

        const created = await this.bookingModel.create(
          [
            {
              user: new Types.ObjectId(userId),
              lab: new Types.ObjectId(labId),
              seat: new Types.ObjectId(seatId),
              date,
              slot,
              status: status ?? BookingStatus.APPROVED,
            },
          ],
          { session },
        );

        createdBookings.push(created[0]);
      }

      await session.commitTransaction();
      session.endSession();

      return createdBookings;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(
        `Create many bookings failed: ${error.message}`,
      );
    }
  }

  async getBookingsByLabAndDateRange(
    labId: string,
    from: string,
    to: string,
  ): Promise<Record<string, Record<number, any>>> {
    const bookings = await this.bookingModel
      .find({
        lab: new Types.ObjectId(labId),
        date: { $gte: from, $lte: to },
        status: BookingStatus.APPROVED,
      })
      .lean();

    const lab = await this.labService.findById(labId);

    const result: Record<string, Record<number, any>> = {};

    for (const booking of bookings) {
      const dateKey = booking.date.toISOString();
      const slot = booking.slot;

      if (!result[dateKey]) {
        result[dateKey] = {};
      }

      if (!result[dateKey][slot]) {
        result[dateKey][slot] = {
          bookedSeats: 0,
          totalSeats: lab?.totalSeats ?? 0,
          status: 'available',
        };
      }

      result[dateKey][slot].bookedSeats += 1;

      if (result[dateKey][slot].bookedSeats >= (lab?.totalSeats ?? 0)) {
        result[dateKey][slot].status = 'full';
      }
    }

    return result;
  }

  async findSeatsWithBooking(labId: string, date: string, slot: number) {
    const startOfDay = new Date(date);

    const [seats, bookings] = await Promise.all([
      this.seatService.findByLabId(labId),
      this.bookingModel
        .find({
          lab: new Types.ObjectId(labId),
          date: startOfDay,
          slot,
          status: BookingStatus.APPROVED,
        })
        .populate('user')
        .lean(),
    ]);

    const bookingMap = new Map<string, Booking & { user: any }>();
    bookings.forEach((booking) => {
      bookingMap.set(booking.seat.toString(), booking);
    });

    const result = seats.map((seat) => {
      const booking = bookingMap.get((seat._id as Types.ObjectId).toString());
      const plainSeat = seat.toObject();
      return {
        ...plainSeat,
        isBooked: !!booking,
        booking: booking ?? null,
      };
    });

    return result;
  }

  async cancelBooking(
    bookingId: string,
    userId: string,
    role: UserRole,
  ): Promise<BookingDocument> {
    const booking = await this.bookingModel.findOne({
      _id: new Types.ObjectId(bookingId),
      status: { $ne: BookingStatus.CANCELLED },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found or already cancelled');
    }

    if (booking.user.toString() !== userId && role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        "You don't have permission to cancel this booking",
      );
    }

    booking.status = BookingStatus.CANCELLED;
    return await booking.save();
  }

  async cancelManyBookings(
    dto: CancelManyBookingDto,
  ): Promise<BookingDocument[]> {
    const { bookingIds } = dto;

    const bookings = await this.bookingModel.find({
      _id: { $in: bookingIds.map((id) => new Types.ObjectId(id)) },
      status: { $ne: BookingStatus.CANCELLED },
    });

    if (bookings.length === 0) {
      throw new NotFoundException('No valid bookings found to cancel');
    }

    const updatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        booking.status = BookingStatus.CANCELLED;
        return await booking.save();
      }),
    );

    return updatedBookings;
  }

  async getAllBookings(
    query: GetBookingQueryDto,
  ): Promise<PaginatedResponse<BookingDocument>> {
    const {
      keyword,
      labId,
      userId,
      status,
      slot,
      from,
      to,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const filter: any = {};

    if (keyword)
      filter.name = {
        $regex: keyword,
        $options: 'i',
      };
    if (labId) filter.lab = labId;
    if (userId) filter.user = userId;
    if (status) filter.status = status;
    if (slot) filter.slot = Number(slot);
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const sortOption: Record<string, SortOrder> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.bookingModel
        .find(filter)
        .populate([
          {
            path: 'user',
            select: '-password',
          },
          {
            path: 'seat',
          },
          {
            path: 'lab',
          },
        ])
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      this.bookingModel.countDocuments(filter),
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
}
