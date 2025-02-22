import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VotersService } from './voters.service';
import { CreateVoterDto } from '@voting-app/schemas';

@Controller('voters')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

  @Get()
  async getVoters() {
    return await this.votersService.findAll();
  }

  @Post()
  async createVoter(@Body() body: CreateVoterDto) {
    return await this.votersService.create(body);
  }

  @Get(':id')
  async getVoter(@Param('id') id: string) {
    return await this.votersService.findOne(id);
  }

  @Put(':id')
  async updateVoter(@Param('id') id: string, @Body() body: CreateVoterDto) {
    return await this.votersService.update(id, body);
  }
}
