import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMediaByIdDto {
  @ApiProperty({
    description: 'ID của media cần xóa',
    example: '64c8e2d8f4f5a0c9bcb3123f',
  })
  @IsString()
  id: string;
}
