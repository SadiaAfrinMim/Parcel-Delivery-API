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
exports.getUsers = getUsers;
exports.updateUser = updateUser;
const sendResponse_1 = require("../../utils/sendResponse");
const service_1 = require("./service");
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, service_1.getAllUsers)();
            (0, sendResponse_1.sendResponse)(res, 200, true, users, 'Users fetched successfully');
        }
        catch (err) {
            next(err);
        }
    });
}
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const updatedUser = yield (0, service_1.updateUserById)(userId, req.body);
            if (!updatedUser)
                return res.status(404).json({ success: false, message: 'User not found' });
            (0, sendResponse_1.sendResponse)(res, 200, true, updatedUser, 'User updated');
        }
        catch (err) {
            next(err);
        }
    });
}
