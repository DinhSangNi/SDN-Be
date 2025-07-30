import { IsMongoId, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetSeatsQueryDto {
  @ApiPropertyOptional({
    description: 'Optional MongoDB ObjectId of the lab to filter seats',
    example: '64c3c0f0f4e8f5a9b2e9c4d1',
  })
  @IsOptional()
  @IsMongoId()
  labId?: string;
}
