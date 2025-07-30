import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GenerateTextDto } from './dto/generate-text.dto';
import { fileValidatorPipe } from './file-validator.pipe';
import { Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('text-and-image')
  @ApiOperation({
    summary: 'Generate AI text from image and prompt',
    description:
      'This endpoint takes a text prompt and an image file to generate AI-based text (e.g., a poem) using multimodal input.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Prompt and image file',
    type: GenerateTextDto,
    schema: {
      type: 'object',
      properties: {
        prompt: { type: 'string', example: 'Describe this scene poetically.' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['prompt', 'file'],
    },
  })
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
