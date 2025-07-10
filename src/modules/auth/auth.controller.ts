import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { UserDocument } from '../user/schema/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json(
      new ApiResponse<{
        user: UserDocument;
        accessToken: string;
      }>('Login successfully', {
        user,
        accessToken,
      }),
    );
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.CREATED).json(
      new ApiResponse<{
        user: Partial<UserDocument>;
        accessToken: string;
      }>('Register successfully', {
        user,
        accessToken,
      }),
    );
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshAccessToken(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json(
      new ApiResponse<{
        accessToken: string;
      }>('Refresh token sucessfully', {
        accessToken,
      }),
    );
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    return res
      .status(HttpStatus.OK)
      .json(new ApiResponse('Refresh token sucessfully'));
  }
}
