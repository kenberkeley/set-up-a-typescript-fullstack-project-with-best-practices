import { transformAndValidateSync } from 'class-transformer-validator'
import { sign, verify } from 'jsonwebtoken'
import { toPlainObject } from 'lodash'
import { Action, Authorized, CurrentUser } from 'routing-controllers'

import { HEADERS_AUTHORIZATION } from '~/consts'
import { envVars } from '~/env'
import { JwtPayloadDto } from '~/modules/user/user.dto'

export { Authorized, CurrentUser, JwtPayloadDto }

const UNSAFE_DECODED_JWT_PAYLOAD = Symbol('UNSAFE_DECODED_JWT_PAYLOAD')

/**
 * TODO:
 * - Refresh token, doc: https://github.com/auth0/node-jsonwebtoken/blob/3765003/README.md#refreshing-jwts
 */

// Doc: https://github.com/typestack/routing-controllers/blob/8d11d4a/README.md#authorized-decorator
export function authorizationChecker(action: Action): boolean {
  const token = action.request.headers[HEADERS_AUTHORIZATION]?.replace(
    'Bearer ',
    '',
  )
  try {
    const { id, username } = verify(token, envVars.JWT_SECRET) as JwtPayloadDto // & { iat, exp, ... }
    const unsafeDecodedJwtPayload: JwtPayloadDto = { id, username }
    action.request[UNSAFE_DECODED_JWT_PAYLOAD] = unsafeDecodedJwtPayload
    return true
  } catch (e) {
    return false
  }
}

// Doc: https://github.com/typestack/routing-controllers/blob/8d11d4a/README.md#currentuser-decorator
export function currentUserChecker(action: Action): JwtPayloadDto {
  const unsafeDecodedJwtPayload = action.request[UNSAFE_DECODED_JWT_PAYLOAD]
  if (!unsafeDecodedJwtPayload) {
    throw new Error(
      `Please ensure @${Authorized.name} is applied before using @${CurrentUser.name}`,
    )
  }
  // Per [Warning] in https://github.com/auth0/node-jsonwebtoken/blob/3765003/README.md#jwtverifytoken-secretorpublickey-options-callback
  return transformAndValidateSync(
    JwtPayloadDto,
    unsafeDecodedJwtPayload,
  ) as JwtPayloadDto
}

export function generateJwt(payload: JwtPayloadDto): string {
  const validPayload = transformAndValidateSync(JwtPayloadDto, payload)
  const token = sign(
    toPlainObject(validPayload), // Avoid throwing [Error: Expected "payload" to be a plain object]
    envVars.JWT_SECRET,
  )
  return token
}
