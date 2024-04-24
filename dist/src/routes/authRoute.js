"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controller/authController");
const error_1 = require("../error");
const isAuth_1 = require("../middlwares/isAuth");
const express_1 = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: (_, __, next, options) => next(new error_1.ApiError(options.message, options.statusCode)),
});
const router = (0, express_1.Router)();
router.post('/login', limiter, authController_1.login);
router.post('/signup', authController_1.signup);
router.post('/update-password', isAuth_1.isAuth, authController_1.updatePassword);
exports.default = router;
//# sourceMappingURL=authRoute.js.map