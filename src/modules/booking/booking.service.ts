import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schema/booking.schema';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    userId: string,
  ): Promise<BookingDocument> {
    const { lab, date, slot } = createBookingDto;

    const exists = await this.bookingModel
      .exists({
        lab,
        date,
        slot,
      })
      .lean();

    if (exists) {
      throw new ConflictException('This slot has been booked');
    }

    const booking = new this.bookingModel({
      ...createBookingDto,
      user: userId,
    });

    return booking.save();
  }

  async createMany(
    dto: CreateMultipleBookingsDto,
    userId: string,
  ): Promise<Booking[]> {
    // Bước 1: Kiểm tra các slot đã được đặt chưa
    const conflicts = await Promise.all(
      dto.bookings.map((item) =>
        this.bookingModel.exists({
          lab: item.lab,
          date: item.date,
          slot: item.slot,
        }),
      ),
    );

    const conflictIndex = conflicts.findIndex((exist) => exist);
    if (conflictIndex !== -1) {
      const { date, slot } = dto.bookings[conflictIndex];
      throw new ConflictException(`Slot ${slot} at ${date} has been booked`);
    }

    const documents = dto.bookings.map((item) => ({
      ...item,
      user: userId,
    }));

    try {
      const result = await Promise.all(
        documents.map((doc) => this.bookingModel.create(doc)),
      );
      return result;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'A slot has already been reserved at creation. Please try again.',
        );
      }
      throw new InternalServerErrorException('Cannot create booking');
    }
  }

  async getBookingsByLabAndDateRange(
    labId: string,
    from: string,
    to: string,
  ): Promise<Record<string, Record<number, any>>> {
    type PopulatedUser = {
      _id: string;
      fullName: string;
      email: string;
    };

    type PopulatedBooking = {
      date: Date;
      slot: number;
      user: PopulatedUser;
    };

    const bookings = (await this.bookingModel
      .find({
        lab: labId,
        date: { $gte: from, $lte: to },
      })
      .populate('user', '_id fullName email')
      .lean()) as unknown as PopulatedBooking[];

    const result: Record<string, Record<number, any>> = {};

    for (const booking of bookings) {
      if (!result[booking.date.toISOString()]) {
        result[booking.date.toISOString()] = {};
      }

      result[booking.date.toISOString()][booking.slot] = {
        status: 'booked',
        user: {
          _id: booking.user._id,
          fullName: booking.user.fullName,
          email: booking.user.email,
        },
      };
    }

    return result;
  }
}
