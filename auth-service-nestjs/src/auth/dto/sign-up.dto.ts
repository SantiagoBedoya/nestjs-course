import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(1)
  readonly firstName: string;

  @IsString()
  @MinLength(1)
  readonly lastName: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
