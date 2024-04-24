"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponse = void 0;
function wrapResponse(data) {
    const response = {
        status: 'success',
        data: data,
    };
    return response;
}
exports.wrapResponse = wrapResponse;
//# sourceMappingURL=response.js.map