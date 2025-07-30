import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateTextDto {
  @ApiProperty({
    example: 'Write a short story about a dragon.',
    description: 'The input prompt used to generate AI text',
  })
  @IsNotEmpty()
  @IsString()
  prompt: string;
}
