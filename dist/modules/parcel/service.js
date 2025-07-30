"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParcel = createParcel;
exports.getParcelsBySender = getParcelsBySender;
exports.getParcelsByReceiver = getParcelsByReceiver;
exports.getAllParcels = getAllParcels;
exports.cancelParcel = cancelParcel;
exports.confirmDelivery = confirmDelivery;
exports.updateParcelStatusAdmin = updateParcelStatusAdmin;
const constants_1 = require("../../config/constants");
const model_1 = require("./model");
function createParcel(data, senderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { receiverId, parcelType, weight, addressFrom, addressTo } = data;
        const fee = weight * 10; // example fee calculation
        const trackingId = `TRK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100000 + Math.random() * 900000)}`;
        const parcel = new model_1.Parcel({
            sender: senderId,
            receiver: receiverId,
            parcelType,
            weight,
            addressFrom,
            addressTo,
            fee,
            trackingId,
            status: constants_1.ParcelStatus.REQUESTED,
            statusLogs: [{
                    status: constants_1.ParcelStatus.REQUESTED,
                    updatedBy: senderId,
                    timestamp: new Date(),
                    note: 'Parcel requested',
                }],
        });
        yield parcel.save();
        return parcel;
    });
}
function getParcelsBySender(senderId) {
    return __awaiter(this, void 0, void 0, function* () {
        return model_1.Parcel.find({ sender: senderId });
    });
}
function getParcelsByReceiver(receiverId) {
    return __awaiter(this, void 0, void 0, function* () {
        return model_1.Parcel.find({ receiver: receiverId });
    });
}
function getAllParcels() {
    return __awaiter(this, void 0, void 0, function* () {
        return model_1.Parcel.find();
    });
}
function cancelParcel(parcelId, senderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const parcel = yield model_1.Parcel.findById(parcelId);
        if (!parcel)
            throw new Error('Parcel not found');
        if (!parcel.sender.equals(senderId))
            throw new Error('Not your parcel');
        const nonCancellableStatuses = [
            constants_1.ParcelStatus.DISPATCHED,
            constants_1.ParcelStatus.IN_TRANSIT,
            constants_1.ParcelStatus.DELIVERED
        ];
        // Check if parcel status is in the array
        if (nonCancellableStatuses.includes(parcel.status)) {
            throw new Error('Cannot cancel dispatched or delivered parcel');
        }
        parcel.status = constants_1.ParcelStatus.CANCELLED;
        parcel.statusLogs.push({
            status: constants_1.ParcelStatus.CANCELLED,
            updatedBy: senderId,
            timestamp: new Date(),
            note: 'Parcel cancelled by sender',
        });
        yield parcel.save();
        return parcel;
    });
}
function confirmDelivery(parcelId, receiverId) {
    return __awaiter(this, void 0, void 0, function* () {
        const parcel = yield model_1.Parcel.findById(parcelId);
        if (!parcel)
            throw new Error('Parcel not found');
        if (!parcel.receiver.equals(receiverId))
            throw new Error('Not your parcel');
        if (parcel.status !== constants_1.ParcelStatus.IN_TRANSIT)
            throw new Error('Parcel is not in transit');
        parcel.status = constants_1.ParcelStatus.DELIVERED;
        parcel.statusLogs.push({
            status: constants_1.ParcelStatus.DELIVERED,
            updatedBy: receiverId,
            timestamp: new Date(),
            note: 'Parcel delivered and confirmed by receiver',
        });
        yield parcel.save();
        return parcel;
    });
}
function updateParcelStatusAdmin(parcelId, status, userId, note, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const parcel = yield model_1.Parcel.findById(parcelId);
        if (!parcel)
            throw new Error('Parcel not found');
        parcel.status = status;
        parcel.statusLogs.push({
            status,
            updatedBy: userId,
            timestamp: new Date(),
            note,
            location,
        });
        yield parcel.save();
        return parcel;
    });
}
