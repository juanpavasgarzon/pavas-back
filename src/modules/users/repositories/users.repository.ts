import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';
import type {
  CreateUserData,
  IUser,
  UpdateUserData,
} from '../interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: CreateUserData): Promise<IUser> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  createQueryBuilder(alias: string = 'user'): SelectQueryBuilder<User> {
    return this.repository.createQueryBuilder(alias);
  }

  async findById(id: string): Promise<IUser | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: string, data: UpdateUserData): Promise<IUser> {
    await this.repository.update(id, data);
    const user = await this.findById(id);
    return user!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
