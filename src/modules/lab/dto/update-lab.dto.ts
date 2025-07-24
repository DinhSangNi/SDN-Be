import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateLabDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalSeats?: number;
}
