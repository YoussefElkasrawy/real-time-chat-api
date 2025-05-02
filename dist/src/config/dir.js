"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDir = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// List of directories to be created
const Dirs = ['logs'];
/**
 * Function to create directories if they do not exist.
 */
function CreateDir() {
    for (const dir of Dirs) {
        // Construct the path to the directory
        const path = (0, node_path_1.join)(__dirname, '..', '..', dir);
        // Check if the directory already exists
        if ((0, node_fs_1.existsSync)(path))
            continue;
        // Create the directory recursively
        (0, node_fs_1.mkdirSync)(path, { recursive: true });
    }
}
exports.CreateDir = CreateDir;
//# sourceMappingURL=dir.js.map