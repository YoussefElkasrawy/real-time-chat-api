"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controller/authController");
const error_1 = require("../error");
const isAuth_1 = require("../middlwares/isAuth");
const express_1 = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_, __, next, options) => next(new error_1.ApiError(options.message, options.statusCode)),
});
const router = (0, express_1.Router)();
router.post('/login', limiter, authController_1.login);
router.post('/signup', limiter, authController_1.signup);
router.post('/update-password', limiter, isAuth_1.isAuth, authController_1.updatePassword);
exports.default = router;
//# sourceMappingURL=authRoute.js.map