import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostVisibilityDto {
  @ApiProperty({
    example: true,
    description: 'Set post visibility status (true = visible, false = hidden)',
    type: Boolean,
  })
  @IsBoolean()
  isVisible: boolean;
}
