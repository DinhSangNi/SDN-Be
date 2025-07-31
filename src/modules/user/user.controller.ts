import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { GetFilterUsersDto } from './dto/get-users-filter.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
import { User } from './schema/user.schema';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserActiveDto } from './dto/update-user-active.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiOkResponse({
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
  })
  async getAllUsers(
    @Query() filterDto: GetFilterUsersDto,
    @Res() res: Response,
  ) {
    const data = await this.userService.findAll(filterDto);
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<PaginatedResponse<User>>(
          'List of users',
          new PaginatedResponse(
            data.users,
            data.page,
            data.limit,
            data.totalItems,
          ),
        ),
      );
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({
    summary:
      'Create a new user (admin only) and send user creation notification email',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data required to create a new user',
  })
  async CreateUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    const savedUser = await this.userService.createUser(dto);
    const { password, ...rest } = savedUser.toObject();
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<Omit<User, 'password'>>(
          'Update role of user successfully',
          rest,
        ),
      );
  }

  @Patch('/:id/role')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Update user role (admin only)' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to update',
    example: '64c3c0f0f4e8f5a9b2e9c4d1',
  })
  @ApiBody({
    type: UpdateUserRoleDto,
    description: 'New role to assign to the user',
  })
  async updateUserRole(
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<User>(
          'Update role of user successfully',
          await this.userService.updateRole(id, dto),
        ),
      );
  }

  @Patch('/:id/active')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Update active status of user (admin only)' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user whose active status is being updated',
    example: '64c3c0f0f4e8f5a9b2e9c4d1',
  })
  @ApiBody({
    type: UpdateUserActiveDto,
    description: 'New active status to apply to the user',
  })
  async updateActiveStatus(
    @Param('id') id: string,
    @Body() dto: UpdateUserActiveDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<User>(
          'Update role of user successfully',
          await this.userService.updateActiveStatus(id, dto),
        ),
      );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @ApiOperation({ summary: 'Delete a user by ID (admin only)' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user to be deleted',
    example: '64c3c0f0f4e8f5a9b2e9c4d1',
  })
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse<User>(
          'Delete user successfully',
          await this.userService.delete(id),
        ),
      );
  }
}
