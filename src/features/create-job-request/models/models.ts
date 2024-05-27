import { z } from 'zod';

export const JobRequestSchema = z.object({
  dogId: z.string(),
  requiredAge: z.coerce.number().min(12),
  isPersonalIdentifierRequired: z.any(),
  description: z.string(),
  paymentTo: z.coerce.number().min(20),
  requiredScheduleResponse: z.object({
    from: z.string(),
    to: z.string(),
  }),
});
