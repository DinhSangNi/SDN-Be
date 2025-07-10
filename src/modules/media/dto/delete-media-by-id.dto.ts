import { IsString } from 'class-validator';

export class DeleteMediaByIdDto {
  @IsString()
  id: string;
}
