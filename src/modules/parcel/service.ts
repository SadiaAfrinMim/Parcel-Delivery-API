
import { ParcelStatus } from '../../config/constants';
import { Types } from 'mongoose';
import { Parcel } from './model';

export async function createParcel(data: any, senderId: Types.ObjectId) {
  const { receiverId, parcelType, weight, addressFrom, addressTo } = data;

  const fee = weight * 10; // example fee calculation
  const trackingId = `TRK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100000 + Math.random() * 900000)}`;

  const parcel = new Parcel({
    sender: senderId,
    receiver: receiverId,
    parcelType,
    weight,
    addressFrom,
    addressTo,
    fee,
    trackingId,
    status: ParcelStatus.REQUESTED,
    statusLogs: [{
      status: ParcelStatus.REQUESTED,
      updatedBy: senderId,
      timestamp: new Date(),
      note: 'Parcel requested',
    }],
  });

  await parcel.save();
  return parcel;
}

export async function getParcelsBySender(senderId: Types.ObjectId) {
  return Parcel.find({ sender: senderId });
}

export async function getParcelsByReceiver(receiverId: Types.ObjectId) {
  return Parcel.find({ receiver: receiverId });
}

export async function getAllParcels() {
  return Parcel.find();
}

export async function cancelParcel(parcelId: string, senderId: Types.ObjectId) {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new Error('Parcel not found');
  if (!parcel.sender.equals(senderId)) throw new Error('Not your parcel');
 const nonCancellableStatuses: string[] = [
  ParcelStatus.DISPATCHED,
  ParcelStatus.IN_TRANSIT,
  ParcelStatus.DELIVERED
];

// Check if parcel status is in the array
if (nonCancellableStatuses.includes(parcel.status)) {
  throw new Error('Cannot cancel dispatched or delivered parcel');
}
  parcel.status = ParcelStatus.CANCELLED;
  parcel.statusLogs.push({
    status: ParcelStatus.CANCELLED,
    updatedBy: senderId,
    timestamp: new Date(),
    note: 'Parcel cancelled by sender',
  });
  await parcel.save();
  return parcel;
}

export async function confirmDelivery(parcelId: string, receiverId: Types.ObjectId) {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new Error('Parcel not found');
  if (!parcel.receiver.equals(receiverId)) throw new Error('Not your parcel');
  if (parcel.status !== ParcelStatus.IN_TRANSIT) throw new Error('Parcel is not in transit');

  parcel.status = ParcelStatus.DELIVERED;
  parcel.statusLogs.push({
    status: ParcelStatus.DELIVERED,
    updatedBy: receiverId,
    timestamp: new Date(),
    note: 'Parcel delivered and confirmed by receiver',
  });
  await parcel.save();
  return parcel;
}

export async function updateParcelStatusAdmin(parcelId: string, status: string, userId: Types.ObjectId, note?: string, location?: string) {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new Error('Parcel not found');
  parcel.status = status;
  parcel.statusLogs.push({
    status,
    updatedBy: userId,
    timestamp: new Date(),
    note,
    location,
  });
  await parcel.save();
  return parcel;
}
