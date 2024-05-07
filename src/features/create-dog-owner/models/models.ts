import { z } from 'zod';

export const DogOwnerSchema = z.object({
  id: z.string(),
  address: z.string(),
  district: z.string(),
});
