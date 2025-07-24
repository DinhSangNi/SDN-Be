import {
  IsMongoId,
  IsDateString,
  IsIn,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { BookingStatus } from '../types/booking.enum';

export class CreateBookingDto {
  @IsMongoId()
  labId: string;

  @IsMongoId()
  seatId: string;

  @IsDateString()
  date: string;

  @IsIn([1, 2, 3, 4])
  slot: number;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
