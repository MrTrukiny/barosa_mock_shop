/** API REQUEST AND RESPONSES */
export interface HttpReq {
  body: unknown;
  headers: unknown;
  ip: string;
  method: string;
  params: { [key: string]: string };
  path: string;
  query: unknown;
}

export interface ControllerResponse {
  response: {
    statusCode: StatusCode;
    body: {
      status: string;
      message: string;
      data?: unknown;
    };
  };
}

export interface ApiResponseError {
  statusCode: StatusCode;
  response: {
    status: ApiStatus;
    message: string;
    validationErrors?: { [key: string]: string };
  };
}

export enum ApiErrorMessages {
  HTTP_400 = 'Bad request',
  HTTP_404 = 'Not found',
  HTTP_500 = "An unknown error has ocurred! We'll fix it as soon as possible",
  VALIDATION_ERROR = 'The request did not pass validation rules',
  BODY_NULL = "This request must include a 'body'",
  INVALID_ID = "This request must include a valid 'id'",
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export enum ApiStatus {
  OK = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface Controller {
  (httpRequest: HttpReq): Promise<ControllerResponse>;
}
