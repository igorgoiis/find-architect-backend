import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role, User } from '@prisma/client';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { User as UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserModel])
  async users(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  async userById(@Args('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  async userByEmail(@Args('email') email: string): Promise<User> {
    return await this.userService.findUserByEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserModel])
  async userByRole(@Args('role') role: Role): Promise<User[]> {
    return await this.userService.findUserByRole(role);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.userService.createUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserModel)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }
}
