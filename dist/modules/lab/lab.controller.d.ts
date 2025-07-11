import { LabService } from './lab.service';
import { CreateLabDto } from './dto/create-lab.dto';
import { Response } from 'express';
export declare class LabController {
    private readonly labService;
    constructor(labService: LabService);
    createLab(createLabDto: CreateLabDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllLabs(res: Response): Promise<Response<any, Record<string, any>>>;
}
