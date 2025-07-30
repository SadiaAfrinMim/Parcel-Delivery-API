"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
function sendResponse(res, statusCode, success, data = null, message = '') {
    res.status(statusCode).json({ success, message, data });
}
