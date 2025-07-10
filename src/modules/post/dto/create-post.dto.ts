import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PostType {
  POST = 'post',
  ANNOUNCEMENT = 'announcement',
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'coverImage phải là URL hợp lệ' })
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @IsEnum(PostType)
  type: PostType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // ✅ mỗi phần tử trong mảng phải là string
  tags?: string[];
}
