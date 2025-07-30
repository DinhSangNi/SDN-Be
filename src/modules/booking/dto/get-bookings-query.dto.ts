import {
  IsOptional,
  IsMongoId,
  IsEnum,
  IsDateString,
  IsNumberString,
  IsNumber,
  IsString,
} from 'class-validator';
import { BookingStatus } from '../types/booking.enum';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetBookingQueryDto {
  @ApiPropertyOptional({
    description: 'Từ khóa tìm kiếm (tên lab, tên người dùng, etc)',
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ description: 'ID phòng lab' })
  @IsOptional()
  @IsMongoId()
  labId?: string;

  @ApiPropertyOptional({ description: 'ID người dùng tạo booking' })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @ApiPropertyOptional({
    enum: BookingStatus,
    description: 'Trạng thái booking',
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({ enum: [1, 2, 3, 4], description: 'Ca học (1~4)' })
  @IsOptional()
  @IsNumberString()
  slot?: string;

  @ApiPropertyOptional({ description: 'Ngày cụ thể (yyyy-MM-dd)' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: 'Ngày bắt đầu (yyyy-MM-dd)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'Ngày kết thúc (yyyy-MM-dd)' })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({ example: 1, description: 'Trang hiện tại' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Số phần tử trên mỗi trang',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Trường muốn sắp xếp theo (vd: date, slot, etc)',
  })
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], description: 'Thứ tự sắp xếp' })
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
