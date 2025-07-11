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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const passport_1 = require("@nestjs/passport");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
const create_multiple_bookings_dto_1 = require("./dto/create-multiple-bookings.dto");
const get_bookings_dto_1 = require("./dto/get-bookings.dto");
let BookingController = class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async createBooking(createBookingDto, req, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Create booking successfully', (await this.bookingService.create(createBookingDto, req.user.userId)).toObject()));
    }
    async createMultipleBookings(dto, req, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Create bookings successfully', await this.bookingService.createMany(dto, req.user.userId)));
    }
    async getBookingsByLabAndDateRange(query, res) {
        const { labId, from, to } = query;
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse(`Get bookings with id: ${labId} from ${from} to ${to} successfully`, await this.bookingService.getBookingsByLabAndDateRange(labId, from, to)));
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Post)('/multiple'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_multiple_bookings_dto_1.CreateMultipleBookingsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createMultipleBookings", null);
__decorate([
    (0, common_1.Get)('lab-range'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_bookings_dto_1.GetBookingsByLabAndDateRangeDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingsByLabAndDateRange", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map