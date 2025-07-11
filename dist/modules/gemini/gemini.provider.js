"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiProVisionModelProvider = exports.GeminiProModelProvider = void 0;
const generative_ai_1 = require("@google/generative-ai");
const gemini_constant_1 = require("./gemini.constant");
const config_1 = require("@nestjs/config");
const gemini_config_1 = require("./gemini.config");
exports.GeminiProModelProvider = {
    provide: gemini_constant_1.GEMINI_PRO_MODEL,
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const genAI = new generative_ai_1.GoogleGenerativeAI(configService.get('GEMINI_API_KEY'));
        return genAI.getGenerativeModel({
            model: configService.get('GEMINI_PRO_MODEL'),
            generationConfig: gemini_config_1.GENERATION_CONFIG,
            safetySettings: gemini_config_1.SAFETY_SETTINGS,
        });
    },
};
exports.GeminiProVisionModelProvider = {
    provide: gemini_constant_1.GEMINI_PRO_VISION_MODEL,
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const genAI = new generative_ai_1.GoogleGenerativeAI(configService.get('GEMINI_API_KEY'));
        return genAI.getGenerativeModel({
            model: configService.get('GEMINI_PRO_VISION_MODEL'),
            generationConfig: gemini_config_1.GENERATION_CONFIG,
            safetySettings: gemini_config_1.SAFETY_SETTINGS,
        });
    },
};
//# sourceMappingURL=gemini.provider.js.map