import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, UsersService } from 'src/modules/users';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(userId: string): Promise<IUser> {
    const user = await this.usersService.findById(userId);
    if (!user?.isActive) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
