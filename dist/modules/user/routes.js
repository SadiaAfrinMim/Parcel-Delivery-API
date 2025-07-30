"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const controller_1 = require("./controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, auth_middleware_1.authorizeRoles)('admin'), controller_1.getUsers);
router.patch('/:id', auth_middleware_1.authenticateJWT, (0, auth_middleware_1.authorizeRoles)('admin'), (0, validation_middleware_1.validateRequest)(validation_1.updateUserSchema), controller_1.updateUser);
exports.userRoutes = router;
