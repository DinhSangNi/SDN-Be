import { IsArray, ArrayNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelManyBookingDto {
  @ApiProperty({
    description: 'Danh sách các bookingId cần huỷ',
    example: ['64d3a749bcf86cd799439012', '64d3a749bcf86cd799439013'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  bookingIds: string[];
}
