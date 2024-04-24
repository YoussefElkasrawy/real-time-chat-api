"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = {
    PORT: process.env['PORT'],
    NODE_ENV: process.env['NODE_ENV'],
    MONGODB_URI: process.env['MONGODB_URI'],
    ACCESS_TOKEN_EXP: process.env['ACCESS_TOKEN_EXP'],
    ACCESS_TOKEN_KEY: process.env['ACCESS_TOKEN_KEY'],
};
exports.default = Config;
//# sourceMappingURL=index.js.map