import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequest } from './models/service-request.model';
import { CreateServiceRequestInput } from './dto/create-service-request.input';
import { UpdateServiceRequestInput } from './dto/update-service-request.input';

@Resolver(() => ServiceRequest)
export class ServiceRequestResolver {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Mutation(() => ServiceRequest)
  async createServiceRequest(
    @Args('data') data: CreateServiceRequestInput,
  ): Promise<ServiceRequest> {
    return await this.serviceRequestService.create(data);
  }

  @Query(() => [ServiceRequest])
  async findAllServiceRequest(): Promise<ServiceRequest[]> {
    return await this.serviceRequestService.findAll();
  }

  @Query(() => ServiceRequest)
  async findOneServiceRequest(@Args('id') id: string): Promise<ServiceRequest> {
    return await this.serviceRequestService.findOne(id);
  }

  @Mutation(() => ServiceRequest)
  async updateServiceRequest(
    @Args('id') id: string,
    @Args('data')
    data: UpdateServiceRequestInput,
  ): Promise<ServiceRequest> {
    return await this.serviceRequestService.update(id, data);
  }

  @Mutation(() => ServiceRequest)
  async removeServiceRequest(@Args('id') id: string): Promise<boolean> {
    return await this.serviceRequestService.remove(id);
  }
}
