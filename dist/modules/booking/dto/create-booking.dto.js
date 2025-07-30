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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingDto = void 0;
const class_validator_1 = require("class-validator");
const booking_enum_1 = require("../types/booking.enum");
const swagger_1 = require("@nestjs/swagger");
class CreateBookingDto {
    labId;
    seatId;
    date;
    slot;
    status;
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của phòng lab',
        example: '64dcd2f4f2e8cbe9a7345a71',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "labId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của ghế muốn đặt',
        example: '64dcd2f4f2e8cbe9a7345a77',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "seatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày đặt (định dạng yyyy-mm-dd)',
        example: '2025-08-01',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ca đặt chỗ (1 = sáng, 2 = chiều, 3 = tối, 4 = đêm)',
        example: 2,
        enum: [1, 2, 3, 4],
    }),
    (0, class_validator_1.IsIn)([1, 2, 3, 4]),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "slot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trạng thái booking (mặc định là pending)',
        enum: booking_enum_1.BookingStatus,
        example: booking_enum_1.BookingStatus.PENDING,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_enum_1.BookingStatus),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "status", void 0);
//# sourceMappingURL=create-booking.dto.js.map