import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(
    userId: string,
    email: string,
    role: string,
  ): Promise<string> {
    const payload = { sub: userId, email, role };

    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async generateRefreshToken(
    userId: string,
    email: string,
    role: string,
  ): Promise<string> {
    const payload = { sub: userId, email, role };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESHTOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESHTOKEN_EXPIRES_IN') || '7d',
    });

    return refreshToken;
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Email not found');

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Password not match');
    }

    const accessToken = await this.generateAccessToken(
      user._id as string,
      user.email,
      user.role,
    );

    const refreshToken = await this.generateRefreshToken(
      user._id as string,
      user.email,
      user.role,
    );

    const { password, ...rest } = user.toObject();
    return {
      accessToken,
      refreshToken,
      user: rest,
    };
  }

  async register(dto: CreateUserDto) {
    const newUser = await this.userService.createUser(dto);

    const accessToken = await this.generateAccessToken(
      newUser._id as string,
      newUser.email,
      newUser.role,
    );

    const refreshToken = await this.generateRefreshToken(
      newUser._id as string,
      newUser.email,
      newUser.role,
    );

    const { password, ...rest } = newUser.toObject();
    return {
      user: rest,
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESHTOKEN_SECRET'),
      });
      const newAccessToken = await this.generateAccessToken(
        payload.sub,
        payload.email,
        payload.role,
      );
      const newRefreshToken = await this.generateRefreshToken(
        payload.sub,
        payload.email,
        payload.role,
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
