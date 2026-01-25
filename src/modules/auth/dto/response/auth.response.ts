import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class UserProfileResponse {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  constructor(partial: Partial<UserProfileResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class AuthResponse {
  @Expose()
  @Type(() => UserProfileResponse)
  user: UserProfileResponse;

  @Expose()
  accessToken: string;

  constructor(partial: Partial<AuthResponse>) {
    Object.assign(this, partial);
    if (partial.user) {
      this.user = new UserProfileResponse(partial.user);
    }
  }
}
