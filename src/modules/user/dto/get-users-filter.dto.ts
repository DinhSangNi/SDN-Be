import {
  IsOptional,
  IsString,
  IsBooleanString,
  IsNumberString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/common/types/enums';
import { Type } from 'class-transformer';

export class GetFilterUsersDto {
  @ApiPropertyOptional({
    description: 'Role of the user to filter (e.g., admin, user)',
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Filter by active status (true or false)',
    example: 'true',
  })
  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: '1',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: '10',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
