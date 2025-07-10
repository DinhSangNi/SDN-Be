import { IsBoolean } from 'class-validator';

export class UpdatePostVisibilityDto {
  @IsBoolean()
  isVisible: boolean;
}
