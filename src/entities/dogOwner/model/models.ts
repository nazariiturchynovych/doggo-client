import { Guid } from 'typescript-guid';

export type DogOwner = {
  id: Guid | null,
  userId: Guid | null,
  address: string,
  district: string,
  dogIds: Guid[],
  jobRequestIds: Guid[],
  jobIds: Guid[]
};
