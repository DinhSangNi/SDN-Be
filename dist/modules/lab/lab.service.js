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
exports.LabService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lab_schema_1 = require("./schema/lab.schema");
const seat_service_1 = require("../seat/seat.service");
const seat_enum_1 = require("../seat/types/seat.enum");
let LabService = class LabService {
    connection;
    labModel;
    seatService;
    constructor(connection, labModel, seatService) {
        this.connection = connection;
        this.labModel = labModel;
        this.seatService = seatService;
    }
    async getLabs(query) {
        const { keyword, status, page = 1, limit = 10 } = query;
        const filter = {};
        if (keyword) {
            filter.keyword = {
                $regex: keyword,
                $options: 'i',
            };
        }
        if (status) {
            filter.status = status;
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.labModel.find(filter).skip(skip).limit(limit),
            this.labModel.countDocuments(filter),
        ]);
        return {
            data,
            meta: {
                page,
                limit,
                totalItems: total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async create(dto, userId) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const existedLab = await this.labModel
                .findOne({ name: dto.name })
                .session(session);
            if (existedLab)
                throw new common_1.BadRequestException('Lab already exists');
            const lab = new this.labModel({
                ...dto,
                createdBy: new mongoose_2.Types.ObjectId(userId),
            });
            await lab.save({ session });
            if (dto.autoGenerateSeats) {
                const seats = Array.from({ length: dto.totalSeats }, (_, i) => ({
                    seatNumber: `A${i + 1}`,
                    labId: lab._id.toString(),
                    status: seat_enum_1.SeatStatus.AVAILABLE,
                }));
                await this.seatService.createMany({ seats }, session);
            }
            await session.commitTransaction();
            return lab;
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            session.endSession();
        }
    }
    async updateById(labId, updateDto, session) {
        const updatedLab = await this.labModel
            .findByIdAndUpdate(labId, updateDto, {
            new: true,
            runValidators: true,
        })
            .session(session ?? null);
        if (!updatedLab) {
            throw new common_1.NotFoundException(`Lab with id ${labId} not found`);
        }
        return updatedLab;
    }
    async findAll() {
        return await this.labModel.find();
    }
    async findById(labId, session) {
        return await this.labModel
            .findById(labId)
            .session(session ?? null)
            .populate('seats');
    }
};
exports.LabService = LabService;
exports.LabService = LabService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __param(1, (0, mongoose_1.InjectModel)(lab_schema_1.Lab.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => seat_service_1.SeatService))),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        mongoose_2.Model,
        seat_service_1.SeatService])
], LabService);
//# sourceMappingURL=lab.service.js.map