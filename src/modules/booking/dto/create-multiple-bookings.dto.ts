import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBookingDto } from './create-booking.dto';

export class CreateMultipleBookingsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingDto)
  bookings: CreateBookingDto[];
}
