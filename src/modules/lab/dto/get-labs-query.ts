import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { LabStatus } from '../types/lab.enum';
import { Type } from 'class-transformer';

export class GetLabsQuery {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(LabStatus)
  status?: LabStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
