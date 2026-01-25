import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { IJwtPayload } from '../interfaces/auth.interface';
import { ValidateUserUseCase } from '../use-cases/validate-user.use-case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly validateUserUseCase: ValidateUserUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.secret'),
    });
  }

  async validate(payload: IJwtPayload) {
    try {
      return await this.validateUserUseCase.execute(payload.sub);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
