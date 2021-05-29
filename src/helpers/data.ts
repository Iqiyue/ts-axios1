import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  } else {
    return data
  }
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    return JSON.parse(data)
  }
}
