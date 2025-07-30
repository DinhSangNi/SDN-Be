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
import { ApiResponse as ApiResponseDto } from 'src/common/dto/api-response.dto';
import { DeleteMediaByIdDto } from './dto/delete-media-by-id.dto';
import { DeleteMediaByUrlDto } from './dto/delete-media-by-url.dto';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a media file' })
  @ApiConsumes('multipart/form-data')
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
      new ApiResponseDto('Upload media successfully', {
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete media by ID' })
  @ApiParam({ name: 'id', description: 'ID of the media to delete' })
  async deleteMediaById(
    @Param() dto: DeleteMediaByIdDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponseDto(
          'Delete media successfully',
          await this.mediaService.deleteById(dto.id),
        ),
      );
  }

  @Delete('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete media by URL' })
  @ApiQuery({
    name: 'url',
    required: true,
    description: 'URL of media to delete',
  })
  async deleteMediaByUrl(
    @Query() dto: DeleteMediaByUrlDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponseDto(
          'Delete media successfully',
          await this.mediaService.deleteByUrl(dto.url),
        ),
      );
  }
}
