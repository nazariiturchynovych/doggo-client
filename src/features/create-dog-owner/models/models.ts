import { z } from 'zod';

export const DogOwnerSchema = z.object({
  address: z
    .string(),
  district: z
    .string(),
});