import { RequestHandler, Response } from 'express';

const responseHandlerMiddleware: RequestHandler = (_req, res, next): Response | void => {
  const { response } = res.locals;

  if (response) {
    if (response.headers) {
      res.set(response.headers);
    }

    return res.status(response.statusCode).json(response.body);
  }

  next();
};

export default responseHandlerMiddleware;
