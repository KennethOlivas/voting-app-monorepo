import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
  role: z.enum(['voter', 'admin']).default('voter'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
