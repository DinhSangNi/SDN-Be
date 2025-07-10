import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LabService } from './lab.service';
import { CreateLabDto } from './dto/create-lab.dto';
import { Lab, LabDocument } from './schema/lab.schema';
import { Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  async createLab(@Body() createLabDto: CreateLabDto, @Res() res: Response) {
    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse<LabDocument>(
          'Create new lab successfully',
          (await this.labService.create(createLabDto)).toObject(),
        ),
      );
  }

  @Get()
  async getAllLabs(@Res() res: Response) {
    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          'Create new lab successfully',
          await this.labService.findAll(),
        ),
      );
  }
}
