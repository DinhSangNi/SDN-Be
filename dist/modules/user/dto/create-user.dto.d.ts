import { UserRole } from 'src/common/types/enums';
export declare class CreateUserDto {
    email: string;
    password: string;
    fullName?: string;
    role?: UserRole;
}
