import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AuthInput {
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
}
