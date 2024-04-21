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

  static invalidLanguage(): ApiError {
    return new ApiError('Invalid language.', HttpStatus.BadRequest);
  }

  static invalidEmailCredentials(): ApiError {
    return new ApiError('Invalid email or password.', HttpStatus.BadRequest);
  }

  static invalidPhoneCredentials(): ApiError {
    return new ApiError('Invalid phone number or password.', HttpStatus.BadRequest);
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

  static invalidOTP(): ApiError {
    return new ApiError('The provided OTP is not valid or has expired.', HttpStatus.BadRequest);
  }

  static duplicate(name: string): ApiError {
    return new ApiError(`${name} is already exists.`, HttpStatus.BadRequest);
  }

  static notAvailableBrand(): ApiError {
    return new ApiError('Brand not available.', HttpStatus.BadRequest);
  }

  static invalidBrandId(): ApiError {
    return new ApiError('Invalid brand id.', HttpStatus.BadRequest);
  }

  static invalidBranchId(): ApiError {
    return new ApiError('Invalid branch id.', HttpStatus.BadRequest);
  }

  static invalidBrandServiceId(): ApiError {
    return new ApiError('Invalid service id.', HttpStatus.BadRequest);
  }

  static invalidBrandCategoryId(): ApiError {
    return new ApiError('Invalid category id.', HttpStatus.BadRequest);
  }

  static invalidMediaId(): ApiError {
    return new ApiError('Invalid media id.', HttpStatus.BadRequest);
  }

  static invalidTicketId(): ApiError {
    return new ApiError('Invalid ticket id.', HttpStatus.BadRequest);
  }

  static invalidChatId(): ApiError {
    return new ApiError('Invalid chat id.', HttpStatus.BadRequest);
  }

  static invalidMainCategoryId(): ApiError {
    return new ApiError('Invalid main category id.', HttpStatus.BadRequest);
  }

  static invalidBannerId(): ApiError {
    return new ApiError('Invalid banner id.', HttpStatus.BadRequest);
  }

  static invalidCouponeId(): ApiError {
    return new ApiError('Invalid coupone id.', HttpStatus.BadRequest);
  }

  static invalidUserId(): ApiError {
    return new ApiError('Invalid user id.', HttpStatus.BadRequest);
  }

  static invalidAdminId(): ApiError {
    return new ApiError('Invalid admin id.', HttpStatus.BadRequest);
  }

  static invalidProviderId(): ApiError {
    return new ApiError('Invalid provider id.', HttpStatus.BadRequest);
  }

  static invalidAvailabilityId(): ApiError {
    return new ApiError('Invalid availability id.', HttpStatus.BadRequest);
  }

  static notFoundBrand(): ApiError {
    return new ApiError('Brand not found.', HttpStatus.NotFound);
  }

  static notFoundBranch(): ApiError {
    return new ApiError('Branch not found.', HttpStatus.NotFound);
  }

  static notFoundBrandService(): ApiError {
    return new ApiError('Service not found.', HttpStatus.NotFound);
  }

  static notFoundBrandCategory(): ApiError {
    return new ApiError('Category not found.', HttpStatus.NotFound);
  }

  static notFoundMedia(): ApiError {
    return new ApiError('Media not found.', HttpStatus.NotFound);
  }

  static notFoundTicket(): ApiError {
    return new ApiError('Ticket not found.', HttpStatus.NotFound);
  }

  static notFounChat(): ApiError {
    return new ApiError('Chat not found.', HttpStatus.NotFound);
  }

  static notFoundMainCategory(): ApiError {
    return new ApiError('MainCategory not found.', HttpStatus.NotFound);
  }

  static notFoundBanner(): ApiError {
    return new ApiError('Banner not found.', HttpStatus.NotFound);
  }

  static notFoundCoupone(): ApiError {
    return new ApiError('Coupone not found.', HttpStatus.BadRequest);
  }

  static notFoundUser(): ApiError {
    return new ApiError('User not found.', HttpStatus.NotFound);
  }

  static notFoundAdmin(): ApiError {
    return new ApiError('Admin not found.', HttpStatus.NotFound);
  }

  static notFoundProvider(): ApiError {
    return new ApiError('Provider not found.', HttpStatus.NotFound);
  }

  static notFoundBooking(): ApiError {
    return new ApiError('Booking not found.', HttpStatus.NotFound);
  }
}
