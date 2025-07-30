import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/types/enums';

export class UpdateUserRoleDto {
  @ApiProperty({
    enum: UserRole,
    example: UserRole.ADMIN,
    description: 'New role of the user (must be either "admin" or "student")',
  })
  @IsEnum(UserRole, { message: 'Role must be either "admin" or "student"' })
  role: UserRole;
}
