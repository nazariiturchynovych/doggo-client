import { z } from 'zod';

export const JobRequestSchema = z.object({
  dogId: z.string(),
  requiredAge: z.coerce.number(),
  isPersonalIdentifierRequired: z.any(),
  description: z
    .string(),
  paymentTo: z.coerce.number(),
  requiredScheduleResponse: z.object({
    from: z.string(),
    to: z.string(),
  }),
});