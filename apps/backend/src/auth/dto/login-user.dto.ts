import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;
