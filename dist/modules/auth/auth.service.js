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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    userService;
    jwtService;
    configService;
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async generateAccessToken(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = await this.jwtService.signAsync(payload);
        return accessToken;
    }
    async generateRefreshToken(userId, email, role) {
        const payload = { sub: userId, email, role };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESHTOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESHTOKEN_EXPIRES_IN') || '7d',
        });
        return refreshToken;
    }
    async login(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user)
            throw new common_1.UnauthorizedException('Email not found');
        if (!(await bcrypt.compare(dto.password, user.password))) {
            throw new common_1.UnauthorizedException('Password not match');
        }
        const accessToken = await this.generateAccessToken(user._id, user.email, user.role);
        const refreshToken = await this.generateRefreshToken(user._id, user.email, user.role);
        const { password, ...rest } = user.toObject();
        return {
            accessToken,
            refreshToken,
            user: rest,
        };
    }
    async loginWithGoogle(email) {
        const existed = await this.userService.findByEmail(email);
        if (!existed)
            throw new common_1.UnauthorizedException('Email not registered');
        return existed;
    }
    async register(dto) {
        const newUser = (await this.userService.createUser(dto)).toObject();
        const accessToken = await this.generateAccessToken(newUser._id, newUser.email, newUser.role);
        const refreshToken = await this.generateRefreshToken(newUser._id, newUser.email, newUser.role);
        const { password, ...rest } = newUser;
        return {
            user: rest,
            accessToken,
            refreshToken,
        };
    }
    async refreshAccessToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('JWT_REFRESHTOKEN_SECRET'),
            });
            const newAccessToken = await this.generateAccessToken(payload.sub, payload.email, payload.role);
            const newRefreshToken = await this.generateRefreshToken(payload.sub, payload.email, payload.role);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map