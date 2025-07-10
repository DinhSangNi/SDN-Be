import { IsInt, Min } from 'class-validator';

export class UpdatePostPriorityDto {
  @IsInt({ message: 'Priority must be an integer' })
  @Min(0, { message: 'Priority must be at least 0' })
  priority: number;
}
