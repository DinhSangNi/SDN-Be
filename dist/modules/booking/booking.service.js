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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const booking_schema_1 = require("./schema/booking.schema");
const mongoose_2 = require("mongoose");
let BookingService = class BookingService {
    bookingModel;
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async create(createBookingDto, userId) {
        const { lab, date, slot } = createBookingDto;
        const exists = await this.bookingModel.exists({
            lab,
            date,
            slot,
        });
        if (exists) {
            throw new common_1.ConflictException('This slot has been booked');
        }
        const booking = new this.bookingModel({
            ...createBookingDto,
            user: userId,
        });
        return booking.save();
    }
    async createMany(dto, userId) {
        const conflicts = await Promise.all(dto.bookings.map((item) => this.bookingModel.exists({
            lab: item.lab,
            date: item.date,
            slot: item.slot,
        })));
        const conflictIndex = conflicts.findIndex((exist) => exist);
        if (conflictIndex !== -1) {
            const { date, slot } = dto.bookings[conflictIndex];
            throw new common_1.ConflictException(`Slot ${slot} at ${date} has been booked`);
        }
        const documents = dto.bookings.map((item) => ({
            ...item,
            user: userId,
        }));
        try {
            const result = await Promise.all(documents.map((doc) => this.bookingModel.create(doc)));
            return result;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('A slot has already been reserved at creation. Please try again.');
            }
            throw new common_1.InternalServerErrorException('Cannot create booking');
        }
    }
    async getBookingsByLabAndDateRange(labId, from, to) {
        const bookings = (await this.bookingModel
            .find({
            lab: labId,
            date: { $gte: from, $lte: to },
        })
            .populate('user', '_id fullName email')
            .lean());
        const result = {};
        for (const booking of bookings) {
            if (!result[booking.date.toISOString()]) {
                result[booking.date.toISOString()] = {};
            }
            result[booking.date.toISOString()][booking.slot] = {
                status: 'booked',
                user: {
                    _id: booking.user._id,
                    fullName: booking.user.fullName,
                    email: booking.user.email,
                },
            };
        }
        return result;
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingService);
//# sourceMappingURL=booking.service.js.map