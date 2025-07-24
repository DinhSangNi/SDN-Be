import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { SeatStatus } from '../types/seat.enum';

export class CreateSeatDto {
  @IsString()
  seatNumber: string;

  @IsMongoId()
  labId: string;

  @IsOptional()
  @IsEnum(SeatStatus)
  status?: SeatStatus;
}
