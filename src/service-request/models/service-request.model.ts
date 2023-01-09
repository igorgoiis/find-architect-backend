import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { StatusService } from '@prisma/client';

@ObjectType()
export class ServiceRequest {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => StatusService)
  status: StatusService;

  @Field()
  cRequestId: string | null;

  @Field()
  aRequestId: string | null;
}

registerEnumType(StatusService, {
  name: 'StatusService',
});
