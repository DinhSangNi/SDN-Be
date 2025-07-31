// src/users/user.service.ts

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { GetFilterUsersDto } from './dto/get-users-filter.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserActiveDto } from './dto/update-user-active.dto';
import { UserRole } from 'src/common/types/enums';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { email, password, fullName, role } = dto;

    const existing = await this.userModel.findOne({ email }).lean();
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      email,
      password: hashedPassword,
      fullName,
      role: role || UserRole.STUDENT,
    });

    const savedUser = await user.save();
    await this.mailService.sendAccountCreationEmail(savedUser.email);

    return savedUser;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email });
  }

  async findAll(query: GetFilterUsersDto) {
    const { role, isActive, page = 1, limit = 10 } = query;

    const filter: any = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const skip = (page - 1) * limit;
    const users = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .select('-password')
      .lean();

    const totalItems = await this.userModel.countDocuments(filter).lean();

    return {
      users,
      totalItems,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalItems / limit),
    };
  }

  async updateRole(userId: string, dto: UpdateUserRoleDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    user.role = dto.role;
    return (await user.save()).toObject();
  }

  async updateActiveStatus(
    userId: string,
    dto: UpdateUserActiveDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = dto.isActive;
    return (await user.save()).toObject();
  }

  async delete(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.deleteOne();
    return user.toObject();
  }
}
