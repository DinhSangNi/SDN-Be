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
const booking_enum_1 = require("./types/booking.enum");
const mongoose_3 = require("mongoose");
const lab_service_1 = require("../lab/lab.service");
const seat_service_1 = require("../seat/seat.service");
const enums_1 = require("../../common/types/enums");
let BookingService = class BookingService {
    connection;
    bookingModel;
    labService;
    seatService;
    constructor(connection, bookingModel, labService, seatService) {
        this.connection = connection;
        this.bookingModel = bookingModel;
        this.labService = labService;
        this.seatService = seatService;
    }
    async create(dto, userId) {
        const { labId, seatId, date, slot, status } = dto;
        const existing = await this.bookingModel.findOne({
            lab: new mongoose_2.Types.ObjectId(labId),
            seat: new mongoose_2.Types.ObjectId(seatId),
            date,
            slot,
            status: booking_enum_1.BookingStatus.APPROVED,
        });
        if (existing) {
            throw new common_1.BadRequestException('Seat has already been booked for this time');
        }
        const created = await this.bookingModel.create({
            user: new mongoose_2.Types.ObjectId(userId),
            lab: new mongoose_2.Types.ObjectId(labId),
            seat: new mongoose_2.Types.ObjectId(seatId),
            date,
            slot,
            status: status ?? booking_enum_1.BookingStatus.APPROVED,
        });
        return created;
    }
    async createMany(dto, userId) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const createdBookings = [];
            const { bookings } = dto;
            for (const booking of bookings) {
                const { labId, seatId, date, slot, status } = booking;
                const exists = await this.bookingModel
                    .findOne({ lab: labId, seat: seatId, date, slot })
                    .session(session);
                if (exists) {
                    throw new common_1.BadRequestException(`Seat ${seatId} already booked on ${date.toString()} for slot ${slot}`);
                }
                const created = await this.bookingModel.create([
                    {
                        user: new mongoose_2.Types.ObjectId(userId),
                        lab: new mongoose_2.Types.ObjectId(labId),
                        seat: new mongoose_2.Types.ObjectId(seatId),
                        date,
                        slot,
                        status: status ?? booking_enum_1.BookingStatus.APPROVED,
                    },
                ], { session });
                createdBookings.push(created[0]);
            }
            await session.commitTransaction();
            session.endSession();
            return createdBookings;
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new common_1.InternalServerErrorException(`Create many bookings failed: ${error.message}`);
        }
    }
    async getBookingsByLabAndDateRange(labId, from, to) {
        const bookings = await this.bookingModel
            .find({
            lab: new mongoose_2.Types.ObjectId(labId),
            date: { $gte: from, $lte: to },
            status: booking_enum_1.BookingStatus.APPROVED,
        })
            .lean();
        const lab = await this.labService.findById(labId);
        const result = {};
        for (const booking of bookings) {
            const dateKey = booking.date.toISOString();
            const slot = booking.slot;
            if (!result[dateKey]) {
                result[dateKey] = {};
            }
            if (!result[dateKey][slot]) {
                result[dateKey][slot] = {
                    bookedSeats: 0,
                    totalSeats: lab?.totalSeats ?? 0,
                    status: 'available',
                };
            }
            result[dateKey][slot].bookedSeats += 1;
            if (result[dateKey][slot].bookedSeats >= (lab?.totalSeats ?? 0)) {
                result[dateKey][slot].status = 'full';
            }
        }
        return result;
    }
    async findSeatsWithBooking(labId, date, slot) {
        const startOfDay = new Date(date);
        const [seats, bookings] = await Promise.all([
            this.seatService.findByLabId(labId),
            this.bookingModel
                .find({
                lab: new mongoose_2.Types.ObjectId(labId),
                date: startOfDay,
                slot,
                status: booking_enum_1.BookingStatus.APPROVED,
            })
                .populate('user')
                .lean(),
        ]);
        const bookingMap = new Map();
        bookings.forEach((booking) => {
            bookingMap.set(booking.seat.toString(), booking);
        });
        const result = seats.map((seat) => {
            const booking = bookingMap.get(seat._id.toString());
            const plainSeat = seat.toObject();
            return {
                ...plainSeat,
                isBooked: !!booking,
                booking: booking ?? null,
            };
        });
        return result;
    }
    async cancelBooking(bookingId, userId, role) {
        const booking = await this.bookingModel.findOne({
            _id: new mongoose_2.Types.ObjectId(bookingId),
            status: { $ne: booking_enum_1.BookingStatus.CANCELLED },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found or already cancelled');
        }
        if (booking.user.toString() !== userId && role !== enums_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException("You don't have permission to cancel this booking");
        }
        booking.status = booking_enum_1.BookingStatus.CANCELLED;
        return await booking.save();
    }
    async cancelManyBookings(dto) {
        const { bookingIds } = dto;
        const bookings = await this.bookingModel.find({
            _id: { $in: bookingIds.map((id) => new mongoose_2.Types.ObjectId(id)) },
            status: { $ne: booking_enum_1.BookingStatus.CANCELLED },
        });
        if (bookings.length === 0) {
            throw new common_1.NotFoundException('No valid bookings found to cancel');
        }
        const updatedBookings = await Promise.all(bookings.map(async (booking) => {
            booking.status = booking_enum_1.BookingStatus.CANCELLED;
            return await booking.save();
        }));
        return updatedBookings;
    }
    async getAllBookings(query) {
        const { keyword, labId, userId, status, slot, from, to, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = query;
        const filter = {};
        if (keyword)
            filter.name = {
                $regex: keyword,
                $options: 'i',
            };
        if (labId)
            filter.lab = labId;
        if (userId)
            filter.user = userId;
        if (status)
            filter.status = status;
        if (slot)
            filter.slot = Number(slot);
        if (from || to) {
            filter.date = {};
            if (from)
                filter.date.$gte = new Date(from);
            if (to)
                filter.date.$lte = new Date(to);
        }
        const sortOption = {
            [sortBy]: sortOrder === 'asc' ? 1 : -1,
        };
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.bookingModel
                .find(filter)
                .populate([
                {
                    path: 'user',
                    select: '-password',
                },
                {
                    path: 'seat',
                },
                {
                    path: 'lab',
                },
            ])
                .sort(sortOption)
                .skip(skip)
                .limit(limit),
            this.bookingModel.countDocuments(filter),
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
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __param(1, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_3.Connection,
        mongoose_2.Model,
        lab_service_1.LabService,
        seat_service_1.SeatService])
], BookingService);
//# sourceMappingURL=booking.service.js.map