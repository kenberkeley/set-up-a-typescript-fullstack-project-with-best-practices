import { Method } from 'routing-controllers'

interface Route {
  method: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  path: string | ((...args: any[]) => string)
}

interface Routes {
  [apiName: string]: Route
}

export type CreateControllerSpec<T extends Routes> = Record<
  keyof T,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Function
>

/**
 *
  import { Get, JsonController } from 'routing-controllers'

  @JsonController()
  class FooController {
    @Get('/foo/bar')
    bar () {
      ...
    }
  }

 * ⬆️ is equivalent to ⬇️

  import { JsonController } from 'routing-controllers'
  import { MountRoute } from '<path_to_this_file>'

  // This route definition could be placed in somewhere else and used in the client side (maximize code sharing)
  const fooBarRoute = {
    method: 'get',
    path: '/foo/bar'
  }

  @JsonController()
  class FooController {
    @MountRoute(fooBarRoute)
    bar () {
      ...
    }
  }
 */
export function MountRoute(route: Route): ReturnType<typeof Method> {
  return Method(
    route.method as Parameters<typeof Method>[0],
    typeof route.path === 'function' ? route.path() : route.path,
  )
}
