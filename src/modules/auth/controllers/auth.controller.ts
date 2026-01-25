import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CurrentUser, Public } from 'src/common';
import { User } from 'src/modules/users';
import { RequirePermissions } from '../decorators/require-permissions.decorator';
import { LoginRequest } from '../dto/request/login.request';
import { RegisterRequest } from '../dto/request/register.request';
import { AuthResponse } from '../dto/response/auth.response';
import { ProfileResponse } from '../dto/response/profile.response';
import { Permission } from '../enums/permission.enum';
import { LoginUseCase } from '../use-cases/login.use-case';
import { RegisterUseCase } from '../use-cases/register.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() request: RegisterRequest): Promise<AuthResponse> {
    const result = await this.registerUseCase.execute(request);
    return new AuthResponse(result);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequest): Promise<AuthResponse> {
    const result = await this.loginUseCase.execute(request);
    return new AuthResponse(result);
  }

  @Get('profile')
  @RequirePermissions(Permission.PROFILE_READ)
  getProfile(@CurrentUser() user: User): ProfileResponse {
    return new ProfileResponse({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
