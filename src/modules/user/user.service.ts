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
import * as XLSX from 'xlsx';
import { plainToInstance } from 'class-transformer';
import { UserImportResult } from './types';
import { validate } from 'class-validator';
import { toCamelCase } from 'src/common/utils';

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

  async createUsersByExcelFile(file: Express.Multer.File) {
    // ✅ Kiểm tra định dạng file
    if (
      file.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      file.mimetype !== 'application/vnd.ms-excel'
    ) {
      throw new BadRequestException(
        'Only Excel files (.xlsx or .xls) are supported',
      );
    }

    // ✅ Đọc file
    let workBook: XLSX.WorkBook;
    try {
      workBook = XLSX.read(file.buffer, { type: 'buffer' });
    } catch (error) {
      console.error('XLSX parsing error:', error);
      throw new BadRequestException('Uploaded file is not a valid Excel file');
    }

    const createdUsers: Omit<User, 'password'>[] = [];
    const errors: UserImportResult['errors'] = [];

    for (const sheetName of workBook.SheetNames) {
      const workSheet = workBook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(workSheet);

      if (rawData.length === 0) {
        console.warn(`Sheet "${sheetName}" is empty, skipping...`);
        continue;
      }

      for (let i = 0; i < rawData.length; i++) {
        const rowIndex = i;
        const row = rawData[i] as Record<string, any>;

        try {
          // Chuyển key thành camelCase
          const normalizedRow: Record<string, any> = {};
          for (const [key, value] of Object.entries(row)) {
            normalizedRow[
              toCamelCase(key) === 'fullname' ? 'fullName' : toCamelCase(key)
            ] = value;
          }

          if (!normalizedRow.password) {
            normalizedRow.password = '123456789';
          }

          const dto = plainToInstance(CreateUserDto, normalizedRow);
          const validationErrors = await validate(dto);

          if (validationErrors.length > 0) {
            const msgs = validationErrors.map((err) =>
              Object.values(err.constraints ?? {}).join(', '),
            );
            const { password, ...rest } = normalizedRow;

            errors.push({
              sheet: sheetName,
              row: rowIndex,
              error: msgs,
              data: rest,
            });
            continue;
          }

          const newUser = await this.createUser(dto);
          const { password, ...rest } = newUser.toObject();
          createdUsers.push(rest);
        } catch (err) {
          const { password, ...rest } = row;
          const errorMessage =
            typeof err === 'string'
              ? err
              : err?.message || 'Unexpected error during user creation';

          errors.push({
            sheet: sheetName,
            row: rowIndex,
            error: [errorMessage],
            data: rest,
          });
        }
      }
    }

    return {
      createdUsers,
      errors,
    };
  }
}
