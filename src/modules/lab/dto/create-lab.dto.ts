import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
