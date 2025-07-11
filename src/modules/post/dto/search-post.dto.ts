import { IsOptional, IsString, IsIn, IsNumberString } from 'class-validator';

export class SearchPostDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsIn(['post', 'announcement'])
  type?: 'post' | 'announcement';

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
