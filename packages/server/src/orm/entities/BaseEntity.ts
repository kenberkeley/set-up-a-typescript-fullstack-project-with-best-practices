// Doc: https://mikro-orm.io/docs/defining-entities#using-baseentity
import { PrimaryKey, Property } from '@mikro-orm/core'

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number

  @Property({ lazy: true })
  createdAt: Date = new Date()

  @Property({
    onUpdate: () => new Date(),
    lazy: true,
  })
  updatedAt: Date = new Date()
}
