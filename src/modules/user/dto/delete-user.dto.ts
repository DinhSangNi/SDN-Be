import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @ApiPropertyOptional({
    description: 'ID of user that need to delete',
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
