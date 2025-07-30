import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
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
import { ApiResponse as CustomApiResponse } from 'src/common/dto/api-response.dto';
import { CreateMultipleBookingsDto } from './dto/create-multiple-bookings.dto';
import { GetBookingsByLabAndDateRangeDto } from './dto/get-bookings.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { CancelManyBookingDto } from './dto/cancel-many-booking.dto';
import { GetBookingQueryDto } from './dto/get-bookings-query.dto';
import { UserRole } from 'src/common/types/enums';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Get all bookings (admin only)' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved bookings.' })
  async getAllBookings(
    @Query() query: GetBookingQueryDto,
    @Res() res: Response,
  ) {
    const result = await this.bookingService.getAllBookings(query);
    return res
      .status(HttpStatus.OK)
      .json(new CustomApiResponse('Get bookings successfully', result));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a booking (student only)' })
  @ApiResponse({ status: 200, description: 'Booking created successfully.' })
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: { user: { userId: string } },
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new CustomApiResponse<Booking>(
          'Create booking successfully',
          (
            await this.bookingService.create(createBookingDto, req.user.userId)
          ).toObject(),
        ),
      );
  }

  @Post('/multiple')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Create multiple bookings (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Multiple bookings created successfully.',
  })
  async createMultipleBookings(
    @Body() dto: CreateMultipleBookingsDto,
    @Req() req: { user: { userId: string } },
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new CustomApiResponse<Booking[]>(
          'Create bookings successfully',
          await this.bookingService.createMany(dto, req.user.userId),
        ),
      );
  }

  @Get('lab-range')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get bookings by lab and date range' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved bookings by lab and range.',
  })
  async getBookingsByLabAndDateRange(
    @Query() query: GetBookingsByLabAndDateRangeDto,
    @Res() res: Response,
  ) {
    const { labId, from, to } = query;
    return res
      .status(HttpStatus.OK)
      .json(
        new CustomApiResponse(
          `Get bookings with id: ${labId} from ${from} to ${to} successfully`,
          await this.bookingService.getBookingsByLabAndDateRange(
            labId,
            from,
            to,
          ),
        ),
      );
  }

  @Patch(':id/cancel-booking')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Cancel a booking (student or admin)' })
  @ApiResponse({
    status: 200,
    description: 'Booking cancelled successfully.',
  })
  async cancelBooking(
    @Req() req: { user: { userId: string; role: UserRole } },
    @Param('id') labId: string,
    @Res() res: Response,
  ) {
    const { userId, role } = req.user;
    return res
      .status(HttpStatus.OK)
      .json(
        new CustomApiResponse(
          'Cancel booking succesfully',
          await this.bookingService.cancelBooking(labId, userId, role),
        ),
      );
  }

  @Patch('cancel-bookings')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Cancel multiple bookings (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Multiple bookings cancelled successfully.',
  })
  async cancelBookings(
    @Body() body: CancelManyBookingDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new CustomApiResponse(
          'Cancel many bookings succesfully',
          await this.bookingService.cancelManyBookings(body),
        ),
      );
  }
}
