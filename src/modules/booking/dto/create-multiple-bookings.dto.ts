import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMultipleBookingsDto {
  @ApiProperty({
    type: [CreateBookingDto],
    description: 'Danh sách các booking cần tạo',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingDto)
  bookings: CreateBookingDto[];
}
