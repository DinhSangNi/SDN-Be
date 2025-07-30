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
exports.CreateMediaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMediaDto {
    url;
    publicId;
    name;
    size;
    uploadedBy;
    isTemporary;
    type;
    relatedTo;
    description;
}
exports.CreateMediaDto = CreateMediaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL của media',
        example: 'https://res.cloudinary.com/abc/image/upload/v1/sample.jpg',
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMediaDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Public ID từ Cloudinary',
        example: 'sample_public_id',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMediaDto.prototype, "publicId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tên gợi nhớ của media',
        example: 'Ảnh đại diện bài viết',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Dung lượng file (bytes)',
        example: 204800,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMediaDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID người tải lên',
        example: '64c8e2d8f4f5a0c9bcb3123f',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaDto.prototype, "uploadedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Media tạm thời (true = sẽ bị xóa sau)',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMediaDto.prototype, "isTemporary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Loại media (ví dụ: image, video)',
        example: 'image',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID liên kết đối tượng (bài viết, user, v.v)',
        example: '64c8e2d8f4f5a0c9bcb3123f',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaDto.prototype, "relatedTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mô tả ngắn về media',
        example: 'Ảnh minh họa bài đăng',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMediaDto.prototype, "description", void 0);
//# sourceMappingURL=create-media.dto.js.map