import { verify, hash } from 'argon2';

export interface AuthHashPassword {
  (password: string): Promise<string>;
}
export const hashPassword: AuthHashPassword = async (password) => await hash(password);

export interface AuthVerifyPassword {
  (hash: string, plain: string): Promise<boolean>;
}
export const verifyPassword: AuthVerifyPassword = async (hashedPass, plainPass) => await verify(hashedPass, plainPass);
