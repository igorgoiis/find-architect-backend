import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateArchitectInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @IsOptional()
  bio?: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password must contain at least 6 characters.' })
  @MaxLength(20, {
    message: 'The password must contain a maximum of 20 characters.',
  })
  @IsNotEmpty({ message: 'The password is required,' })
  @IsOptional()
  password?: string;

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
}
