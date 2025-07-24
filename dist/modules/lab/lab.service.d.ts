import { ClientSession, Connection, Model } from 'mongoose';
import { LabDocument } from './schema/lab.schema';
import { CreateLabDto } from './dto/create-lab.dto';
import { SeatService } from '../seat/seat.service';
import { UpdateLabDto } from './dto/update-lab.dto';
import { GetLabsQuery } from './dto/get-labs-query';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
export declare class LabService {
    private readonly connection;
    private labModel;
    private readonly seatService;
    constructor(connection: Connection, labModel: Model<LabDocument>, seatService: SeatService);
    getLabs(query: GetLabsQuery): Promise<PaginatedResponse<LabDocument>>;
    create(dto: CreateLabDto, userId: string): Promise<LabDocument>;
    updateById(labId: string, updateDto: UpdateLabDto, session?: ClientSession): Promise<LabDocument>;
    findAll(): Promise<LabDocument[]>;
    findById(labId: string, session?: ClientSession): Promise<LabDocument | null>;
}
