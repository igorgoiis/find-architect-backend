import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { StatusService } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateServiceRequestInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The title field cannot be empty.' })
  @IsOptional()
  title?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The description field cannot be empty.' })
  @IsOptional()
  description?: string;

  @Field(() => StatusService)
  @IsEnum(StatusService)
  @IsNotEmpty({ message: 'The status field cannot be empty.' })
  @IsOptional()
  status?: StatusService;
}

registerEnumType(StatusService, {
  name: 'StatusService',
});
