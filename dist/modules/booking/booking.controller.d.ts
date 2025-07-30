import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Response } from 'express';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';
import { GetBookingsByLabAndDateRangeDto } from './dto/get-bookings.dto';
import { CancelManyBookingDto } from './dto/cancel-many-booking.dto';
import { GetBookingQueryDto } from './dto/get-bookings-query.dto';
import { UserRole } from 'src/common/types/enums';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    getAllBookings(query: GetBookingQueryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    createBooking(createBookingDto: CreateBookingDto, req: {
        user: {
            userId: string;
        };
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    createMultipleBookings(dto: CreateMultipleBookingsDto, req: {
        user: {
            userId: string;
        };
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getBookingsByLabAndDateRange(query: GetBookingsByLabAndDateRangeDto, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelBooking(req: {
        user: {
            userId: string;
            role: UserRole;
        };
    }, labId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelBookings(body: CancelManyBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
