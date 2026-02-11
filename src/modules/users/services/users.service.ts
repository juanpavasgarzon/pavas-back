import { Injectable } from '@nestjs/common';
import type { CreateUserData, IUser } from '../interfaces/user.interface';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '../use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '../use-cases/find-user-by-id.use-case';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  create(data: CreateUserData): Promise<IUser> {
    return this.createUserUseCase.execute(data);
  }

  findById(id: string): Promise<IUser> {
    return this.findUserByIdUseCase.execute(id);
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.findUserByEmailUseCase.execute(email);
  }
}
