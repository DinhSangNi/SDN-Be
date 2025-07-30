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
exports.LabController = void 0;
const common_1 = require("@nestjs/common");
const lab_service_1 = require("./lab.service");
const create_lab_dto_1 = require("./dto/create-lab.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../../common/guards/role.guard");
const role_decorator_1 = require("../../common/decorators/role.decorator");
const booking_service_1 = require("../booking/booking.service");
const get_labs_query_1 = require("./dto/get-labs-query");
const swagger_1 = require("@nestjs/swagger");
let LabController = class LabController {
    labService;
    bookingService;
    constructor(labService, bookingService) {
        this.labService = labService;
        this.bookingService = bookingService;
    }
    async getLabs(query, res) {
        const result = await this.labService.getLabs(query);
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Get labs successfully', result));
    }
    async createLab(req, createLabDto, res) {
        const { userId } = req.user;
        return res
            .status(common_1.HttpStatus.CREATED)
            .json(new api_response_dto_1.ApiResponse('Create new lab successfully', (await this.labService.create(createLabDto, userId)).toObject()));
    }
    async getLabById(labId, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse(`Get lab by ${labId} successfully`, (await this.labService.findById(labId))?.toObject()));
    }
    async getSeatsWithBooking(labId, date, slot, res) {
        const slotNum = parseInt(slot, 10);
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse(`Get lab by ${labId} successfully`, await this.bookingService.findSeatsWithBooking(labId, date, slotNum)));
    }
};
exports.LabController = LabController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get labs with optional filtering & pagination' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_labs_query_1.GetLabsQuery, Object]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "getLabs", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lab (admin only)' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lab_dto_1.CreateLabDto, Object]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "createLab", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific lab by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Lab ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "getLabById", null);
__decorate([
    (0, common_1.Get)(':labId/seats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get seats and bookings for a lab by date and slot',
    }),
    (0, swagger_1.ApiParam)({ name: 'labId', description: 'Lab ID' }),
    (0, swagger_1.ApiQuery)({ name: 'date', description: 'Date in yyyy-mm-dd format' }),
    (0, swagger_1.ApiQuery)({ name: 'slot', description: 'Slot number', type: Number }),
    __param(0, (0, common_1.Param)('labId')),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('slot')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "getSeatsWithBooking", null);
exports.LabController = LabController = __decorate([
    (0, swagger_1.ApiTags)('Labs'),
    (0, common_1.Controller)('labs'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [lab_service_1.LabService,
        booking_service_1.BookingService])
], LabController);
//# sourceMappingURL=lab.controller.js.map