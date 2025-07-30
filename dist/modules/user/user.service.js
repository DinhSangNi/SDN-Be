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
const enums_1 = require("../../common/types/enums");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map