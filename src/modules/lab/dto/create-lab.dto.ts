import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLabDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalSeats: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  autoGenerateSeats: string;
}
