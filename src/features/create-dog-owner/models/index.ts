import { z } from 'zod';

export const CreateDogOwnerSchema = z.object({
  address: z.string(),
  district: z.string(),
});
