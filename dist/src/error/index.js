"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["Created"] = 201] = "Created";
    HttpStatus[HttpStatus["Accepted"] = 202] = "Accepted";
    HttpStatus[HttpStatus["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HttpStatus[HttpStatus["NoContent"] = 204] = "NoContent";
    HttpStatus[HttpStatus["ResetContent"] = 205] = "ResetContent";
    HttpStatus[HttpStatus["PartialContent"] = 206] = "PartialContent";
    HttpStatus[HttpStatus["MultipleChoices"] = 300] = "MultipleChoices";
    HttpStatus[HttpStatus["MovedPermanently"] = 301] = "MovedPermanently";
    HttpStatus[HttpStatus["Found"] = 302] = "Found";
    HttpStatus[HttpStatus["SeeOther"] = 303] = "SeeOther";
    HttpStatus[HttpStatus["NotModified"] = 304] = "NotModified";
    HttpStatus[HttpStatus["UseProxy"] = 305] = "UseProxy";
    HttpStatus[HttpStatus["Unused"] = 306] = "Unused";
    HttpStatus[HttpStatus["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["PaymentRequired"] = 402] = "PaymentRequired";
    HttpStatus[HttpStatus["Forbidden"] = 403] = "Forbidden";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpStatus[HttpStatus["NotAcceptable"] = 406] = "NotAcceptable";
    HttpStatus[HttpStatus["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpStatus[HttpStatus["RequestTimeout"] = 408] = "RequestTimeout";
    HttpStatus[HttpStatus["Conflict"] = 409] = "Conflict";
    HttpStatus[HttpStatus["Gone"] = 410] = "Gone";
    HttpStatus[HttpStatus["LengthRequired"] = 411] = "LengthRequired";
    HttpStatus[HttpStatus["PreconditionRequired"] = 412] = "PreconditionRequired";
    HttpStatus[HttpStatus["RequestEntryTooLarge"] = 413] = "RequestEntryTooLarge";
    HttpStatus[HttpStatus["RequestURITooLong"] = 414] = "RequestURITooLong";
    HttpStatus[HttpStatus["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    HttpStatus[HttpStatus["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    HttpStatus[HttpStatus["ExpectationFailed"] = 417] = "ExpectationFailed";
    HttpStatus[HttpStatus["ImATeapot"] = 418] = "ImATeapot";
    HttpStatus[HttpStatus["TooManyRequests"] = 429] = "TooManyRequests";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
    HttpStatus[HttpStatus["NotImplemented"] = 501] = "NotImplemented";
    HttpStatus[HttpStatus["BadGateway"] = 502] = "BadGateway";
    HttpStatus[HttpStatus["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpStatus[HttpStatus["GatewayTimeout"] = 504] = "GatewayTimeout";
    HttpStatus[HttpStatus["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
class ApiError extends Error {
    constructor(message, code) {
        super(message.toString());
        this.code = HttpStatus.InternalServerError;
        this.code = code;
        this.status = 'error';
    }
    static invalidCredentials() {
        return new ApiError('Invalid username or password.', HttpStatus.BadRequest);
    }
    static unauthorized() {
        return new ApiError('You are not authorized to do that.', HttpStatus.Unauthorized);
    }
    static invalidToken() {
        return new ApiError('Invalid or expired token.', HttpStatus.BadRequest);
    }
    static invalidTokenFormat() {
        return new ApiError('Invalid token format.', HttpStatus.BadRequest);
    }
    static duplicate(name) {
        return new ApiError(`${name} is already exists.`, HttpStatus.BadRequest);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=index.js.map