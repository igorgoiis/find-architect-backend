import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class AuthModel {
  @Field(() => User)
  user: User;

  token: string;
}
