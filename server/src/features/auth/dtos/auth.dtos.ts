import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { minRequiredPasswordLength } from '../../../common/constants';
import { Match } from '../../../common/decorators/validators/match.decorator';

export class LoginDto {
  @IsEmail(
    {},
    { message: (args) => `${args.value} is not a valid email address.` },
  )
  @IsNotEmpty({
    message: 'The email field is missing.',
  })
  readonly email: string;
  @IsNotEmpty({
    message: 'The password field is missing.',
  })
  @MinLength(minRequiredPasswordLength)
  readonly password: string;
}

export class SignupDto extends LoginDto {
  @Match(LoginDto, (dto) => dto.password, {
    message: 'the passwords entered do not match.',
  })
  readonly passwordConfirm: string;
  @IsString()
  @IsOptional()
  readonly firstName: string;
  @IsString()
  @IsOptional()
  readonly lastName: string;
}
