import { Injectable } from '@nestjs/common';

import { db } from 'src/db';
import { users } from 'src/db/schema';
import { CreateUserDto } from '@voting-app/schemas';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async findAll() {
    return await db.select().from(users);
  }

  async create({ email, name, password, role }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return { message: 'User created successfully' };
  }

  async findByEmail(email: string) {
    return await db.query.users.findFirst({
      where: (users) => eq(users.email, email),
    });
  }
}
