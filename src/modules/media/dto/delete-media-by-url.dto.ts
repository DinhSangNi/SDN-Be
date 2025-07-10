import { IsString } from 'class-validator';

export class DeleteMediaByUrlDto {
  @IsString()
  url: string;
}
