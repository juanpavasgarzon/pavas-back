import { Injectable } from '@nestjs/common';
import type { IUser } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string): Promise<IUser | null> {
    return this.usersRepository.findByEmail(email);
  }
}
