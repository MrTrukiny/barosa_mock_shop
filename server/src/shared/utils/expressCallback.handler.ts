import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Controller, ControllerResponse, HttpReq } from '../../api.types';

interface ExpressCallback {
  (controller: Controller, buildHttpRequest?: BuildValidHttpRequest): RequestHandler;
}
/**
 * Express callback handler.
 * @param {Function} controller Controller that will be executed.
 * @param {Function} buildValidHttpRequest Function that will be used to build our valid minimal HTTP request.
 * @returns {Function} Function that returns the response of the Controller or catches the errors incoming from any part of the API.
 */
const makeExpressCallbackHandler: ExpressCallback = (
  controller,
  buildHttpRequest = buildValidHttpRequest,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = buildHttpRequest(req);
    controller(httpRequest)
      .then((response: ControllerResponse): void => {
        res.locals = { ...res.locals, ...response };
        next();
      })
      .catch(next);
  };
};

export interface BuildValidHttpRequest {
  (req: Request): HttpReq;
}
/**
 * Helper to build a valid HTTP request.
 * @param {Object} req The Request object coming from Express.
 * @returns {Object} A valid HTTP request object with our own shape.
 */
export const buildValidHttpRequest: BuildValidHttpRequest = (req: Request): HttpReq => {
  return {
    body: req.body,
    headers: {
      'Content-Type': req.get('Content-Type'),
    },
    ip: req.ip,
    method: req.method,
    params: req.params,
    path: req.path,
    query: req.query,
  };
};

export default makeExpressCallbackHandler;
