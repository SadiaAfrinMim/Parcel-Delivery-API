import { Response } from 'express';

export function sendResponse<T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data: T | null = null,
  message: string = ''
) {
  res.status(statusCode).json({ success, message, data });
}
