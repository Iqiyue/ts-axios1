import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosInterceptorManager,
  AxiosResponse,
  RejectedFn,
  ResolvedFn
} from '../types'
import InterceptorManager from './InterceptorManager'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'

/**
 * 创建Axios类
 */

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = initConfig
  }

  request<T>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    console.log('config', config)
    config = mergeConfig(this.defaults, config)
    console.log('config2', config)
    let chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    console.log('chain', chain)
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    // return dispatchRequest(config)
    return promise
  }

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('head', url, config)
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('post', url, data, config)
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithData('patch', url, data, config)
  }

  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData('options', url, config)
  }

  _requestMethodWithoutData<T>(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  _requestMethodWithData<T>(
    method: Method,
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
