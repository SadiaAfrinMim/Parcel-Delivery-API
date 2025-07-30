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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../user/model");
const config_1 = __importDefault(require("../../config/config"));
function registerUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, role } = data;
        const existingUser = yield model_1.User.findOne({ email });
        if (existingUser)
            throw new Error('User already exists');
        const user = new model_1.User({ name, email, password, role });
        yield user.save();
        return user;
    });
}
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield model_1.User.findOne({ email });
        if (!user)
            throw new Error('Invalid credentials');
        const isMatch = yield user.comparePassword(password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, config_1.default.jwt_secret, {
            expiresIn: '7d',
        });
        return { token, user };
    });
}
