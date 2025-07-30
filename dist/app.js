"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const routes_1 = require("./modules/auth/routes");
const routes_2 = require("./modules/user/routes");
const routes_3 = require("./modules/parcel/routes");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/auth', routes_1.AuthsRoutes);
app.use('/api/users', routes_2.userRoutes);
app.use('/api/parcels', routes_3.parcelRoutes);
app.use(globalErrorHandler_1.globalErrorHandler);
app.get('/', (req, res) => {
    res.send('📦 Parcel Delivery API is running!');
});
exports.default = app;
