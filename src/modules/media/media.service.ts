// src/media/media.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Media, MediaDocument } from './schema/media.schema';
import { Model } from 'mongoose';
import { CreateMediaDto } from './dto/create-media.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createMedia(dto: CreateMediaDto): Promise<MediaDocument> {
    const media = new this.mediaModel({
      ...dto,
      isTemporary: dto.isTemporary ?? true,
      type: dto.type ?? 'image',
    });
    return media.save();
  }

  async uploadAndCreateMedia(
    file: Express.Multer.File,
    userId?: string,
  ): Promise<MediaDocument> {
    try {
      const result = await this.cloudinaryService.uploadFile(file);

      const dto: CreateMediaDto = {
        url: result.secure_url,
        publicId: result.public_id,
        name: file.originalname,
        size: file.size,
        uploadedBy: userId,
        isTemporary: true,
        type: file.mimetype?.startsWith('image') ? 'image' : 'file',
      };

      return await this.createMedia(dto);
    } catch (error) {
      console.error('Upload or DB error:', error);
      throw new InternalServerErrorException('Upload media failed');
    }
  }

  async getAllTemporarayMedia(): Promise<Media[]> {
    return await this.mediaModel.find({
      isTemporary: true,
    });
  }

  async deleteByPublicId(publicId: string) {
    return this.mediaModel.findOneAndDelete({ publicId });
  }

  async deleteById(id: string): Promise<void> {
    const media = await this.mediaModel.findById(id);
    if (!media) throw new NotFoundException('Media not found');
    await this.mediaModel.deleteOne({ _id: media.id });
    await this.cloudinaryService.deleteFile(media.publicId);
  }

  async deleteByUrl(url: string): Promise<void> {
    const media = await this.mediaModel.findOne({ url: url });
    if (!media) throw new NotFoundException('Media not found');
    await this.mediaModel.deleteOne({ _id: media.id });
    await this.cloudinaryService.deleteFile(media.publicId);
  }
}
