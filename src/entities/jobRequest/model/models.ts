import { Guid } from 'typescript-guid';

export type JobRequest = {
  id: Guid;
  requiredAge: number;
  isPersonalIdentifierRequired: boolean;
  requiredSchedule: { from: Date; to: Date };
  description: string;
  dogOwnerId: Guid;
  dogId: Guid;
  paymentTo: number;
  hasAcceptedJob: boolean;
};
