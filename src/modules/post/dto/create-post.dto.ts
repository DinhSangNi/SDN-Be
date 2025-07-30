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
import { PostType } from '../types/post.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'How to use NestJS', description: 'Post title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'NestJS is a progressive Node.js framework...',
    description: 'Post content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'URL of the cover image',
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'coverImage phải là URL hợp lệ' })
  coverImage?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Post visibility status',
  })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @ApiProperty({
    enum: PostType,
    example: PostType.POST,
    description: 'Type of the post',
  })
  @IsEnum(PostType)
  type: PostType;

  @ApiPropertyOptional({
    example: 1,
    description: 'Priority level of the post',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number;
}
