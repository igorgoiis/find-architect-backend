import { Field, ObjectType } from '@nestjs/graphql';
import { Architect } from 'src/architect/models/architect.model';

@ObjectType()
export class AuthModel {
  @Field(() => Architect)
  architect: Architect;

  token: string;
}
