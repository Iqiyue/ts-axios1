import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  debugger
  if (isPlainObject(data)) {
    debugger
    return JSON.stringify(data)
  } else {
    return data
  }
}

// export function transformResponse() {
//
// }
