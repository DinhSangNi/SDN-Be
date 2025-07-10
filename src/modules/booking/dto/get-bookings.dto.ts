import { IsDateString, IsMongoId } from 'class-validator';

export class GetBookingsByLabAndDateRangeDto {
  @IsMongoId()
  labId: string;

  @IsDateString()
  from: string;

  @IsDateString()
  to: string;
}
