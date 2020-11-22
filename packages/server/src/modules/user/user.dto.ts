import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsJWT,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { decorate as $, Mixin } from 'ts-mixer'

export class UserIdDto {
  @$(IsInt())
  @$(IsPositive())
  id!: number
}

export const USERNAME_MIN_LEN = 3
export const USERNAME_MAX_LEN = 15
export class UsernameDto {
  @$(IsString())
  @$(IsNotEmpty())
  @$(MinLength(USERNAME_MIN_LEN))
  @$(MaxLength(USERNAME_MAX_LEN))
  username!: string
}

export const USER_PWD_MIN_LEN = 6
export const USER_PWD_MAX_LEN = 18
export class UserPasswordDto {
  @$(IsString())
  @$(IsNotEmpty())
  @$(MinLength(USER_PWD_MIN_LEN))
  @$(MaxLength(USER_PWD_MAX_LEN))
  password!: string
}

export class UserEmailBioDto {
  @$(IsOptional())
  @$(IsEmail())
  email!: string | null

  @$(IsOptional())
  @$(IsString())
  bio!: string | null
}

export class CheckUsernameResDto {
  @$(IsBoolean())
  isAvailable!: boolean
}

export class JwtTokenDto {
  @$(IsJWT())
  token!: string
}

export class JwtPayloadDto extends Mixin(UserIdDto, UsernameDto) {}

export class LoginOrRegisterReqBodyDto extends Mixin(
  UsernameDto,
  UserPasswordDto,
) {}

export class LoginOrRegisterResDto extends Mixin(
  UserIdDto,
  UsernameDto,
  JwtTokenDto,
) {}

export class UserProfileResDto extends Mixin(
  UserIdDto,
  UsernameDto,
  UserEmailBioDto,
) {}
