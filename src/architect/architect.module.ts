import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ArchitectResolver } from './architect.resolver';
import { ArchitectService } from './architect.service';

@Module({
  imports: [DatabaseModule],
  providers: [ArchitectResolver, ArchitectService],
})
export class ArchitectModule {}
