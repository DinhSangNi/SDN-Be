import {
  IsMongoId,
  IsDateString,
  IsIn,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { BookingStatus } from '../types/booking.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID của phòng lab',
    example: '64dcd2f4f2e8cbe9a7345a71',
  })
  @IsMongoId()
  labId: string;

  @ApiProperty({
    description: 'ID của ghế muốn đặt',
    example: '64dcd2f4f2e8cbe9a7345a77',
  })
  @IsMongoId()
  seatId: string;

  @ApiProperty({
    description: 'Ngày đặt (định dạng yyyy-mm-dd)',
    example: '2025-08-01',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Ca đặt chỗ (1 = sáng, 2 = chiều, 3 = tối, 4 = đêm)',
    example: 2,
    enum: [1, 2, 3, 4],
  })
  @IsIn([1, 2, 3, 4])
  slot: number;

  @ApiPropertyOptional({
    description: 'Trạng thái booking (mặc định là pending)',
    enum: BookingStatus,
    example: BookingStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
