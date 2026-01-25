import { Exclude, Expose } from 'class-transformer';
import type { Role } from 'src/modules/auth';
import type { IUser } from '../../interfaces/user.interface';

@Exclude()
export class UserResponse implements Omit<IUser, 'password'> {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: Role;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
