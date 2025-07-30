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
exports.CreateSeatDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const seat_enum_1 = require("../types/seat.enum");
class CreateSeatDto {
    seatNumber;
    labId;
    status;
}
exports.CreateSeatDto = CreateSeatDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A1',
        description: 'Seat number (e.g., A1, B2)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSeatDto.prototype, "seatNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '64c3c0f0f4e8f5a9b2e9c4d1',
        description: 'MongoDB ObjectId of the lab this seat belongs to',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSeatDto.prototype, "labId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: seat_enum_1.SeatStatus,
        example: seat_enum_1.SeatStatus.AVAILABLE,
        description: 'Status of the seat (optional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(seat_enum_1.SeatStatus),
    __metadata("design:type", String)
], CreateSeatDto.prototype, "status", void 0);
//# sourceMappingURL=create-seat.dto.js.map