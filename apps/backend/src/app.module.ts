import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { VotersService } from './voters/voters.service';
import { VotersController } from './voters/voters.controller';
import { VotersModule } from './voters/voters.module';

@Module({
  imports: [UsersModule, AuthModule, VotersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    VotersService,
  ],
  controllers: [VotersController],
})
export class AppModule {}
