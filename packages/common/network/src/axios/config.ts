export type AxiosHeaders =
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";
export type Recordable<
  T = any,
  K extends string | number | symbol = string,
> = Record<K extends null | undefined ? string : K, T>;

const {
  REACT_APP_BASE_URL = "",
  REACT_APP_API_URL = "",
  REACT_APP_SYS_BASE_URL = "",
  REACT_APP_SYS_API_URL = "",
} = process.env;

const config: {
  base_url: string;
  sys_base_url: string;
  result_code: number | string;
  default_headers: AxiosHeaders;
  request_timeout: number;
} = {
  /**
   * 管理系统api请求基础路径
   */
  base_url: REACT_APP_BASE_URL + REACT_APP_API_URL,
  sys_base_url: REACT_APP_SYS_BASE_URL + REACT_APP_SYS_API_URL,
  /**
   * 接口成功返回状态码
   */
  result_code: 200,

  /**
   * 接口请求超时时间
   */
  request_timeout: 30000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: "application/json",
};

export { config };
