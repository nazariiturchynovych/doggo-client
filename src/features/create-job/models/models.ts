import { z } from 'zod';

export const JobSchema = z.object({
  jobRequestId: z.string(),
  comments: z.string(),
  payment: z.coerce.number()
});