import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class CreateMediaDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  publicId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsString()
  uploadedBy?: string;

  @IsOptional()
  @IsBoolean()
  isTemporary?: boolean;

  @IsOptional()
  @IsString()
  type?: string; // image, video, audio, file

  @IsOptional()
  @IsString()
  relatedTo?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
