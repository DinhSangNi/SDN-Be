import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
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

  @Patch('/:id/role')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
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
