import { UserRole } from 'src/common/types/enums';
export declare class GetFilterUsersDto {
    role?: UserRole;
    isActive?: string;
    page?: number;
    limit?: number;
}
