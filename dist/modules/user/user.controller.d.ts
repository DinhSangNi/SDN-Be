import { UserService } from './user.service';
import { Response } from 'express';
import { GetFilterUsersDto } from './dto/get-users-filter.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserActiveDto } from './dto/update-user-active.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(filterDto: GetFilterUsersDto, res: Response): Promise<Response<any, Record<string, any>>>;
    CreateUser(dto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    createUsersByExcelFile(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUserRole(id: string, dto: UpdateUserRoleDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateActiveStatus(id: string, dto: UpdateUserActiveDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
