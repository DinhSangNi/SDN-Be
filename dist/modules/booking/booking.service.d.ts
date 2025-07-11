import { Booking, BookingDocument } from './schema/booking.schema';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';
export declare class BookingService {
    private bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    create(createBookingDto: CreateBookingDto, userId: string): Promise<BookingDocument>;
    createMany(dto: CreateMultipleBookingsDto, userId: string): Promise<Booking[]>;
    getBookingsByLabAndDateRange(labId: string, from: string, to: string): Promise<Record<string, Record<number, any>>>;
}
