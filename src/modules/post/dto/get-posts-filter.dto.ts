import {
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  IsEnum,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PostType } from '../types/post.enum';
import { SortType } from 'src/common/types/enums';

export class GetPostsFilterDto {
  @ApiPropertyOptional({ example: true, description: 'Filter by visibility' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isVisible?: boolean;

  @ApiPropertyOptional({
    enum: PostType,
    example: PostType.ANNOUNCEMENT,
    description: 'Filter by post type',
  })
  @IsOptional()
  @IsEnum(PostType)
  type?: PostType;

  @ApiPropertyOptional({ example: 1, description: 'Filter by priority >= 0' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  priority?: number;

  @ApiPropertyOptional({ example: 1, description: 'Pagination - page number' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Pagination - items per page',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    enum: SortType,
    example: SortType.LATEST,
    description: 'Sort posts',
  })
  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;

  @ApiPropertyOptional({
    example: 'nestjs',
    description: 'Search keyword in title or content',
  })
  @IsOptional()
  @IsString()
  keyword?: string;
}
