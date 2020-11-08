import path from 'path'
import env from 'env-var'
import dotenvSafe from 'dotenv-safe'
import { ConnectionOptions } from '@mikro-orm/core'

const NODE_ENV = env
  .get('NODE_ENV')
  .required()
  .asEnum(['development', 'test', 'production'])

dotenvSafe.config({
  allowEmptyValues: true,
  example: path.join(__dirname, '.env.example'),
  path: path.join(__dirname, `.env.${NODE_ENV}`), // Will not throw even if the file does not exist
})

/**
 * Please don't access `process.env` directly without type coercion & validation.
 * By default, environment variables are loaded as string type, which means for `VAR_NAME=false`,
 * `process.env.VAR_NAME` is actually `"false"` (string type, a truthy value!) instead of `false` (boolean type)
 */
export const envVars = {
  NODE_ENV,
  PORT: env.get('PORT').required().asPortNumber(),
}

export const dbConnectionOptions: ConnectionOptions = {
  dbName: env.get('MYSQL_DATABASE').required().asString(),
  host: env.get('MYSQL_HOST').required().asString(),
  port: env.get('MYSQL_PORT').required().asPortNumber(),
  user: env.get('MYSQL_USERNAME').required().asString(),
  password: env.get('MYSQL_PASSWORD').required().asString(),
  charset: 'utf8mb4', // See https://github.com/mikro-orm/mikro-orm/issues/513
}
