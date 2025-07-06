import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { Community } from './community.entity';

@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  create(@Body() dto: CreateCommunityDto): Promise<Community> {
    return this.communityService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Community | null> {
    return this.communityService.findOne(id);
  }
}
