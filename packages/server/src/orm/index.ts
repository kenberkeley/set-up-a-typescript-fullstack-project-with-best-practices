import { MikroORM, RequestContext } from '@mikro-orm/core'
import { Express } from 'express'

import { config } from './config'

export let orm: MikroORM

// Reference: https://github.com/mikro-orm/express-ts-example-app/blob/566883e/app/server.ts
export async function initOrm(app: Express): Promise<void> {
  orm = await MikroORM.init(config)

  // https://mikro-orm.io/docs/installation/#request-context
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
  })
}
