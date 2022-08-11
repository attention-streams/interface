export enum RouteParam {
  CATEGORY_ID = 'id',
}

export enum RoutePath {
  LANDING = '/',
  CATEGORY = `/category/:id/`,
}

export function getRoute(path: RoutePath, params?: { [key: string]: string }) {
  let res: string = path;
  if (params) {
    for (const key in params) {
      res = res.replace(`:${key}`, params[key]);
    }
  }
  return res;
}

export default RoutePath;
