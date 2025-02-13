import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard, Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() { email, password }: LoginUserDto) {
    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: any }) {
    return req.user as unknown;
  }
}
