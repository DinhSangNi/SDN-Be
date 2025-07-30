import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMediaByUrlDto {
  @ApiProperty({
    description: 'URL của media cần xóa',
    example:
      'https://res.cloudinary.com/demo/image/upload/v1625811134/sample.jpg',
  })
  @IsString()
  url: string;
}
