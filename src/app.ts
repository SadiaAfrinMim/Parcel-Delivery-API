import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './modules/auth/auth.route';
import userRoutes from './modules/user/user.route';
import parcelRoutes from './modules/parcel/parcel.route';

import { globalErrorHandler } from './middlewares/globalErrorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/parcels', parcelRoutes);

app.use(globalErrorHandler);

export default app;
