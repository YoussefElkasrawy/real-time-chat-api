"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const index_1 = __importDefault(require("./index"));
for (const key in index_1.default) {
    if (index_1.default[key] === undefined || index_1.default[key] === '') {
        throw new Error(`Environment variable '${key}' not found`);
    }
}
//# sourceMappingURL=init.js.map