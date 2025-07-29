import { Request, Response, NextFunction } from 'express';

import { sendResponse } from '../../utils/sendResponse';
import { getAllUsers, updateUserById } from './service';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUsers();
    sendResponse(res, 200, true, users, 'Users fetched successfully');
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;
    const updatedUser = await updateUserById(userId, req.body);
    if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });
    sendResponse(res, 200, true, updatedUser, 'User updated');
  } catch (err) {
    next(err);
  }
}
