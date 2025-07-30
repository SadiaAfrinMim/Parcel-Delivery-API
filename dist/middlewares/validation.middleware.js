"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(schema) {
    return (req, res, next) => {
        var _a, _b;
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            res.status(400).json({ success: false, message: ((_b = (_a = err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Validation failed' });
        }
    };
}
