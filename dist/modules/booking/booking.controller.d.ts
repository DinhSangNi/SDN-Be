import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Response } from 'express';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';
import { GetBookingsByLabAndDateRangeDto } from './dto/get-bookings.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
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
}
