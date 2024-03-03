import { z } from 'zod';

export const DogSchema = z.object({
  dogOwnerId: z.string(),
  name: z.string(),
  age: z.coerce.number(),
  weight: z.coerce.number(),
  description: z.string(),
});