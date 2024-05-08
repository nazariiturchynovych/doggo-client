import { z } from 'zod';

export const UpdateDogOwnerSchema = z.object({
  id: z.string(),
  address: z.string(),
  district: z.string(),
});
