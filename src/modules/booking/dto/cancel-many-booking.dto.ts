import { IsArray, ArrayNotEmpty, IsMongoId } from 'class-validator';

export class CancelManyBookingDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  bookingIds: string[];
}
