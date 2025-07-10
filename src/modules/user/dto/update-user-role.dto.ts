import { IsEnum } from 'class-validator';
import { UserRole } from '../schema/user.schema';

export class UpdateUserRoleDto {
  @IsEnum(UserRole, { message: 'Role must be either "admin" or "student"' })
  role: UserRole;
}
