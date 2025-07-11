import { Media, MediaDocument } from './schema/media.schema';
import { Model } from 'mongoose';
import { CreateMediaDto } from './dto/create-media.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class MediaService {
    private readonly mediaModel;
    private readonly cloudinaryService;
    constructor(mediaModel: Model<MediaDocument>, cloudinaryService: CloudinaryService);
    createMedia(dto: CreateMediaDto): Promise<MediaDocument>;
    uploadAndCreateMedia(file: Express.Multer.File, userId?: string): Promise<MediaDocument>;
    getAllTemporarayMedia(): Promise<Media[]>;
    deleteByPublicId(publicId: string): Promise<(import("mongoose").FlattenMaps<MediaDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
    deleteById(id: string): Promise<void>;
    deleteByUrl(url: string): Promise<void>;
}
