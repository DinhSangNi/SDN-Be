import { SeatStatus } from '../types/seat.enum';
export declare class CreateSeatDto {
    seatNumber: string;
    labId: string;
    status?: SeatStatus;
}
