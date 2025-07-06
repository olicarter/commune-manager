import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Community } from './community.entity';
import { CreateCommunityDto } from './dto/create-community.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  create(dto: CreateCommunityDto): Promise<Community> {
    const community = this.communityRepository.create(dto);
    return this.communityRepository.save(community);
  }

  findOne(id: number): Promise<Community | null> {
    return this.communityRepository.findOneBy({ id });
  }
}
