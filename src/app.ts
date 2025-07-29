import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';





import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { AuthsRoutes } from './modules/auth/routes';
import { userRoutes } from './modules/user/routes';
import { parcelRoutes } from './modules/parcel/routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', AuthsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/parcels', parcelRoutes);

app.use(globalErrorHandler);
app.get('/', (req:Request, res:Response) => {
  res.send('📦 Parcel Delivery API is running!');
});

export default app;
