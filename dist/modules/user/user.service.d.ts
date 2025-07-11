import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetFilterUsersDto } from './dto/get-users-filter.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserActiveDto } from './dto/update-user-active.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(dto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findAll(query: GetFilterUsersDto): Promise<{
        users: (import("mongoose").FlattenMaps<UserDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
        totalItems: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateRole(userId: string, dto: UpdateUserRoleDto): Promise<User>;
    updateActiveStatus(userId: string, dto: UpdateUserActiveDto): Promise<User>;
    delete(id: string): Promise<User>;
}
