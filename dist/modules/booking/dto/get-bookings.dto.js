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
exports.GetBookingsByLabAndDateRangeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class GetBookingsByLabAndDateRangeDto {
    labId;
    from;
    to;
}
exports.GetBookingsByLabAndDateRangeDto = GetBookingsByLabAndDateRangeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của phòng lab',
        example: '64d3a749bcf86cd799439012',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetBookingsByLabAndDateRangeDto.prototype, "labId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày bắt đầu (format: yyyy-MM-dd)',
        example: '2025-08-01',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetBookingsByLabAndDateRangeDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ngày kết thúc (format: yyyy-MM-dd)',
        example: '2025-08-31',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetBookingsByLabAndDateRangeDto.prototype, "to", void 0);
//# sourceMappingURL=get-bookings.dto.js.map