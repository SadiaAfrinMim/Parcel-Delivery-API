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
exports.createParcelHandler = createParcelHandler;
exports.getMyParcels = getMyParcels;
exports.cancelParcelHandler = cancelParcelHandler;
exports.confirmDeliveryHandler = confirmDeliveryHandler;
exports.getAllParcelsHandler = getAllParcelsHandler;
exports.adminUpdateParcelStatus = adminUpdateParcelStatus;
exports.getParcelStatusLog = getParcelStatusLog;
const sendResponse_1 = require("../../utils/sendResponse");
const service_1 = require("./service");
const model_1 = require("./model");
function createParcelHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let parcel = yield (0, service_1.createParcel)(req.body, req.user._id);
            (0, sendResponse_1.sendResponse)(res, 201, true, parcel, 'Parcel created');
        }
        catch (err) {
            next(err);
        }
    });
}
function getMyParcels(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let parcels;
            if (req.user.role === 'sender') {
                parcels = yield (0, service_1.getParcelsBySender)(req.user._id);
            }
            else if (req.user.role === 'receiver') {
                parcels = yield (0, service_1.getParcelsByReceiver)(req.user._id);
            }
            else {
                parcels = [];
            }
            (0, sendResponse_1.sendResponse)(res, 200, true, parcels, 'Parcels fetched');
        }
        catch (err) {
            next(err);
        }
    });
}
function cancelParcelHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parcel = yield (0, service_1.cancelParcel)(req.params.id, req.user._id);
            (0, sendResponse_1.sendResponse)(res, 200, true, parcel, 'Parcel cancelled');
        }
        catch (err) {
            next(err);
        }
    });
}
function confirmDeliveryHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parcel = yield (0, service_1.confirmDelivery)(req.params.id, req.user._id);
            (0, sendResponse_1.sendResponse)(res, 200, true, model_1.Parcel, 'Delivery confirmed');
        }
        catch (err) {
            next(err);
        }
    });
}
function getAllParcelsHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parcels = yield (0, service_1.getAllParcels)();
            (0, sendResponse_1.sendResponse)(res, 200, true, parcels, 'All parcels fetched');
        }
        catch (err) {
            next(err);
        }
    });
}
function adminUpdateParcelStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { status, note, location } = req.body;
            const parcel = yield (0, service_1.updateParcelStatusAdmin)(req.params.id, status, req.user._id, note, location);
            (0, sendResponse_1.sendResponse)(res, 200, true, parcel, 'Parcel status updated');
        }
        catch (err) {
            next(err);
        }
    });
}
function getParcelStatusLog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parcelId = req.params.id;
            const parcel = yield model_1.Parcel.findById(parcelId);
            if (!parcel)
                return res.status(404).json({ success: false, message: 'Parcel not found' });
            // Authorization check
            const userId = req.user._id.toString();
            const userRole = req.user.role;
            if (userRole === 'sender' && parcel.sender.toString() !== userId ||
                userRole === 'receiver' && parcel.receiver.toString() !== userId) {
                return res.status(403).json({ success: false, message: 'Unauthorized' });
            }
            (0, sendResponse_1.sendResponse)(res, 200, true, parcel.statusLogs, 'Parcel status logs fetched');
        }
        catch (err) {
            next(err);
        }
    });
}
