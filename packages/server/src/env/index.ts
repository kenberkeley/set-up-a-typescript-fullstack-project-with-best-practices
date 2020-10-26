import path from 'path'
import env from 'env-var' // Doc: https://github.com/evanshortiss/env-var
import dotenvSafe from 'dotenv-safe' // Doc: https://github.com/rolodato/dotenv-safe

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
 * By default, environment variables are loaded as string type, which means for `VAR_NAME=false`
 * `process.env.VAR_NAME` is actually `"false"` (string type, a truthy value!) instead of `false` (boolean type)
 */
export const envVars = {
  NODE_ENV,
  PORT: env.get('PORT').required().asPortNumber(),
}
