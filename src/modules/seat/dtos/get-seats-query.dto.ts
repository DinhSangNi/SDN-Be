import { IsMongoId, IsOptional } from 'class-validator';

export class GetSeatsQueryDto {
  @IsOptional()
  @IsMongoId()
  labId?: string;
}
