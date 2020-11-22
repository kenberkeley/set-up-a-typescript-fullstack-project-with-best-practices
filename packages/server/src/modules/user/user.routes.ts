import urlJoin from 'proper-url-join'

import { UserIdDto, UsernameDto } from './user.dto'

const userModuleBaseUrl = '/user'

export const userApiRoutes = {
  checkUsername: {
    method: 'get',
    path: (reqParams?: UsernameDto): string => {
      return urlJoin(userModuleBaseUrl, 'available', {
        query: { ...reqParams },
      })
    },
  },
  getProfile: {
    method: 'get',
    path: (reqParams?: UserIdDto): string => {
      return urlJoin(
        userModuleBaseUrl,
        'profile',
        reqParams ? reqParams.id : ':id',
      )
    },
  },
  register: {
    method: 'post',
    path: urlJoin(userModuleBaseUrl, 'register'),
  },
  login: {
    method: 'post',
    path: urlJoin(userModuleBaseUrl, 'login'),
  },
  updateProfile: {
    method: 'put',
    path: urlJoin(userModuleBaseUrl, 'profile'),
  },
}
