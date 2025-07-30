import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SeatService } from './seat.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@ApiTags('seats')
@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get(':labId')
  @ApiOperation({ summary: 'Get seats by lab ID' })
  @ApiParam({
    name: 'labId',
    description: 'MongoDB ObjectId of the lab',
    example: '64c3c0f0f4e8f5a9b2e9c4d1',
  })
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
