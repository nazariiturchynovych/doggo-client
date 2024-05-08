import { z } from 'zod';

export const UpdateWalkerSchema = z.object({
  id: z.string(),
  skills: z
    .string()
    .min(5, { message: 'Minimum 5 characters.' })
    .max(2200, { message: 'Maximum 2,200 caracters' }),
  about: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(1000, { message: 'Maximum 1000 characters.' }),
});
