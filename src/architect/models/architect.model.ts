import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';

@ObjectType()
export class Architect {
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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

registerEnumType(Gender, {
  name: 'Gender',
});
