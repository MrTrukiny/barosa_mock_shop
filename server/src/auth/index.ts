import makeAuthActions from './auth.actions';
import makeAuthController from './auth.controller';
import makeAuthDao from './auth.dao';
import AuthModel from './user.model';
import { hashPassword, verifyPassword } from './auth.utils';

const authDao = makeAuthDao({ AuthModel });

const authActions = makeAuthActions({
  findUserByEmail: authDao.findOne,
  hashPassword,
  saveUser: authDao.save,
  verifyPassword,
});

const authController = makeAuthController({ registerUser: authActions.registerUser, loginUser: authActions.loginUser });

export { authController };
