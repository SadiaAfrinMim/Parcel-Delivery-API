"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParcelStatusSchema = exports.createParcelSchema = void 0;
const zod_1 = require("zod");
exports.createParcelSchema = zod_1.z.object({
    receiverId: zod_1.z.string().length(24), // mongoose ObjectId length
    parcelType: zod_1.z.string().min(1),
    weight: zod_1.z.number().positive(),
    addressFrom: zod_1.z.string().min(1),
    addressTo: zod_1.z.string().min(1),
});
exports.updateParcelStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['Requested', 'Approved', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled']),
    note: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
});
