import ApiError from '../shared/errors/base.error';
import { AuthErrorMessages, AuthLogin, AuthRegister } from './auth.types';
import { UserMongoose } from './user.model';

export interface AuthActionsParams {
  findUserByEmail: ({ email, select }: { email: string; select?: object }) => Promise<UserMongoose | null>;
  hashPassword: (password: string) => Promise<string>;
  saveUser: (user: AuthRegister) => Promise<UserMongoose>;
  verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>;
}

export interface AuthActions {
  registerUser: ({ firstName, lastName, email, password }: AuthRegister) => Promise<UserMongoose>;
  loginUser: ({ email, password }: AuthLogin) => Promise<void>;
}

const makeAuthActions = ({ findUserByEmail, hashPassword, saveUser, verifyPassword }: AuthActionsParams) => {
  return Object.freeze({
    registerUser,
    loginUser,
  });

  async function registerUser({ firstName, lastName, email, password }: AuthRegister): Promise<UserMongoose> {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new ApiError('AuthError', AuthErrorMessages.INVALID_EMAIL, 400);
    }

    const existingUser = await findUserByEmail({ email });
    if (existingUser) {
      throw new ApiError('AuthError', AuthErrorMessages.EMAIL_ALREADY_EXISTS, 400);
    }

    return await saveUser({
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
    });
  }

  async function loginUser({ email, password }: AuthLogin): Promise<void> {
    const user = await findUserByEmail({ email, select: { password: 1 } });

    const matchPasswords = await verifyPassword(user?.password as string, password);

    if (!user || !matchPasswords) {
      throw new ApiError('AuthError', AuthErrorMessages.INVALID_CREDENTIALS, 400);
    }

    return;
  }
};

export default makeAuthActions;
