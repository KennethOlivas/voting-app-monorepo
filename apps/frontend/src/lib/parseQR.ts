import { CreateVoterDto, CreateVoterSchema } from "@voting-app/schemas";

function parseID(input: string): CreateVoterDto {
  const parts = input.split('<');
  const result: CreateVoterDto = {
    voterId: parts[1] || '',
    lastName: parts[2] || '',
    firstName: parts[4] || '',
    middleName: parts[5] || '',
    city: parts[6] || '',
    dateOfBirth: parts[7] || '',
    gender: parts[8] || '',
  };

  // Validate the result using CreateUserSchema
  const validation = CreateVoterSchema.safeParse(result);
  if (!validation.success) {
    throw new Error("Invalid data");
  }

  return result;
}

export { parseID };
