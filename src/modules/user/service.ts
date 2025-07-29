import { User } from "./model";


export async function getAllUsers() {
  return User.find();
}

export async function updateUserById(userId: string, data: any) {
  return User.findByIdAndUpdate(userId, data, { new: true });
}

export async function blockUnblockUser(userId: string, block: boolean) {
  return User.findByIdAndUpdate(userId, { isBlocked: block }, { new: true });
}
