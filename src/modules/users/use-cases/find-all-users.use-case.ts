import { Injectable } from '@nestjs/common';
import { paginate, PaginationResponse } from 'src/common';
import type { IUser } from '../interfaces/user.interface';
import { UsersQueryRequest } from '../dto/request/users-query.request';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: UsersQueryRequest): Promise<PaginationResponse<IUser>> {
    const qb = this.usersRepository.createQueryBuilder('user');

    return paginate(qb, query, {
      alias: 'user',
      searchFields: ['email', 'firstName', 'lastName'],
    });
  }
}
