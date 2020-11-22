import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
  Body,
  JsonController,
  Params,
  QueryParams,
  Res,
} from 'routing-controllers'

import {
  Authorized,
  CurrentUser,
  generateJwt,
  JwtPayloadDto,
} from '~/modules/_shared/auth'
import {
  CreateControllerSpec,
  MountRoute,
} from '~/modules/_shared/controller-helpers'
import { orm } from '~/orm'

import {
  CheckUsernameResDto,
  LoginOrRegisterReqBodyDto,
  LoginOrRegisterResDto,
  UserEmailBioDto,
  UserIdDto,
  UsernameDto,
  UserProfileResDto,
} from './user.dto'
import { userApiRoutes } from './user.routes'
import { UserService } from './user.service'

@JsonController()
export class UserController
  implements CreateControllerSpec<typeof userApiRoutes> {
  private readonly userService: UserService
  constructor() {
    this.userService = new UserService(orm.em)
  }

  @MountRoute(userApiRoutes.checkUsername)
  async checkUsername(
    @QueryParams() { username }: UsernameDto,
  ): Promise<CheckUsernameResDto> {
    return {
      isAvailable: await this.userService.checkUsernameAvailability(username),
    }
  }

  @MountRoute(userApiRoutes.getProfile)
  async getProfile(@Params() { id }: UserIdDto): Promise<UserProfileResDto> {
    return this.userService.getProfile(id)
  }

  @MountRoute(userApiRoutes.register)
  async register(
    @Body() { username, password }: LoginOrRegisterReqBodyDto,
  ): Promise<LoginOrRegisterResDto> {
    const idAndUsername = await this.userService.register(username, password)
    return {
      ...idAndUsername,
      token: generateJwt(idAndUsername),
    }
  }

  @MountRoute(userApiRoutes.login)
  async login(
    @Body() { username, password }: LoginOrRegisterReqBodyDto,
  ): Promise<LoginOrRegisterResDto> {
    const idAndUsername = await this.userService.login(username, password)
    return {
      ...idAndUsername,
      token: generateJwt(idAndUsername),
    }
  }

  @Authorized()
  @MountRoute(userApiRoutes.updateProfile)
  async updateProfile(
    @Res() res: Response,
    @CurrentUser() { id }: JwtPayloadDto,
    @Body() reqBody: UserEmailBioDto,
  ): Promise<void> {
    await this.userService.updateProfile(id, reqBody)
    return res.status(StatusCodes.NO_CONTENT).end()
  }
}
