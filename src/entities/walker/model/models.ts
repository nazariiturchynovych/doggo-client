import { Guid } from 'typescript-guid';

export type Walker = {
  id: Guid | null,
  userId: Guid | null,
  skills: string,
  about: string,
};
