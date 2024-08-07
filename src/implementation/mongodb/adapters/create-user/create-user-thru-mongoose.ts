import type { CreateUserRepository } from '@/repositories/create-user-repository';
import type { User } from '@/entities/user';
import { UserModel } from '@/impl-mongoose/models/user-model';

export const createUserThruMongoose: CreateUserRepository = async (
  newUserData: User,
) => {
  const newDocument = new UserModel(newUserData);
  await newDocument.save();
  return newUserData;
};
