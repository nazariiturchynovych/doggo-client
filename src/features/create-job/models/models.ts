import { z } from 'zod';

export const JobSchema = z.object({
  jobRequestId: z.string(),
  comment: z.string(),
});
