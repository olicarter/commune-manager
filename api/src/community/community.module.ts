import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}
