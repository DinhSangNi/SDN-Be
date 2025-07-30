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
exports.GetBookingQueryDto = void 0;
const class_validator_1 = require("class-validator");
const booking_enum_1 = require("../types/booking.enum");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class GetBookingQueryDto {
    keyword;
    labId;
    userId;
    status;
    slot;
    date;
    from;
    to;
    page;
    limit;
    sortBy;
    sortOrder;
}
exports.GetBookingQueryDto = GetBookingQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Từ khóa tìm kiếm (tên lab, tên người dùng, etc)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "keyword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID phòng lab' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "labId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID người dùng tạo booking' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: booking_enum_1.BookingStatus,
        description: 'Trạng thái booking',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(booking_enum_1.BookingStatus),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: [1, 2, 3, 4], description: 'Ca học (1~4)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "slot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày cụ thể (yyyy-MM-dd)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày bắt đầu (yyyy-MM-dd)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày kết thúc (yyyy-MM-dd)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Trang hiện tại' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetBookingQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: 'Số phần tử trên mỗi trang',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetBookingQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trường muốn sắp xếp theo (vd: date, slot, etc)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['asc', 'desc'], description: 'Thứ tự sắp xếp' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBookingQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=get-bookings-query.dto.js.map