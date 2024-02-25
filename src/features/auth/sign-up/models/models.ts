import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.coerce.number(),
  phoneNumber: z.string(),
});