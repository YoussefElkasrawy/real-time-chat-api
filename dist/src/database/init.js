"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const env_1 = __importDefault(require("../config/env"));
const log_1 = require("../log");
const mongoose_1 = __importDefault(require("mongoose"));
async function initDB() {
    try {
        await mongoose_1.default.connect(env_1.default.MONGODB_URI, {});
        log_1.log.info('Connected to DB.');
    }
    catch (error) {
        throw new Error(`DB Connection Error ${error}`);
    }
}
exports.initDB = initDB;
//# sourceMappingURL=init.js.map