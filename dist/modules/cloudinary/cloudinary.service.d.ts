import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteFile(publicId: string): Promise<void>;
}
