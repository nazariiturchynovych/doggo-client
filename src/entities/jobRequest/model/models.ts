import { Guid } from 'typescript-guid';

export type JobRequest = {
  id: Guid,
  requiredAge: number,
  isPersonalIdentifierRequired: boolean,
  requiredSchedule: number,
  description: string,
  dogOwnerId: Guid,
  paymentTo: number,
  hasAcceptedJob: boolean
};
