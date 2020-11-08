/**
 * Required by:
 * - https://github.com/typestack/routing-controllers/blob/8d11d4a/README.md#installation
 * - https://github.com/typestack/class-transformer/blob/f96445c/README.md#installation
 * - https://mikro-orm.io/docs/metadata-providers#reflectmetadataprovider
 */
import 'reflect-metadata'

import { createExpressServer } from 'routing-controllers'
import { controllers } from './modules'
import { envVars } from './env'
import { initOrm } from './orm'

export const app = createExpressServer({
  classTransformer: true, // Enable `class-transform` + `class-validation`
  validation: {
    // Doc: https://github.com/typestack/routing-controllers/blob/8d11d4a/README.md#auto-validating-action-params
    // Options doc: https://github.com/typestack/class-validator/blob/f253325/README.md#passing-options
    whitelist: true, // Required when `forbidNonWhitelisted` is `true`
    forbidNonWhitelisted: true, // Forbid unknown incoming fields
    forbidUnknownValues: true, // Forbid unknown incoming values
    validationError: {
      // Less verbose error messages
      target: false,
      value: false,
    },
  },
  controllers,
})

initOrm(app)

if (require.main === module) {
  app.listen(envVars.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${envVars.PORT}`)
  })
} // else: for testing, etc
