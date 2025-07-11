import { UserRole } from '../schema/user.schema';
export declare class CreateUserDto {
    email: string;
    password: string;
    fullName?: string;
    role?: UserRole;
}
