"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../config/constants");
const statusLogSchema = new mongoose_1.Schema({
    status: { type: String, enum: Object.values(constants_1.ParcelStatus), required: true },
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String },
    location: { type: String },
});
const parcelSchema = new mongoose_1.Schema({
    trackingId: { type: String, required: true, unique: true },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    parcelType: { type: String, required: true },
    weight: { type: Number, required: true },
    addressFrom: { type: String, required: true },
    addressTo: { type: String, required: true },
    fee: { type: Number, required: true },
    status: { type: String, enum: Object.values(constants_1.ParcelStatus), default: constants_1.ParcelStatus.REQUESTED },
    statusLogs: [statusLogSchema],
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });
exports.Parcel = (0, mongoose_1.model)('Parcel', parcelSchema);
