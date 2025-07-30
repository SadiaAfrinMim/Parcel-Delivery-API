import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';

import { sendResponse } from '../../utils/sendResponse';
import { createParcel, getParcelsBySender,
  getParcelsByReceiver,
  cancelParcel,
  confirmDelivery,
  getAllParcels,
  updateParcelStatusAdmin,

 } from './service';
import { Parcel } from './model';

export async function createParcelHandler(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    let parcel = await createParcel(req.body, req.user._id);
    sendResponse(res, 201, true, parcel, 'Parcel created');
  } catch (err) {
    next(err);
  }
}

export async function getMyParcels(req: AuthRequest, res: Response, next: NextFunction) {
  try {
   
let parcels: any;
    if (req.user.role === 'sender') {
      parcels = await getParcelsBySender(req.user._id);
    } else if (req.user.role === 'receiver') {
      parcels = await getParcelsByReceiver(req.user._id);
    } else {
      parcels = [];
    }
    sendResponse(res, 200, true, parcels, 'Parcels fetched');
  } catch (err) {
    next(err);
  }
}

export async function cancelParcelHandler(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parcel = await cancelParcel(req.params.id, req.user._id);
    sendResponse(res, 200, true, parcel, 'Parcel cancelled');
  } catch (err) {
    next(err);
  }
}

export async function confirmDeliveryHandler(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parcel = await confirmDelivery(req.params.id, req.user._id);
    sendResponse(res, 200, true, Parcel, 'Delivery confirmed');
  } catch (err) {
    next(err);
  }
}

export async function getAllParcelsHandler(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parcels = await getAllParcels();
    sendResponse(res, 200, true, parcels, 'All parcels fetched');
  } catch (err) {
    next(err);
  }
}

export async function adminUpdateParcelStatus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status, note, location } = req.body;
    const parcel = await updateParcelStatusAdmin(req.params.id, status, req.user._id, note, location);
    sendResponse(res, 200, true, parcel, 'Parcel status updated');
  } catch (err) {
    next(err);
  }
}

export async function getParcelStatusLog(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parcelId = req.params.id;
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) return res.status(404).json({ success: false, message: 'Parcel not found' });

    // Authorization check
    const userId = req.user._id.toString();
    const userRole = req.user.role;
    if (
      userRole === 'sender' && parcel.sender.toString() !== userId ||
      userRole === 'receiver' && parcel.receiver.toString() !== userId
    ) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    sendResponse(res, 200, true, parcel.statusLogs, 'Parcel status logs fetched');
  } catch (err) {
    next(err);
  }
}
