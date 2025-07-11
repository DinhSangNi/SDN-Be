import { MediaService } from './media.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class MediaCleanupService {
    private readonly mediaService;
    private readonly cloudinaryService;
    private readonly logger;
    constructor(mediaService: MediaService, cloudinaryService: CloudinaryService);
    handleCleanup(): Promise<void>;
}
