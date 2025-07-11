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
var MediaCleanupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaCleanupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const media_service_1 = require("./media.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let MediaCleanupService = MediaCleanupService_1 = class MediaCleanupService {
    mediaService;
    cloudinaryService;
    logger = new common_1.Logger(MediaCleanupService_1.name);
    constructor(mediaService, cloudinaryService) {
        this.mediaService = mediaService;
        this.cloudinaryService = cloudinaryService;
    }
    async handleCleanup() {
        this.logger.log('🔁 Cron: Đang dọn dẹp ảnh isTemporary=true');
        const expiredMediaList = await this.mediaService.getAllTemporarayMedia();
        for (const media of expiredMediaList) {
            this.logger.log(`🗑 Xoá ${media.publicId} (${media.url})`);
            try {
                await this.cloudinaryService.deleteFile(media.publicId);
                await this.mediaService.deleteByPublicId(media.publicId);
            }
            catch (err) {
                this.logger.error(`❌ Lỗi xoá ${media.publicId}: ${err.message}`);
            }
        }
        this.logger.log(`✅ Đã xử lý ${expiredMediaList.length} media hết hạn`);
    }
};
exports.MediaCleanupService = MediaCleanupService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MediaCleanupService.prototype, "handleCleanup", null);
exports.MediaCleanupService = MediaCleanupService = MediaCleanupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [media_service_1.MediaService,
        cloudinary_service_1.CloudinaryService])
], MediaCleanupService);
//# sourceMappingURL=media-cleanup.service.js.map