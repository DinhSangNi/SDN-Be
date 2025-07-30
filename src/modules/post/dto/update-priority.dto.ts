import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostPriorityDto {
  @ApiProperty({
    example: 5,
    description:
      'The new priority for the post (must be a non-negative integer)',
    minimum: 0,
  })
  @IsInt({ message: 'Priority must be an integer' })
  @Min(0, { message: 'Priority must be at least 0' })
  priority: number;
}
