import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
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
import { BookingService } from '../booking/booking.service';
import { GetLabsQuery } from './dto/get-labs-query';

@Controller('labs')
export class LabController {
  constructor(
    private readonly labService: LabService,
    private readonly bookingService: BookingService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async getLabs(@Query() query: GetLabsQuery, @Res() res: Response) {
    const result = await this.labService.getLabs(query);
    return res
      .status(HttpStatus.OK)
      .json(new ApiResponse('Get labs successfully', result));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  async createLab(
    @Req() req: { user: { userId: string } },
    @Body() createLabDto: CreateLabDto,
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse<LabDocument>(
          'Create new lab successfully',
          (await this.labService.create(createLabDto, userId)).toObject(),
        ),
      );
  }

  @Get(':id')
  async getLabById(@Param('id') labId: string, @Res() res: Response) {
    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          `Get lab by ${labId} successfully`,
          (await this.labService.findById(labId))?.toObject(),
        ),
      );
  }

  @Get(':labId/seats')
  async getSeatsWithBooking(
    @Param('labId') labId: string,
    @Query('date') date: string,
    @Query('slot') slot: string,
    @Res() res: Response,
  ) {
    const slotNum = parseInt(slot, 10);

    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          `Get lab by ${labId} successfully`,
          await this.bookingService.findSeatsWithBooking(labId, date, slotNum),
        ),
      );
  }
}
