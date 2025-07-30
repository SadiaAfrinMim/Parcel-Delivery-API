"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelStatus = exports.Roles = void 0;
exports.Roles = {
    ADMIN: 'admin',
    SENDER: 'sender',
    RECEIVER: 'receiver',
};
exports.ParcelStatus = {
    REQUESTED: 'Requested',
    APPROVED: 'Approved',
    DISPATCHED: 'Dispatched',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
};
