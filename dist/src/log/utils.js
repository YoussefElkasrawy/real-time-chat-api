"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logResponse = exports.logRequest = void 0;
const index_1 = require("./index");
/**
 * Logs an incoming request.
 *
 * @param method - The HTTP method of the request.
 * @param path - The path of the request.
 * @param ip - The IP address of the client.
 * @param agent - The user agent of the client.
 */
function logRequest(method, path, ip, agent) {
    index_1.log.info(`[${method}] ${path} <- |Client ${ip}| |Agent ${agent}|`);
}
exports.logRequest = logRequest;
/**
 * Logs an outgoing response.
 *
 * @param method - The HTTP method of the request.
 * @param path - The path of the request.
 * @param statusCode - The HTTP status code of the response.
 * @param ms - The time taken to process the request in milliseconds.
 */
function logResponse(method, path, statusCode, ms) {
    if (statusCode >= 500) {
        index_1.log.error(`[${method}] ${path} -> |${statusCode}| [${ms}ms]`);
    }
    else if (statusCode >= 400) {
        index_1.log.warn(`[${method}] ${path} -> |${statusCode}| [${ms}ms]`);
    }
    else {
        index_1.log.info(`[${method}] ${path} -> |${statusCode}| [${ms}ms]`);
    }
}
exports.logResponse = logResponse;
//# sourceMappingURL=utils.js.map