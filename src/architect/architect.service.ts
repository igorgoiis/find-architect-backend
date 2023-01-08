import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Architect } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateArchitectInput } from './dtos/create-architect.input';
import { UpdateArchitectInput } from './dtos/update-architect.input';

@Injectable()
export class ArchitectService {
  constructor(private prisma: PrismaService) {}

  async findAllArchitects(): Promise<Architect[]> {
    return this.prisma.architect.findMany();
  }

  async createArchitect(data: CreateArchitectInput): Promise<Architect> {
    const emailExists = await this.prisma.architect.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('This email already exists.');
    }

    return await this.prisma.architect.create({
      data,
    });
  }

  async findArchitectById(id: string): Promise<Architect> {
    const architect = await this.prisma.architect.findUnique({
      where: {
        id,
      },
    });

    if (!architect) {
      throw new NotFoundException('Architect not found.');
    }

    return architect;
  }

  async findArchitectByEmail(email: string): Promise<Architect> {
    const architect = await this.prisma.architect.findUnique({
      where: {
        email,
      },
    });

    if (!architect) {
      throw new NotFoundException('Architect not found.');
    }

    return architect;
  }

  async updateArchitect(
    id: string,
    data: UpdateArchitectInput,
  ): Promise<Architect> {
    const architect = await this.findArchitectById(id);

    if (!architect) {
      throw new NotFoundException('Architect not found.');
    }

    const newArchitect = await this.prisma.architect.update({
      where: { id },
      data: { ...data },
    });

    return newArchitect;
  }

  async deleteArchitect(id: string): Promise<boolean> {
    const deletedArchitect = await this.prisma.architect.delete({
      where: { id },
    });

    if (deletedArchitect) {
      return true;
    }
    return false;
  }
}
