import { Guid } from 'typescript-guid';

export type User = {
  id: Guid;
  firstName: string;
  lastName: string;
  age: 0;
  email: string;
  dogOwnerId: Guid | null;
  walkerId: Guid | null;
};