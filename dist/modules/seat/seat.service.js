"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const seat_schema_1 = require("./schemas/seat.schema");
const mongoose_2 = require("mongoose");
const lab_service_1 = require("../lab/lab.service");
const seat_enum_1 = require("./types/seat.enum");
const paginated_response_dto_1 = require("../../common/dto/paginated-response.dto");
let SeatService = class SeatService {
    connection;
    seatModel;
    labService;
    constructor(connection, seatModel, labService) {
        this.connection = connection;
        this.seatModel = seatModel;
        this.labService = labService;
    }
    async create(createSeatDto) {
        const { seatNumber, labId, status } = createSeatDto;
        const lab = await this.labService.findById(labId);
        if (!lab) {
            throw new common_1.BadRequestException('Lab not found');
        }
        const existing = await this.seatModel.findOne({ lab: labId, seatNumber });
        if (existing) {
            throw new common_1.BadRequestException('Seat number already exists in this lab');
        }
        const seat = await this.seatModel.create({
            seatNumber,
            lab: new mongoose_2.Types.ObjectId(labId),
            status: status || seat_enum_1.SeatStatus.AVAILABLE,
        });
        return seat;
    }
    async createMany(dto, session) {
        let localSession = null;
        if (!session) {
            localSession = await this.connection.startSession();
            localSession.startTransaction();
        }
        else {
            localSession = session;
        }
        try {
            const seatDocs = dto.seats;
            const duplicatedSeats = [];
            const labSeatMap = {};
            for (const seat of seatDocs) {
                const exists = await this.seatModel
                    .exists({
                    seatNumber: seat.seatNumber,
                    lab: seat.labId,
                })
                    .session(localSession);
                if (exists) {
                    duplicatedSeats.push(seat.seatNumber);
                }
                else {
                    labSeatMap[seat.labId] = (labSeatMap[seat.labId] || 0) + 1;
                }
            }
            if (duplicatedSeats.length > 0) {
                throw new common_1.BadRequestException(`Seats already exist: ${duplicatedSeats.join(', ')}`);
            }
            const inserted = await this.seatModel.insertMany(seatDocs.map((seatDoc) => {
                const { labId, ...rest } = seatDoc;
                return {
                    ...rest,
                    lab: new mongoose_2.Types.ObjectId(labId),
                };
            }), { session });
            for (const labId of Object.keys(labSeatMap)) {
                const additionalSeats = labSeatMap[labId];
                const lab = await this.labService.findById(labId, localSession);
                if (!lab) {
                    throw new common_1.NotFoundException(`Lab with id ${labId} not found`);
                }
            }
            if (!session) {
                await localSession.commitTransaction();
            }
            return inserted;
        }
        catch (error) {
            if (!session && localSession?.inTransaction()) {
                await localSession.abortTransaction();
            }
            throw new common_1.InternalServerErrorException('Create many seats failed: ' + error.message);
        }
        finally {
            if (!session && localSession) {
                await localSession.endSession();
            }
        }
    }
    async findAll(dto) {
        const { labId } = dto;
        const filters = {};
        if (labId) {
            filters.lab = labId;
        }
        const [seats, total] = await Promise.all([
            this.seatModel.find(filters),
            this.seatModel.countDocuments(filters),
        ]);
        return new paginated_response_dto_1.PaginatedResponse(seats, 0, 0, total);
    }
    async findByLabId(labId) {
        return await this.seatModel.find({
            lab: new mongoose_2.Types.ObjectId(labId),
        });
    }
};
exports.SeatService = SeatService;
exports.SeatService = SeatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __param(1, (0, mongoose_1.InjectModel)(seat_schema_1.Seat.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => lab_service_1.LabService))),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        mongoose_2.Model,
        lab_service_1.LabService])
], SeatService);
//# sourceMappingURL=seat.service.js.map