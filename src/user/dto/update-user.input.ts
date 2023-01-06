import { Field, InputType } from '@nestjs/graphql';
import { Gender, Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  @IsOptional()
  name?: string;

  @Field()
  @IsPhoneNumber('BR')
  @IsNotEmpty({ message: 'The phone field cannot be empty.' })
  @IsOptional()
  phone?: string;

  @Field(() => Gender)
  @IsEnum(Gender)
  @IsNotEmpty({ message: 'The gender field cannot be empty.' })
  @IsOptional()
  gender?: Gender;

  @Field()
  @IsDate()
  @IsNotEmpty({ message: 'The birdDate field cannot be empty.' })
  @IsOptional()
  birdDate?: Date;

  @Field(() => Role)
  @IsEnum(Role)
  @IsNotEmpty({ message: 'The role field cannot be empty.' })
  @IsOptional()
  role?: Role;
}
