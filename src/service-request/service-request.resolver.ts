import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequest } from './models/service-request.model';
import { CreateServiceRequestInput } from './dto/create-service-request.input';
import { UpdateServiceRequestInput } from './dto/update-service-request.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => ServiceRequest)
export class ServiceRequestResolver {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ServiceRequest)
  async createServiceRequest(
    @Args('data') data: CreateServiceRequestInput,
  ): Promise<ServiceRequest> {
    return await this.serviceRequestService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [ServiceRequest])
  async findAllServiceRequest(
    @Args('id') id: string,
  ): Promise<ServiceRequest[]> {
    return await this.serviceRequestService.findAll(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ServiceRequest)
  async findOneServiceRequest(@Args('id') id: string): Promise<ServiceRequest> {
    return await this.serviceRequestService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ServiceRequest)
  async updateServiceRequest(
    @Args('id') id: string,
    @Args('data')
    data: UpdateServiceRequestInput,
  ): Promise<ServiceRequest> {
    return await this.serviceRequestService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async removeServiceRequest(@Args('id') id: string): Promise<boolean> {
    return await this.serviceRequestService.remove(id);
  }
}
