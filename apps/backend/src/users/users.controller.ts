import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/')
  findAll(): string {
    return 'All users';
  }
}
