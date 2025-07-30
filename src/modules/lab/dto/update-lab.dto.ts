import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLabDto {
  @ApiPropertyOptional({
    description: 'Tên của phòng lab',
    example: 'Phòng Lab A1',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Mô tả chi tiết về phòng lab',
    example: 'Phòng có máy tính cấu hình cao',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Vị trí của phòng lab',
    example: 'Tầng 2, khu A',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Tổng số ghế trong phòng',
    example: 30,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalSeats?: number;
}
