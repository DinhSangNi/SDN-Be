"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const get_users_filter_dto_1 = require("./dto/get-users-filter.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
const paginated_response_dto_1 = require("../../common/dto/paginated-response.dto");
const update_user_role_dto_1 = require("./dto/update-user-role.dto");
const update_user_active_dto_1 = require("./dto/update-user-active.dto");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../../common/guards/role.guard");
const role_decorator_1 = require("../../common/decorators/role.decorator");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers(filterDto, res) {
        const data = await this.userService.findAll(filterDto);
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('List of users', new paginated_response_dto_1.PaginatedResponse(data.users, data.page, data.limit, data.totalItems)));
    }
    async CreateUser(dto, res) {
        const savedUser = await this.userService.createUser(dto);
        const { password, ...rest } = savedUser.toObject();
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Update role of user successfully', rest));
    }
    async createUsersByExcelFile(file, res) {
        return res
            .status(common_1.HttpStatus.CREATED)
            .json(new api_response_dto_1.ApiResponse('Create users by excel file successfully', await this.userService.createUsersByExcelFile(file)));
    }
    async updateUserRole(id, dto, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Update role of user successfully', await this.userService.updateRole(id, dto)));
    }
    async updateActiveStatus(id, dto, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Update role of user successfully', await this.userService.updateActiveStatus(id, dto)));
    }
    async deleteUser(id, res) {
        return res
            .status(common_1.HttpStatus.OK)
            .json(new api_response_dto_1.ApiResponse('Delete user successfully', await this.userService.delete(id)));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users (admin only)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of users retrieved successfully',
        schema: {
            example: {
                message: 'List of users',
                data: {
                    items: [
                        {
                            _id: 'userId123',
                            email: 'john@example.com',
                            role: 'user',
                            isActive: true,
                            createdAt: '2024-01-01T00:00:00.000Z',
                        },
                    ],
                    page: 1,
                    limit: 10,
                    totalItems: 100,
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_filter_dto_1.GetFilterUsersDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new user (admin only) and send user creation notification email',
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        description: 'Data required to create a new user',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "CreateUser", null);
__decorate([
    (0, common_1.Post)('import-excel'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Import users from Excel file (admin only)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Excel file upload',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUsersByExcelFile", null);
__decorate([
    (0, common_1.Patch)('/:id/role'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user role (admin only)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the user to update',
        example: '64c3c0f0f4e8f5a9b2e9c4d1',
    }),
    (0, swagger_1.ApiBody)({
        type: update_user_role_dto_1.UpdateUserRoleDto,
        description: 'New role to assign to the user',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_role_dto_1.UpdateUserRoleDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Patch)('/:id/active'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update active status of user (admin only)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the user whose active status is being updated',
        example: '64c3c0f0f4e8f5a9b2e9c4d1',
    }),
    (0, swagger_1.ApiBody)({
        type: update_user_active_dto_1.UpdateUserActiveDto,
        description: 'New active status to apply to the user',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_active_dto_1.UpdateUserActiveDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateActiveStatus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user by ID (admin only)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the user to be deleted',
        example: '64c3c0f0f4e8f5a9b2e9c4d1',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map