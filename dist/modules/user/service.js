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
exports.getAllUsers = getAllUsers;
exports.updateUserById = updateUserById;
exports.blockUnblockUser = blockUnblockUser;
const model_1 = require("./model");
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return model_1.User.find();
    });
}
function updateUserById(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return model_1.User.findByIdAndUpdate(userId, data, { new: true });
    });
}
function blockUnblockUser(userId, block) {
    return __awaiter(this, void 0, void 0, function* () {
        return model_1.User.findByIdAndUpdate(userId, { isBlocked: block }, { new: true });
    });
}
