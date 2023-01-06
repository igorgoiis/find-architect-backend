import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { User as UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel])
  async users(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Query(() => UserModel)
  async userById(@Args('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.userService.createUser(data);
  }
}
