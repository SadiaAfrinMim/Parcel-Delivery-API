export const Roles = {
  ADMIN: 'admin',
  SENDER: 'sender',
  RECEIVER: 'receiver',
} as const;

export const ParcelStatus = {
  REQUESTED: 'Requested',
  APPROVED: 'Approved',
  DISPATCHED: 'Dispatched',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
} as const;
