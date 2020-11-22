import { User } from '~/modules/user/user.entity/User'

import { BaseEntity } from './BaseEntity'

export const entities = [
  BaseEntity, // Must included, otherwise [MetadataError: Entity 'XXX' extends unknown base entity 'BaseEntity', please make sure to provide it in 'entities' array when initializing the ORM]
  User,
]
