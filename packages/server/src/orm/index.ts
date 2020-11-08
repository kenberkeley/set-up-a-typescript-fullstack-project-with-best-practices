import {
  MikroORM,
  EntityManager,
  EntityRepository,
  RequestContext,
} from '@mikro-orm/core'
import { Express } from 'express'
import { config } from './config'
import { entityMap } from './entities'

type EntityMap = typeof entityMap
export const DI = {} as {
  orm: MikroORM
  em: EntityManager
  repo: {
    [K in keyof EntityMap]: EntityRepository<EntityMap[K]>
  }
}

// Reference: https://github.com/mikro-orm/express-ts-example-app/blob/566883e/app/server.ts
export async function initOrm(app: Express): Promise<void> {
  DI.orm = await MikroORM.init(config)
  DI.em = DI.orm.em

  Object.entries(entityMap).forEach(([entityName, entity]) => {
    DI.repo = {
      ...DI.repo,
      [entityName]: DI.em.getRepository(
        // TODO: FIX_ME
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        entity,
      ),
    }
  })

  // https://mikro-orm.io/docs/installation/#request-context
  app.use((req, res, next) => {
    RequestContext.create(DI.em, next)
  })
}
