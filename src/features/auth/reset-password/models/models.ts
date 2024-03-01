import { z } from 'zod';

export const ConfirmForgotPasswordSchema = z
  .object({
    email: z.string(),
    token: z.string(),
    newPassword: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    confirmPassword: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });