import { Request, Response, NextFunction } from 'express';

import { sendResponse } from '../../utils/sendResponse';
import { loginSchema, registerSchema } from './validation';
import { loginUser, registerUser } from './service';


export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = registerSchema.parse(req.body);
    const user = await registerUser(validated);
    sendResponse(res, 201, true, user, 'User registered successfully');
  } catch (err: any) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = loginSchema.parse(req.body);
    const data = await loginUser(validated.email, validated.password);
    sendResponse(res, 200, true, data, 'Login successful');
  } catch (err: any) {
    next(err);
  }
}
