"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// Load environment variables from a .env file into process.env
(0, dotenv_1.config)();
const env_1 = __importDefault(require("./env"));
const dir_1 = require("./dir");
const log_1 = require("../log");
// Iterate over each key in the Config object
for (const key in env_1.default) {
    // Check if the environment variable is undefined or an empty string
    if (env_1.default[key] === undefined || env_1.default[key] === '') {
        // Log an error message if the environment variable is not found
        log_1.log.error(`Environment variable '${key}' not found`);
        // Throw an error to stop the execution
        throw new Error(`Environment variable '${key}' not found`);
    }
}
// Create necessary directories
(0, dir_1.CreateDir)();
//# sourceMappingURL=init.js.map