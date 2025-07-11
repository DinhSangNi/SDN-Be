import { MediaService } from './media.service';
import { Request, Response } from 'express';
import { DeleteMediaByIdDto } from './dto/delete-media-by-id.dto';
import { DeleteMediaByUrlDto } from './dto/delete-media-by-url.dto';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadMedia(file: Express.Multer.File, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteMediaById(dto: DeleteMediaByIdDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteMediaByUrl(dto: DeleteMediaByUrlDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
