export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}
export interface AxiosResponse<T> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export interface AxiosPromise<T> extends Promise<AxiosResponse<T>> {}

// todo 创建AxiosError类型接口

export interface AxiosError<T> extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse<T>
  isAxiosError: boolean
}

// todo  首先定义一个Axios 类型接口,他描述了Axios类中的公共方法,接着定义了AxiosInstance接口,继承了Axios,他就是一个混合类型的接口
export interface Axios {
  request<T>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}
export interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): AxiosPromise<T>
  <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
