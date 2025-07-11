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
exports.GeminiController = void 0;
const common_1 = require("@nestjs/common");
const gemini_service_1 = require("./gemini.service");
const platform_express_1 = require("@nestjs/platform-express");
const generate_text_dto_1 = require("./dto/generate-text.dto");
const file_validator_pipe_1 = require("./file-validator.pipe");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
let GeminiController = class GeminiController {
    geminiService;
    constructor(geminiService) {
        this.geminiService = geminiService;
    }
    async generateTextFromMultiModal(dto, file, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Generate poem from image successfully', await this.geminiService.generateTextFromMultiModal(dto.prompt, file)));
    }
};
exports.GeminiController = GeminiController;
__decorate([
    (0, common_1.Post)('text-and-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(file_validator_pipe_1.fileValidatorPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_text_dto_1.GenerateTextDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GeminiController.prototype, "generateTextFromMultiModal", null);
exports.GeminiController = GeminiController = __decorate([
    (0, common_1.Controller)('gemini'),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], GeminiController);
//# sourceMappingURL=gemini.controller.js.map