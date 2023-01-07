import { Field, InputType } from '@nestjs/graphql';
import { Gender, Role } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsEnum,
  IsStrongPassword,
  isString,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'The email field cannot be empty.' })
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password must contain at least 6 characters.' })
  @MaxLength(20, {
    message: 'The password must contain a maximum of 20 characters.',
  })
  @IsNotEmpty({ message: 'The password is required,' })
  password: string;

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
