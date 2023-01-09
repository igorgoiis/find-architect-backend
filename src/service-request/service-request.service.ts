import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateServiceRequestInput } from './dto/create-service-request.input';
import { UpdateServiceRequestInput } from './dto/update-service-request.input';
import { ServiceRequest } from './models/service-request.model';

@Injectable()
export class ServiceRequestService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateServiceRequestInput): Promise<ServiceRequest> {
    return await this.prismaService.serviceRequest.create({ data });
  }

  async findAll(): Promise<ServiceRequest[]> {
    return await this.prismaService.serviceRequest.findMany();
  }

  async findOne(id: string): Promise<ServiceRequest> {
    const service = await this.prismaService.serviceRequest.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found.');
    }

    return service;
  }

  async update(
    id: string,
    data: UpdateServiceRequestInput,
  ): Promise<ServiceRequest> {
    const service = await this.prismaService.serviceRequest.update({
      where: { id },
      data,
    });

    if (!service) {
      throw new NotFoundException('Service not found.');
    }

    return service;
  }

  async remove(id: string): Promise<boolean> {
    const service = await this.prismaService.serviceRequest.delete({
      where: { id },
    });

    if (service) return true;

    return false;
  }
}
