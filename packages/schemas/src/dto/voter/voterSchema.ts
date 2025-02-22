import z from 'zod';

export const VoterSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string(),
  email: z.string(),
  voterId: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  city: z.string(),
  createdAt: z.string(),
  bornIn: z.string(),
});

export const CreateVoterSchema = VoterSchema.omit({
  id: true,
  createdAt: true,
})

export type CreateVoterDto = z.infer<typeof CreateVoterSchema>;

export type VoterDto = z.infer<typeof VoterSchema>;
