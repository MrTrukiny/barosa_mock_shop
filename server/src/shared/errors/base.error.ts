import { ApiErrorMessages, StatusCode } from '../../api.types';
import { AuthErrorMessages } from '../../auth/auth.types';

class ApiError extends Error {
  statusCode: StatusCode;
  constructor(name: string, message: ApiErrorMessages | AuthErrorMessages, statusCode: StatusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

export default ApiError;
