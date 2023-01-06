import { Field, InputType } from '@nestjs/graphql';
import { Gender, Role } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsEnum,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'The email field cannot be empty.' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  name: string;

  @Field()
  @IsPhoneNumber('BR')
  @IsNotEmpty({ message: 'The phone field cannot be empty.' })
  phone: string;

  @Field(() => Gender)
  @IsEnum(Gender)
  @IsNotEmpty({ message: 'The gender field cannot be empty.' })
  gender: Gender;

  @Field()
  @IsDate()
  @IsNotEmpty({ message: 'The birdDate field cannot be empty.' })
  birdDate: Date;

  @Field(() => Role)
  @IsEnum(Role)
  @IsNotEmpty({ message: 'The role field cannot be empty.' })
  role: Role;
}
