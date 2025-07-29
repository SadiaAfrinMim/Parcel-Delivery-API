import { Schema, model, Document, Types } from 'mongoose';
import { ParcelStatus } from '../../config/constants';

interface IStatusLog {
  status: string;
  timestamp: Date;
  updatedBy: Types.ObjectId; // admin or system user id
  note?: string;
  location?: string;
}

export interface IParcel extends Document {
  trackingId: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  parcelType: string;
  weight: number;
  addressFrom: string;
  addressTo: string;
  fee: number;
  status: string;
  statusLogs: IStatusLog[];
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const statusLogSchema = new Schema<IStatusLog>({
  status: { type: String, enum: Object.values(ParcelStatus), required: true },
  timestamp: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  note: { type: String },
  location: { type: String },
});

const parcelSchema = new Schema<IParcel>({
  trackingId: { type: String, required: true, unique: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parcelType: { type: String, required: true },
  weight: { type: Number, required: true },
  addressFrom: { type: String, required: true },
  addressTo: { type: String, required: true },
  fee: { type: Number, required: true },
  status: { type: String, enum: Object.values(ParcelStatus), default: ParcelStatus.REQUESTED },
  statusLogs: [statusLogSchema],
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

export const Parcel = model<IParcel>('Parcel', parcelSchema);
