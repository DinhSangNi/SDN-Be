import { GeminiService } from './gemini.service';
import { GenerateTextDto } from './dto/generate-text.dto';
import { Response } from 'express';
export declare class GeminiController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    generateTextFromMultiModal(dto: GenerateTextDto, file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
}
