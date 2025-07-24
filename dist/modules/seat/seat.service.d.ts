import { SeatDocument } from './schemas/seat.schema';
import { ClientSession, Connection, Model } from 'mongoose';
import { CreateSeatDto } from './dtos/create-seat.dto';
import { LabService } from '../lab/lab.service';
import { CreateManySeatsDto } from './dtos/create-many-seats.dto';
import { GetSeatsQueryDto } from './dtos/get-seats-query.dto';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
export declare class SeatService {
    private readonly connection;
    private seatModel;
    private readonly labService;
    constructor(connection: Connection, seatModel: Model<SeatDocument>, labService: LabService);
    create(createSeatDto: CreateSeatDto): Promise<SeatDocument>;
    createMany(dto: CreateManySeatsDto, session?: ClientSession): Promise<SeatDocument[]>;
    findAll(dto: GetSeatsQueryDto): Promise<PaginatedResponse<SeatDocument>>;
    findByLabId(labId: string): Promise<SeatDocument[]>;
}
