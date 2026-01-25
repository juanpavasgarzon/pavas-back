import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProfileResponse {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  constructor(partial: Partial<ProfileResponse>) {
    Object.assign(this, partial);
  }
}
