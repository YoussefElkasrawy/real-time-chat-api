"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const config_1 = __importDefault(require("../config"));
const mongoose_1 = __importDefault(require("mongoose"));
async function initDB() {
    await mongoose_1.default.connect(config_1.default.MONGODB_URI);
}
exports.initDB = initDB;
//# sourceMappingURL=init.js.map