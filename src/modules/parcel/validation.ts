import { z } from 'zod';

export const createParcelSchema = z.object({
  receiverId: z.string().length(24), // mongoose ObjectId length
  parcelType: z.string().min(1),
  weight: z.number().positive(),
  addressFrom: z.string().min(1),
  addressTo: z.string().min(1),
});

export const updateParcelStatusSchema = z.object({
  status: z.enum(['Requested', 'Approved', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled']),
  note: z.string().optional(),
  location: z.string().optional(),
});
