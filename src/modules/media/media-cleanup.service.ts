// src/media/media-cleanup.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MediaService } from './media.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MediaCleanupService {
  private readonly logger = new Logger(MediaCleanupService.name);

  constructor(
    private readonly mediaService: MediaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleCleanup() {
    this.logger.log('🔁 Cron: Đang dọn dẹp ảnh isTemporary=true');

    const expiredMediaList = await this.mediaService.getAllTemporarayMedia();

    for (const media of expiredMediaList) {
      this.logger.log(`🗑 Xoá ${media.publicId} (${media.url})`);

      try {
        await this.cloudinaryService.deleteFile(media.publicId);
        await this.mediaService.deleteByPublicId(media.publicId);
      } catch (err) {
        this.logger.error(`❌ Lỗi xoá ${media.publicId}: ${err.message}`);
      }
    }

    this.logger.log(`✅ Đã xử lý ${expiredMediaList.length} media hết hạn`);
  }
}
