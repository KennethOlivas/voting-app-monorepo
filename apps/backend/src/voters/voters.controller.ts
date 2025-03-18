import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VotersService } from './voters.service';
import { CreateVoterDto } from '@voting-app/schemas';
import { voters } from 'src/db/schema';

@Controller('voters')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

  @Get()
  async getVoters(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
  ) {
    return await this.votersService.findAll(
      parseInt(page, 10),
      parseInt(perPage, 10),
      search,
      sortBy as keyof typeof voters,
      sortDirection as 'ASC' | 'DESC',
    );
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
