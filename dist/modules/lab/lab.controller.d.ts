import { LabService } from './lab.service';
import { CreateLabDto } from './dto/create-lab.dto';
import { Response } from 'express';
import { BookingService } from '../booking/booking.service';
import { GetLabsQuery } from './dto/get-labs-query';
export declare class LabController {
    private readonly labService;
    private readonly bookingService;
    constructor(labService: LabService, bookingService: BookingService);
    getLabs(query: GetLabsQuery, res: Response): Promise<Response<any, Record<string, any>>>;
    createLab(req: {
        user: {
            userId: string;
        };
    }, createLabDto: CreateLabDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getLabById(labId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getSeatsWithBooking(labId: string, date: string, slot: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
