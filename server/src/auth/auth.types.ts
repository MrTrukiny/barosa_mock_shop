import { HttpReq } from '../api.types';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthRegister = User;

export type AuthLogin = Pick<User, 'email' | 'password'>;

export interface AuthHttpPostReq extends Omit<HttpReq, 'body'> {
  body: AuthRegister | AuthLogin;
}

export enum AuthSuccessMessages {
  LOGGED_IN = 'User logged in successfully',
  REGISTERED = 'User registered successfully',
}

export enum AuthErrorMessages {
  INVALID_CREDENTIALS = 'Invalid credentials',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  INVALID_EMAIL = 'Invalid email',
}
