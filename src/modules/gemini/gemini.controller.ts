import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenerateTextDto } from './dto/generate-text.dto';
import { fileValidatorPipe } from './file-validator.pipe';
import { Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('text-and-image')
  @UseInterceptors(FileInterceptor('file'))
  async generateTextFromMultiModal(
    @Body() dto: GenerateTextDto,
    @UploadedFile(fileValidatorPipe)
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          'Generate poem from image successfully',
          await this.geminiService.generateTextFromMultiModal(dto.prompt, file),
        ),
      );
  }
}
