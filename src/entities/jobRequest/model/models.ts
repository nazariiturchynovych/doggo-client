import { DogOwner } from '@/entities/dogOwner/model/models.ts';

export type JobRequest = {
  id: string;
  requiredAge: number;
  isPersonalIdentifierRequired: boolean;
  requiredSchedule: { from: Date; to: Date };
  description: string;
  dogOwnerId: string;
  dogOwner: DogOwner;
  dogId: string;
  paymentTo: number;
  hasAcceptedJob: boolean;
};
