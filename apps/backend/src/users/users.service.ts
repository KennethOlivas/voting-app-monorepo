import { Injectable } from '@nestjs/common';

import { db } from 'src/db';
import { users } from 'src/db/schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async findAll() {
    return await db.select().from(users);
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      createdAt: new Date(),
    });

    return { message: 'User created successfully' };
  }

  async findByEmail(email: string) {
    return await db.query.users.findFirst({
      where: (users) => eq(users.email, email),
    });
  }
}
