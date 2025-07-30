import { IsDateString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookingsByLabAndDateRangeDto {
  @ApiProperty({
    description: 'ID của phòng lab',
    example: '64d3a749bcf86cd799439012',
  })
  @IsMongoId()
  labId: string;

  @ApiProperty({
    description: 'Ngày bắt đầu (format: yyyy-MM-dd)',
    example: '2025-08-01',
  })
  @IsDateString()
  from: string;

  @ApiProperty({
    description: 'Ngày kết thúc (format: yyyy-MM-dd)',
    example: '2025-08-31',
  })
  @IsDateString()
  to: string;
}
