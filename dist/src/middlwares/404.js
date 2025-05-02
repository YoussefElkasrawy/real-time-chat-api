"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
function _404Middleware(app) {
    app.use(() => {
        throw new error_1.ApiError('EndPoint Not Found!', error_1.HttpStatus.NotFound);
    });
}
exports.default = _404Middleware;
//# sourceMappingURL=404.js.map