import path from 'path'
import { MikroORM } from '@mikro-orm/core'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { entityMap } from './entities'
import { envVars, dbConnectionOptions } from '~/env'

// Reference: https://github.com/driescroons/mikro-orm-graphql-example/blob/04093d1/src/orm.config.ts
export const config: Parameters<typeof MikroORM.init>[0] = {
  type: 'mysql',
  ...dbConnectionOptions,
  entities: Object.values(entityMap),
  debug: envVars.NODE_ENV === 'development', // https://mikro-orm.io/docs/debugging
  highlighter: new SqlHighlighter(), // https://mikro-orm.io/docs/debugging#highlighters
  migrations: {
    path: path.join(__dirname, 'migrations'),
    tableName: '__migrations',
  },
}

/**
 * For `package.json > mikro-orm > configPaths`
 * See https://mikro-orm.io/docs/installation/#setting-up-the-commandline-tool
 */
// eslint-disable-next-line import/no-default-export
export default config
