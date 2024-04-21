export enum HttpStatus {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionRequired = 412,
  RequestEntryTooLarge = 413,
  RequestURITooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
}

export class ApiError extends Error {
  public code: HttpStatus = HttpStatus.InternalServerError;
  public status: string;

  constructor(message: string, code: number) {
    super(message.toString());
    this.code = code;
    this.status = 'error';
  }

  static invalidCredentials(): ApiError {
    return new ApiError('Invalid username or password.', HttpStatus.BadRequest);
  }

  static unauthorized(): ApiError {
    return new ApiError('You are not authorized to do that.', HttpStatus.Unauthorized);
  }

  static invalidToken(): ApiError {
    return new ApiError('Invalid or expired token.', HttpStatus.BadRequest);
  }

  static invalidTokenFormat(): ApiError {
    return new ApiError('Invalid token format.', HttpStatus.BadRequest);
  }

  static duplicate(name: string): ApiError {
    return new ApiError(`${name} is already exists.`, HttpStatus.BadRequest);
  }
}
