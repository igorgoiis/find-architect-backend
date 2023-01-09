import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRequestResolver } from './service-request.resolver';
import { ServiceRequestService } from './service-request.service';

describe('ServiceRequestResolver', () => {
  let resolver: ServiceRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRequestResolver, ServiceRequestService],
    }).compile();

    resolver = module.get<ServiceRequestResolver>(ServiceRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
