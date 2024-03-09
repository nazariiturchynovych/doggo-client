import { Guid } from 'typescript-guid';
import { User } from '@/entities/user';

export type DogOwner = {
  id: Guid | null;
  userId: Guid | null;
  user: User;
  address: string;
  district: string;
};
