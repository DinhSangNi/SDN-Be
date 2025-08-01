import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { UserDocument } from '../user/schema/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user and return access & refresh tokens' })
  @ApiBody({ type: LoginDto })
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
  @ApiOperation({ summary: 'Register a new user and return tokens' })
  @ApiBody({ type: CreateUserDto })
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
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiCookieAuth()
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
  @ApiOperation({ summary: 'Logout user and clear refresh token' })
  logout(@Res() res: Response) {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    return res
      .status(HttpStatus.OK)
      .json(new ApiResponse('Refresh token sucessfully'));
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Xác thực bằng Google' })
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Xác thực bằng Google - Redirect' })
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as {
      email: string;
      name: string;
      picture: string;
      googleId: string;
    };

    const existedUser = await this.authService.loginWithGoogle(user.email);

    const accessToken = await this.authService.generateAccessToken(
      existedUser._id as string,
      existedUser.email,
      existedUser.role,
    );
    const refreshToken = await this.authService.generateRefreshToken(
      existedUser._id as string,
      existedUser.email,
      existedUser.role,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password, ...rest } = existedUser;

    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage(${JSON.stringify({ accessToken: accessToken, user: rest })}, "*");
            window.close();
          </script>
        </body>
      </html>
    `);
  }
}
