"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).optional(),
    email: zod_1.z.string().email().optional(),
    isBlocked: zod_1.z.boolean().optional(),
    role: zod_1.z.enum(['admin', 'sender', 'receiver']).optional(),
});
