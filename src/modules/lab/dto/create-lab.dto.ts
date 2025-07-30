import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLabDto {
  @ApiProperty({ description: 'Lab name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Lab description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Lab location' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: 'Total number of seats in lab',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalSeats: number;

  @ApiPropertyOptional({
    description: 'Should the system auto-generate seats?',
    type: Boolean,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  autoGenerateSeats: boolean;
}
