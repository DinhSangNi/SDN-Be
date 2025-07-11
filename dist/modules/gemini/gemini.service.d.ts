import { GenerativeModel } from '@google/generative-ai';
export declare class GeminiService {
    private readonly proModel;
    private readonly proVisionModel;
    constructor(proModel: GenerativeModel, proVisionModel: GenerativeModel);
    generateTextFromMultiModal(prompt: string, file: Express.Multer.File): Promise<{
        totalTokens?: number;
        text: string;
    }>;
}
