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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_service_1 = require("./media.service");
const passport_1 = require("@nestjs/passport");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
const delete_media_by_id_dto_1 = require("./dto/delete-media-by-id.dto");
const delete_media_by_url_dto_1 = require("./dto/delete-media-by-url.dto");
const swagger_1 = require("@nestjs/swagger");
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async uploadMedia(file, req, res) {
        if (!file) {
            throw new common_1.HttpException('No file was uploaded', common_1.HttpStatus.BAD_REQUEST);
        }
        const userId = req.user?.userId || undefined;
        const media = await this.mediaService.uploadAndCreateMedia(file, userId);
        return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Upload media successfully', {
            id: media._id,
            url: media.url,
            publicId: media.publicId,
            type: media.type,
            isTemp: media.isTemporary,
            uploadedBy: media.uploadedBy,
        }));
    }
    async deleteMediaById(dto, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Delete media successfully', await this.mediaService.deleteById(dto.id)));
    }
    async deleteMediaByUrl(dto, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Delete media successfully', await this.mediaService.deleteByUrl(dto.url)));
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a media file' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'Delete media by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the media to delete' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_media_by_id_dto_1.DeleteMediaByIdDto, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "deleteMediaById", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({ summary: 'Delete media by URL' }),
    (0, swagger_1.ApiQuery)({
        name: 'url',
        required: true,
        description: 'URL of media to delete',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_media_by_url_dto_1.DeleteMediaByUrlDto, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "deleteMediaByUrl", null);
exports.MediaController = MediaController = __decorate([
    (0, swagger_1.ApiTags)('Media'),
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map