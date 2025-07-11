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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const media_schema_1 = require("./schema/media.schema");
const mongoose_2 = require("mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let MediaService = class MediaService {
    mediaModel;
    cloudinaryService;
    constructor(mediaModel, cloudinaryService) {
        this.mediaModel = mediaModel;
        this.cloudinaryService = cloudinaryService;
    }
    async createMedia(dto) {
        const media = new this.mediaModel({
            ...dto,
            isTemporary: dto.isTemporary ?? true,
            type: dto.type ?? 'image',
        });
        return media.save();
    }
    async uploadAndCreateMedia(file, userId) {
        try {
            const result = await this.cloudinaryService.uploadFile(file);
            const dto = {
                url: result.secure_url,
                publicId: result.public_id,
                name: file.originalname,
                size: file.size,
                uploadedBy: userId,
                isTemporary: true,
                type: file.mimetype?.startsWith('image') ? 'image' : 'file',
            };
            return await this.createMedia(dto);
        }
        catch (error) {
            console.error('Upload or DB error:', error);
            throw new common_1.InternalServerErrorException('Upload media failed');
        }
    }
    async getAllTemporarayMedia() {
        return await this.mediaModel.find({
            isTemporary: true,
        });
    }
    async deleteByPublicId(publicId) {
        return this.mediaModel.findOneAndDelete({ publicId });
    }
    async deleteById(id) {
        const media = await this.mediaModel.findById(id);
        if (!media)
            throw new common_1.NotFoundException('Media not found');
        await this.mediaModel.deleteOne({ _id: media.id });
        await this.cloudinaryService.deleteFile(media.publicId);
    }
    async deleteByUrl(url) {
        const media = await this.mediaModel.findOne({ url: url });
        if (!media)
            throw new common_1.NotFoundException('Media not found');
        await this.mediaModel.deleteOne({ _id: media.id });
        await this.cloudinaryService.deleteFile(media.publicId);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(media_schema_1.Media.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], MediaService);
//# sourceMappingURL=media.service.js.map