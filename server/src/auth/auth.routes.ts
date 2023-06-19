// Create routes for login and register
import { Router } from 'express';
import adaptRequest from '../shared/utils/expressCallback.handler';
import { authController } from '.';

const authRouter = Router();

authRouter.post('/register', adaptRequest(authController.postRegister));
authRouter.post('/login', adaptRequest(authController.postLogin));

export default authRouter;
