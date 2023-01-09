import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { StatusService } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateServiceRequestInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The title field cannot be empty.' })
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The description field cannot be empty.' })
  description: string;

  @Field(() => StatusService)
  @IsEnum(StatusService)
  @IsNotEmpty({ message: 'The status field cannot be empty.' })
  status: StatusService;

  @Field()
  cRequestId: string | null;

  @Field()
  aRequestId: string | null;
}

registerEnumType(StatusService, {
  name: 'StatusService',
});
