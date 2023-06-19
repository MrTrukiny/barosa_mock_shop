import { ErrorRequestHandler, Response } from 'express';
import { ApiErrorMessages, ApiResponseError, ApiStatus, StatusCode } from '../../api.types';
import ApiError from '../errors/base.error';

const errorHandlerMiddleware: ErrorRequestHandler = (error, _req, res, next): Response | void => {
  /** Uncomment to debug errors */
  //console.error('Error from ErrorHandlerMiddleware Stack =>', error);
  // console.error('Error from ErrorHandlerMiddleware Raw =>', JSON.stringify(error, null, 2));

  if (res.headersSent) {
    return next(error);
  }

  const apiError = new ApiError('InternalError', ApiErrorMessages.HTTP_500, 500);
  const errorResponse: ApiResponseError = {
    statusCode: error.statusCode || apiError.statusCode,
    response: {
      status: error.status || ApiStatus.ERROR,
      message: error.message || apiError.message,
    },
  };

  const validationErrors: { [key: string]: string } = {};
  /**  Joi Validation Errors */
  /* if (error instanceof ValidationError) {
    error.details.forEach((detail) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      validationErrors[detail.context!.key!] = `Field ${detail.message.replaceAll(/"/g, "'")}`;
    });
    setValidationErrorProps(errorResponse, validationErrors);
  } */

  /** Mongoose Errors */
  if (error.name === 'ValidationError' && error.errors) {
    const { errors } = error;
    Object.keys(errors).forEach((err) => {
      validationErrors[err] = errors[err].message.replaceAll(/"/g, "'");
    });
    setValidationErrorProps(errorResponse, validationErrors);
  }

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    errorResponse.statusCode = StatusCode.BAD_REQUEST;
    errorResponse.response.message = ApiErrorMessages.INVALID_ID;
  }

  if (error instanceof TypeError) {
    errorResponse.response.message = ApiErrorMessages.HTTP_500;
    errorResponse.statusCode = StatusCode.INTERNAL_ERROR;
  }

  return res.status(errorResponse.statusCode).json(errorResponse.response);
};

export default errorHandlerMiddleware;

function setValidationErrorProps(error: ApiResponseError, validationErrors: { [key: string]: string }) {
  error.statusCode = StatusCode.BAD_REQUEST;
  error.response.validationErrors = validationErrors;
  error.response.message = ApiErrorMessages.VALIDATION_ERROR;
}
