import { Response } from 'express';
import { SeatService } from './seat.service';
export declare class SeatController {
    private readonly seatService;
    constructor(seatService: SeatService);
    getSeatsByLabId(labId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
