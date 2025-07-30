"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
function globalErrorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}
