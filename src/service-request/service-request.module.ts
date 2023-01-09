import { Module } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestResolver } from './service-request.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ServiceRequestResolver, ServiceRequestService],
})
export class ServiceRequestModule {}
