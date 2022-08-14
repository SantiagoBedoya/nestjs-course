import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
