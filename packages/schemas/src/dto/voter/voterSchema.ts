import z from 'zod';

const voterIdRegex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;

export const VoterSchema = z.object({
  id: z.string(),
  firstName: z.string({
    required_error: 'First name is required',
  }).min(2, "First name must be at least 2 characters"),
  middleName: z.string().nullable().optional(),
  lastName: z.string({
    required_error: 'Last name is required'
  }).min(2, "Last name must be at least 2 characters"),
  email: z.string().nullable().optional(),
  voterId: z.string()
    .regex(voterIdRegex, "Voter ID must be in the format NNN-NNNNNN-NNNNX")
    .min(16, "Voter ID must be exactly 17 characters")
    .max(16, "Voter ID must be exactly 17 characters"),
  dateOfBirth: z.string({
    required_error: 'Date of birth is required'
  }).min(10, "Date of birth must be in the format YYYY-MM-DD"),
  gender: z.string({
    required_error: 'Gender is required'
  }),
  city: z.string({
    required_error: 'City is required'
  }).min(2, "City must be at least 2 characters"),
  createdAt: z.string(),
});

export const CreateVoterSchema = VoterSchema.omit({
  id: true,
  createdAt: true,
})

export type CreateVoterDto = z.infer<typeof CreateVoterSchema>;

export type VoterDto = z.infer<typeof VoterSchema>;
