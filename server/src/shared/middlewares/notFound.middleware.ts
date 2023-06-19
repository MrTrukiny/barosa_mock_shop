import { RequestHandler } from 'express';
import { ApiErrorMessages } from '../../api.types';
import ApiError from '../errors/base.error';

const notFound404Middleware: RequestHandler = (_req, _res, next) => {
  const error = new ApiError('NotFound404', ApiErrorMessages.HTTP_404, 404);
  next(error);
};

export default notFound404Middleware;
