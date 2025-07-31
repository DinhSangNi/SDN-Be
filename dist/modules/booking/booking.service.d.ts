import { BookingDocument } from './schema/booking.schema';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';
import { Connection } from 'mongoose';
import { LabService } from '../lab/lab.service';
import { SeatService } from '../seat/seat.service';
import { CancelManyBookingDto } from './dto/cancel-many-booking.dto';
import { GetBookingQueryDto } from './dto/get-bookings-query.dto';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
import { UserRole } from 'src/common/types/enums';
import { MailService } from '../mail/mail.service';
export declare class BookingService {
    private readonly connection;
    private bookingModel;
    private readonly labService;
    private readonly seatService;
    private readonly mailService;
    constructor(connection: Connection, bookingModel: Model<BookingDocument>, labService: LabService, seatService: SeatService, mailService: MailService);
    create(dto: CreateBookingDto, userId: string): Promise<BookingDocument>;
    createMany(dto: CreateMultipleBookingsDto, userId: string): Promise<BookingDocument[]>;
    getBookingsByLabAndDateRange(labId: string, from: string, to: string): Promise<Record<string, Record<number, any>>>;
    findSeatsWithBooking(labId: string, date: string, slot: number): Promise<any[]>;
    cancelBooking(bookingId: string, userId: string, role: UserRole): Promise<BookingDocument>;
    cancelManyBookings(dto: CancelManyBookingDto): Promise<BookingDocument[]>;
    getAllBookings(query: GetBookingQueryDto): Promise<PaginatedResponse<BookingDocument>>;
}
