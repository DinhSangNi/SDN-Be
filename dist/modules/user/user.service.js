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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const create_user_dto_1 = require("./dto/create-user.dto");
const enums_1 = require("../../common/types/enums");
const mail_service_1 = require("../mail/mail.service");
const XLSX = require("xlsx");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../common/utils");
let UserService = class UserService {
    userModel;
    mailService;
    constructor(userModel, mailService) {
        this.userModel = userModel;
        this.mailService = mailService;
    }
    async createUser(dto) {
        const { email, password, fullName, role } = dto;
        const existing = await this.userModel.findOne({ email }).lean();
        if (existing) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: hashedPassword,
            fullName,
            role: role || enums_1.UserRole.STUDENT,
        });
        const savedUser = await user.save();
        await this.mailService.sendAccountCreationEmail(savedUser.email);
        return savedUser;
    }
    async findByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async findAll(query) {
        const { role, isActive, page = 1, limit = 10 } = query;
        const filter = {};
        if (role)
            filter.role = role;
        if (isActive !== undefined)
            filter.isActive = isActive === 'true';
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
    async updateRole(userId, dto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.role = dto.role;
        return (await user.save()).toObject();
    }
    async updateActiveStatus(userId, dto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isActive = dto.isActive;
        return (await user.save()).toObject();
    }
    async delete(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await user.deleteOne();
        return user.toObject();
    }
    async createUsersByExcelFile(file) {
        if (file.mimetype !==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
            file.mimetype !== 'application/vnd.ms-excel') {
            throw new common_1.BadRequestException('Only Excel files (.xlsx or .xls) are supported');
        }
        let workBook;
        try {
            workBook = XLSX.read(file.buffer, { type: 'buffer' });
        }
        catch (error) {
            console.error('XLSX parsing error:', error);
            throw new common_1.BadRequestException('Uploaded file is not a valid Excel file');
        }
        const createdUsers = [];
        const errors = [];
        for (const sheetName of workBook.SheetNames) {
            const workSheet = workBook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(workSheet);
            if (rawData.length === 0) {
                console.warn(`Sheet "${sheetName}" is empty, skipping...`);
                continue;
            }
            for (let i = 0; i < rawData.length; i++) {
                const rowIndex = i;
                const row = rawData[i];
                try {
                    const normalizedRow = {};
                    for (const [key, value] of Object.entries(row)) {
                        normalizedRow[(0, utils_1.toCamelCase)(key)] = value;
                    }
                    if (!normalizedRow.password) {
                        normalizedRow.password = '123456789';
                    }
                    const dto = (0, class_transformer_1.plainToInstance)(create_user_dto_1.CreateUserDto, normalizedRow);
                    const validationErrors = await (0, class_validator_1.validate)(dto);
                    if (validationErrors.length > 0) {
                        const msgs = validationErrors.map((err) => Object.values(err.constraints ?? {}).join(', '));
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
                    const { password, ...rest } = newUser;
                    createdUsers.push(rest);
                }
                catch (err) {
                    const { password, ...rest } = row;
                    const errorMessage = typeof err === 'string'
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
        if (createdUsers.length === 0 && errors.length > 0) {
            throw new common_1.BadRequestException('All sheets contain invalid data');
        }
        return {
            createdUsers,
            errors,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map