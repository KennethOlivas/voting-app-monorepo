import { Injectable } from '@nestjs/common';
import { CreateVoterDto } from '@voting-app/schemas';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { voters } from 'src/db/schema';

@Injectable()
export class VotersService {
  async findAll() {
    return await db.select().from(voters);
  }

  async create(data: CreateVoterDto) {
    await db.insert(voters).values({ ...data });
    return { message: 'Voter created successfully', voter: data };
  }

  async findOne(id: string) {
    return await db.query.voters.findFirst({
      where: eq(voters.id, id),
    });
  }

  async update(id: string, data: CreateVoterDto) {
    await db
      .update(voters)
      .set({ ...data })
      .where(eq(voters.id, id));

    return { message: 'Voter updated successfully', voter: data };
  }
}
