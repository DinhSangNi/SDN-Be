import { BookingStatus } from '../types/booking.enum';
export declare class CreateBookingDto {
    labId: string;
    seatId: string;
    date: string;
    slot: number;
    status?: BookingStatus;
}
