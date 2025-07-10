import {
  IsMongoId,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  lab: string;

  @IsDateString()
  date: string;

  @IsIn([1, 2, 3, 4])
  slot: number;

  @IsOptional()
  @IsString()
  reason?: string;
}
