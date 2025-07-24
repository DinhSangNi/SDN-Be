import { BookingStatus } from '../types/booking.enum';
export declare class GetBookingQueryDto {
    keyword?: string;
    labId?: string;
    userId?: string;
    status?: BookingStatus;
    slot?: string;
    date?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
