import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core'
import bcryptjs from 'bcryptjs'
import { pick } from 'lodash'
import { NotFoundError } from 'routing-controllers'

import {
  ConflictError,
  UnprocessableEntityError,
} from '~/modules/_shared/http-errors'

import { User } from './user.entity/User'

export class UserService {
  private readonly userRepo: EntityRepository<User>
  constructor(em: EntityManager) {
    this.userRepo = em.getRepository(User)
  }

  async checkUsernameAvailability(username: string): Promise<boolean> {
    const existingUser = await this.userRepo.findOne({ username })
    const isAvailable = !existingUser
    return isAvailable
  }

  async getProfile(
    userId: number,
  ): Promise<Pick<User, 'id' | 'username' | 'email' | 'bio'>> {
    const matchedUser = await this.userRepo.findOne(userId, ['email', 'bio'])
    if (!matchedUser) {
      throw new NotFoundError('User does not exist')
    }
    return pick(matchedUser, ['id', 'username', 'email', 'bio'])
  }

  async register(
    username: string,
    password: string,
  ): Promise<Pick<User, 'id' | 'username'>> {
    const isUsernameAvailable = await this.checkUsernameAvailability(username)
    if (!isUsernameAvailable) {
      throw new ConflictError('Username already exists')
    }
    const hashedPassword = bcryptjs.hashSync(password)
    const newUser = new User(username, hashedPassword)
    await this.userRepo.persistAndFlush(newUser)

    return pick(newUser, ['id', 'username'])
  }

  async login(
    username: string,
    password: string,
  ): Promise<Pick<User, 'id' | 'username'>> {
    const matchedUser = await this.userRepo.findOne({ username }, [
      'hashedPassword',
    ])
    if (!matchedUser) {
      throw new NotFoundError('User does not exist')
    }
    if (!bcryptjs.compareSync(password, matchedUser.hashedPassword)) {
      throw new UnprocessableEntityError('Password mismatched')
    }
    return pick(matchedUser, ['id', 'username'])
  }

  async updateProfile(
    userId: number,
    updateBody: Pick<User, 'email' | 'bio'>,
  ): Promise<void> {
    const matchedUser = await this.userRepo.findOne(userId)
    wrap(matchedUser).assign(updateBody)
    await this.userRepo.flush()
  }
}
