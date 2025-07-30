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
exports.register = register;
exports.login = login;
const sendResponse_1 = require("../../utils/sendResponse");
const validation_1 = require("./validation");
const service_1 = require("./service");
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validated = validation_1.registerSchema.parse(req.body);
            const user = yield (0, service_1.registerUser)(validated);
            (0, sendResponse_1.sendResponse)(res, 201, true, user, 'User registered successfully');
        }
        catch (err) {
            next(err);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validated = validation_1.loginSchema.parse(req.body);
            const data = yield (0, service_1.loginUser)(validated.email, validated.password);
            (0, sendResponse_1.sendResponse)(res, 200, true, data, 'Login successful');
        }
        catch (err) {
            next(err);
        }
    });
}
