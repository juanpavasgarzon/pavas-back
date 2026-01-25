export interface IAuthResponse {
  user: IUserProfile;
  accessToken: string;
}

export interface IUserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IJwtPayload {
  sub: string;
  email: string;
}
