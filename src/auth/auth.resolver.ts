import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dtos/auth.input';
import { AuthModel } from './models/auth.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthModel)
  public async login(@Args('data') data: AuthInput): Promise<AuthModel> {
    const response = await this.authService.validateArchitect(data);
    return {
      architect: response.architect,
      token: response.token,
    };
  }
}
