import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender, Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  bio: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  birdDate: Date;

  @Field(() => Role)
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

registerEnumType(Gender, {
  name: 'Gender',
});

registerEnumType(Role, {
  name: 'Role',
});
