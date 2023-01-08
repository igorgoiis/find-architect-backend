import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Architect } from '@prisma/client';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateArchitectInput } from './dtos/create-architect.input';
import { UpdateArchitectInput } from './dtos/update-architect.input';
import { Architect as ArchitectModel } from './models/architect.model';
import { ArchitectService } from './architect.service';

@Resolver('Architect')
export class ArchitectResolver {
  constructor(private architectService: ArchitectService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [ArchitectModel])
  async architects(): Promise<Architect[]> {
    return await this.architectService.findAllArchitects();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ArchitectModel)
  async architectById(@Args('id') id: string): Promise<Architect> {
    return await this.architectService.findArchitectById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ArchitectModel)
  async architectByEmail(@Args('email') email: string): Promise<Architect> {
    return await this.architectService.findArchitectByEmail(email);
  }

  @Mutation(() => ArchitectModel)
  async createArchitect(
    @Args('data') data: CreateArchitectInput,
  ): Promise<Architect> {
    return await this.architectService.createArchitect(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ArchitectModel)
  async updateArchitect(
    @Args('id') id: string,
    @Args('data') data: UpdateArchitectInput,
  ): Promise<Architect> {
    return await this.architectService.updateArchitect(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteArchitect(@Args('id') id: string): Promise<boolean> {
    return await this.architectService.deleteArchitect(id);
  }
}
