import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new Error('This email already exists.');
    }

    return await this.prisma.user.create({
      data,
    });
  }
}
