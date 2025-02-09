import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const result = CreateUserSchema.safeParse(body);
    if (!result.success) {
      return { error: result.error.format() };
    }

    return await this.usersService.create(result.data);
  }
}
