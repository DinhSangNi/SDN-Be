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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const common_1 = require("@nestjs/common");
const gemini_constant_1 = require("./gemini.constant");
const content_helper_1 = require("./content.helper");
let GeminiService = class GeminiService {
    proModel;
    proVisionModel;
    constructor(proModel, proVisionModel) {
        this.proModel = proModel;
        this.proVisionModel = proVisionModel;
    }
    async generateTextFromMultiModal(prompt, file) {
        try {
            const contents = (0, content_helper_1.createContent)(prompt, file);
            const result = await this.proVisionModel.generateContent({ contents });
            const response = result.response;
            const text = response.text();
            return { text };
        }
        catch (err) {
            if (err instanceof Error) {
                throw new common_1.InternalServerErrorException(err.message, err.stack);
            }
            throw err;
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(gemini_constant_1.GEMINI_PRO_MODEL)),
    __param(1, (0, common_1.Inject)(gemini_constant_1.GEMINI_PRO_VISION_MODEL)),
    __metadata("design:paramtypes", [generative_ai_1.GenerativeModel,
        generative_ai_1.GenerativeModel])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map