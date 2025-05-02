"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
function errorMiddleware(app) {
    const errorHandler = async (err, _, res, __) => {
        let code = err.code || 500;
        const responseError = {
            status: 'error',
            error: {
                code: code,
                message: err.message,
            },
        };
        log_1.log.error(err.message);
        res.status(code).json(responseError);
    };
    app.use(errorHandler);
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map