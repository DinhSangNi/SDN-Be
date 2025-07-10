import { IsOptional, IsBoolean, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PostType } from './create-post.dto';

export enum SortType {
  LATEST = 'latest',
  OLDEST = 'oldest',
}

export class GetPostsFilterDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isVisible?: boolean;

  @IsOptional()
  @IsEnum(PostType)
  type?: PostType;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  priority?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;
}
