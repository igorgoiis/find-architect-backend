import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

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
      throw new BadRequestException('This email already exists.');
    }

    return await this.prisma.user.create({
      data,
    });
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    console.log(user);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = this.prisma.user.update({ where: { id }, data: { ...data } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });

      return true;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          console.log('User not found.');
        }
      }
      throw new NotFoundException('User not found.');
    }
  }
}
