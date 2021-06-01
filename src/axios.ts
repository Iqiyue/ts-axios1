import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

// function axios(config: AxiosRequestConfig): AxiosPromise {
//   processConfig(config)
//   return xhr(config).then(res => {
//     return transformResponseData(res)
//   })
// }
//
// function processConfig(config: AxiosRequestConfig): void {
//   config.url = transformUrl(config)
//   config.headers = transformHeaders(config)
//   config.data = transformData(config)
// }
//
// function transformUrl(config: AxiosRequestConfig): string {
//   const { url, params } = config
//   return buildURL(url, params)
// }
// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data = {} } = config
//   return processHeaders(headers, data)
// }
// function transformData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }
// function transformResponseData(res: AxiosResponse): AxiosResponse {
//   res.data = transformResponse(res.data)
//   return res
// }

/**
 * 实现混合对象
 * instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性，最终把这个 instance 返回
 * 由于这里 TypeScript 不能正确推断 instance 的类型，我们把它断言成 AxiosInstance 类型
 */

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance()
export default axios
