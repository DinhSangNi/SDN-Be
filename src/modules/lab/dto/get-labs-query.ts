import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { LabStatus } from '../types/lab.enum';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetLabsQuery {
  @ApiPropertyOptional({
    description: 'Search by keyword (e.g., lab name or location)',
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    description: 'Filter by lab status',
    enum: LabStatus,
    enumName: 'LabStatus',
  })
  @IsOptional()
  @IsEnum(LabStatus)
  status?: LabStatus;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    description: 'Limit per page for pagination',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
