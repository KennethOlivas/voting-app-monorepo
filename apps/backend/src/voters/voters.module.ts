import { Module } from '@nestjs/common';
import { VotersService } from './voters.service';
import { VotersController } from './voters.controller';

@Module({
  providers: [VotersService],
  controllers: [VotersController],
})
export class VotersModule {}
