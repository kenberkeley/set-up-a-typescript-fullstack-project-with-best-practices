import { Entity, Property, Unique } from '@mikro-orm/core'

import { BaseEntity } from '~/orm/entities/BaseEntity'

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  username!: string

  @Property({ lazy: true })
  hashedPassword!: string

  @Property({
    columnType: 'varchar(255)',
    nullable: true,
    lazy: true,
  })
  @Unique()
  email: string | null = null

  @Property({
    columnType: 'text',
    nullable: true,
    lazy: true,
  })
  bio: string | null = null

  constructor(username: string, hashedPassword: string) {
    super()
    this.username = username
    this.hashedPassword = hashedPassword
  }
}
