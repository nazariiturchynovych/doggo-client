export type JobRequest = {
  id: string;
  requiredAge: number;
  isPersonalIdentifierRequired: boolean;
  requiredSchedule: { from: Date; to: Date };
  description: string;
  dogOwnerId: string;
  dogId: string;
  paymentTo: number;
  hasAcceptedJob: boolean;
};
