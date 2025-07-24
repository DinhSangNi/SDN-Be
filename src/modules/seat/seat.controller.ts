import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { SeatService } from './seat.service';
import { Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get(':labId')
  async getSeatsByLabId(@Param('labId') labId: string, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          `Get seats by lab with id: ${labId} successfully`,
          await this.seatService.findByLabId(labId),
        ),
      );
  }
}
