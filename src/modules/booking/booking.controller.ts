import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schema/booking.schema';
import { Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';
import { GetBookingsByLabAndDateRangeDto } from './dto/get-bookings.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Req()
    req: {
      user: {
        userId: string;
      };
    },
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<Booking>(
          'Create booking successfully',
          (
            await this.bookingService.create(createBookingDto, req.user.userId)
          ).toObject(),
        ),
      );
  }

  @Post('/multiple')
  @UseGuards(AuthGuard('jwt'))
  async createMultipleBookings(
    @Body() dto: CreateMultipleBookingsDto,
    @Req()
    req: {
      user: {
        userId: string;
      };
    },
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<Booking[]>(
          'Create bookings successfully',
          await this.bookingService.createMany(dto, req.user.userId),
        ),
      );
  }

  @Get('lab-range')
  @UseGuards(AuthGuard('jwt'))
  async getBookingsByLabAndDateRange(
    @Query() query: GetBookingsByLabAndDateRangeDto,
    @Res() res: Response,
  ) {
    const { labId, from, to } = query;
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          `Get bookings with id: ${labId} from ${from} to ${to} successfully`,
          await this.bookingService.getBookingsByLabAndDateRange(
            labId,
            from,
            to,
          ),
        ),
      );
  }
}
