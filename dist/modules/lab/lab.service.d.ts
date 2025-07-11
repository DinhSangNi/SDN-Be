import { Model } from 'mongoose';
import { Lab, LabDocument } from './schema/lab.schema';
import { CreateLabDto } from './dto/create-lab.dto';
export declare class LabService {
    private labModel;
    constructor(labModel: Model<LabDocument>);
    create(createLabDto: CreateLabDto): Promise<LabDocument>;
    findAll(): Promise<Lab[]>;
}
