// src/media/media.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Res,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { DeleteMediaByIdDto } from './dto/delete-media-by-id.dto';
import { DeleteMediaByUrlDto } from './dto/delete-media-by-url.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('No file was uploaded', HttpStatus.BAD_REQUEST);
    }

    const userId = (req as any).user?.userId || undefined;

    const media = await this.mediaService.uploadAndCreateMedia(file, userId);

    return res.status(HttpStatus.OK).json(
      new ApiResponse('Upload media successfully', {
        id: media._id,
        url: media.url,
        publicId: media.publicId,
        type: media.type,
        isTemp: media.isTemporary,
        uploadedBy: media.uploadedBy,
      }),
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteMediaById(
    @Param() dto: DeleteMediaByIdDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Delete media successfully',
          await this.mediaService.deleteById(dto.id),
        ),
      );
  }

  @Delete('')
  @UseGuards(AuthGuard('jwt'))
  async deleteMediaByUrl(
    @Query() dto: DeleteMediaByUrlDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Delete media successfully',
          await this.mediaService.deleteByUrl(dto.url),
        ),
      );
  }
}
