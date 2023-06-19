import { ControllerResponse, StatusCode, ApiStatus, HttpReq } from '../api.types';
import { AuthActions } from './auth.actions';
import { AuthHttpPostReq, AuthLogin, AuthRegister, AuthSuccessMessages } from './auth.types';

const makeAuthController = ({ registerUser, loginUser }: AuthActions) => {
  return Object.freeze({
    postRegister,
    postLogin,
  });

  async function postRegister(httpRequest: HttpReq): Promise<ControllerResponse> {
    const { body } = httpRequest as AuthHttpPostReq;
    const user = await registerUser({ ...body } as AuthRegister);

    return {
      response: {
        statusCode: StatusCode.CREATED,
        body: {
          status: ApiStatus.OK,
          message: AuthSuccessMessages.REGISTERED,
          data: { user },
        },
      },
    };
  }

  async function postLogin(httpRequest: HttpReq): Promise<ControllerResponse> {
    const { body } = httpRequest as AuthHttpPostReq;
    await loginUser({ ...body } as AuthLogin);

    return {
      response: {
        statusCode: StatusCode.OK,
        body: {
          status: ApiStatus.OK,
          message: AuthSuccessMessages.LOGGED_IN,
        },
      },
    };
  }
};

export default makeAuthController;
