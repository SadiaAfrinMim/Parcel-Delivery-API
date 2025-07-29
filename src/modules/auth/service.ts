import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import bcrypt from 'bcrypt';

export async function registerUser(data: any) {
  const { name, email, password, role } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');
  
  const user = new User({ name, email, password, role });
  await user.save();
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return { token, user };
}
