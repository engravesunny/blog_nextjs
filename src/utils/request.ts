/**
 * 统一的 HTTP 请求客户端
 * 基于 fetch API 封装，提供完整的类型支持和错误处理
 */

// ==================== 类型定义 ====================

/** HTTP 请求方法 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

/** 请求配置接口 */
export interface RequestConfig extends Omit<RequestInit, "method"> {
  /** 请求方法 */
  method?: HttpMethod;
  /** 请求参数（GET 请求会转为 query string，其他请求会转为 body） */
  params?: Record<string, any>;
  /** 请求体数据 */
  data?: any;
  /** 查询参数 */
  query?: Record<string, any>;
  /** 请求 URL */
  url?: string;
  /** 请求超时时间（毫秒） */
  timeout?: number;
  /** 是否自动解析 JSON 响应 */
  parseJSON?: boolean;
  /** 是否显示加载状态 */
  showLoading?: boolean;
  /** 是否显示错误提示 */
  showError?: boolean;
  /** 自定义错误处理 */
  onError?: (error: RequestError) => void;
  /** 重试次数 */
  retry?: number;
  /** 重试延迟（毫秒） */
  retryDelay?: number;
}

/** 响应数据接口 */
export interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
  /** 是否成功 */
  success: boolean;
  /** 时间戳 */
  timestamp?: number;
}

/** 请求错误类 */
export class RequestError extends Error {
  public code: number;
  public status: number;
  public response?: Response;
  public data?: any;

  constructor(
    message: string,
    code: number = 0,
    status: number = 0,
    response?: Response,
    data?: any
  ) {
    super(message);
    this.name = "RequestError";
    this.code = code;
    this.status = status;
    this.response = response;
    this.data = data;
  }
}

/** 拦截器接口 */
export interface Interceptor {
  /** 请求拦截器 */
  request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  /** 响应拦截器 */
  response?: <T>(
    response: ApiResponse<T>
  ) => ApiResponse<T> | Promise<ApiResponse<T>>;
  /** 错误拦截器 */
  error?: (error: RequestError) => RequestError | Promise<RequestError>;
}

// ==================== 工具函数 ====================

/** 构建查询字符串 */
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
}

/** 合并 URL 和查询参数 */
function buildUrl(baseUrl: string, query?: Record<string, any>): string {
  if (!query || Object.keys(query).length === 0) {
    return baseUrl;
  }

  const queryString = buildQueryString(query);
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${queryString}`;
}

/** 延迟函数 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 判断是否为 JSON 响应 */
function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type");
  return contentType?.includes("application/json") ?? false;
}

// ==================== 请求客户端类 ====================

export class HttpClient {
  private baseURL: string;
  private defaultConfig: RequestConfig;
  private interceptors: Interceptor[] = [];

  constructor(baseURL: string = "", defaultConfig: RequestConfig = {}) {
    this.baseURL = baseURL;
    this.defaultConfig = {
      timeout: 10000,
      parseJSON: true,
      showLoading: false,
      showError: true,
      retry: 0,
      retryDelay: 1000,
      headers: {
        "Content-Type": "application/json",
      },
      ...defaultConfig,
    };
  }

  /** 添加拦截器 */
  addInterceptor(interceptor: Interceptor): void {
    this.interceptors.push(interceptor);
  }

  /** 移除拦截器 */
  removeInterceptor(interceptor: Interceptor): void {
    const index = this.interceptors.indexOf(interceptor);
    if (index > -1) {
      this.interceptors.splice(index, 1);
    }
  }

  /** 应用请求拦截器 */
  private async applyRequestInterceptors(
    config: RequestConfig
  ): Promise<RequestConfig> {
    let finalConfig = config;

    for (const interceptor of this.interceptors) {
      if (interceptor.request) {
        finalConfig = await interceptor.request(finalConfig);
      }
    }

    return finalConfig;
  }

  /** 应用响应拦截器 */
  private async applyResponseInterceptors<T>(
    response: ApiResponse<T>
  ): Promise<ApiResponse<T>> {
    let finalResponse = response;

    for (const interceptor of this.interceptors) {
      if (interceptor.response) {
        finalResponse = await interceptor.response(finalResponse);
      }
    }

    return finalResponse;
  }

  /** 应用错误拦截器 */
  private async applyErrorInterceptors(
    error: RequestError
  ): Promise<RequestError> {
    let finalError = error;

    for (const interceptor of this.interceptors) {
      if (interceptor.error) {
        finalError = await interceptor.error(finalError);
      }
    }

    return finalError;
  }

  /** 核心请求方法 */
  private async executeRequest<T = any>(
    url: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    // 合并配置
    const finalConfig: RequestConfig = {
      ...this.defaultConfig,
      ...config,
      url, // 添加 URL 到配置中
      headers: {
        ...this.defaultConfig.headers,
        ...config.headers,
      },
    };

    // 应用请求拦截器
    const interceptedConfig = await this.applyRequestInterceptors(finalConfig);

    // 构建完整 URL
    const fullUrl = this.baseURL + url;
    const requestUrl = buildUrl(fullUrl, interceptedConfig.query);

    // 准备请求体
    let body: string | FormData | undefined;
    if (interceptedConfig.data) {
      if (interceptedConfig.data instanceof FormData) {
        body = interceptedConfig.data;
        // FormData 时移除 Content-Type，让浏览器自动设置
        const headers = { ...interceptedConfig.headers };
        delete (headers as any)?.["Content-Type"];
        interceptedConfig.headers = headers;
      } else {
        body = JSON.stringify(interceptedConfig.data);
      }
    } else if (interceptedConfig.params && interceptedConfig.method !== "GET") {
      body = JSON.stringify(interceptedConfig.params);
    }

    // 创建 fetch 配置，排除自定义属性
    const {
      data,
      params,
      query,
      url: configUrl,
      parseJSON,
      showLoading,
      showError,
      onError,
      retry,
      retryDelay,
      ...fetchConfig
    } = interceptedConfig;

    // 处理 GET 请求的参数
    if (interceptedConfig.method === "GET" && interceptedConfig.params) {
      const getUrl = buildUrl(requestUrl, interceptedConfig.params);
      return this.fetchWithRetry<T>(getUrl, {
        ...fetchConfig,
        body: undefined,
      });
    }

    return this.fetchWithRetry<T>(requestUrl, {
      ...fetchConfig,
      body,
    });
  }

  /** 带重试的 fetch 请求 */
  private async fetchWithRetry<T>(
    url: string,
    config: RequestConfig,
    attempt: number = 0
  ): Promise<ApiResponse<T>> {
    try {
      return await this.performFetch<T>(url, config);
    } catch (error) {
      const maxRetries = config.retry || 0;

      if (attempt < maxRetries && error instanceof RequestError) {
        // 只对网络错误或 5xx 错误进行重试
        if (error.status === 0 || (error.status >= 500 && error.status < 600)) {
          await delay(config.retryDelay || 1000);
          return this.fetchWithRetry<T>(url, config, attempt + 1);
        }
      }

      throw error;
    }
  }

  /** 执行 fetch 请求 */
  private async performFetch<T>(
    url: string,
    config: RequestConfig
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | undefined;

    // 设置超时
    if (config.timeout && config.timeout > 0) {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, config.timeout);
    }

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      // 清除超时定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      return await this.handleResponse<T>(response, config, url);
    } catch (error) {
      // 清除超时定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          const requestError = new RequestError("请求超时", -1, 0);
          (requestError as any).__config__ = config;
          throw await this.applyErrorInterceptors(requestError);
        }

        const requestError = new RequestError(
          error.message || "网络请求失败",
          -1,
          0
        );
        (requestError as any).__config__ = config;
        throw await this.applyErrorInterceptors(requestError);
      }

      throw error;
    }
  }

  /** 处理响应 */
  private async handleResponse<T>(
    response: Response,
    config: RequestConfig,
    url?: string
  ): Promise<ApiResponse<T>> {
    let data: any;

    try {
      if (config.parseJSON && isJsonResponse(response)) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      console.log(`[ Request data from: ${response.url} ] >`, data);
    } catch (error) {
      console.log(`[ Request Error with: ${response.url} ] >`, error);
      data = null;
    }

    // 请求成功
    if (response.ok) {
      // 如果响应数据已经是标准格式，直接返回
      if (
        data &&
        typeof data === "object" &&
        "code" in data &&
        "message" in data
      ) {
        return await this.applyResponseInterceptors(data);
      }

      // 否则包装成标准格式
      const apiResponse: ApiResponse<T> = {
        code: response.status,
        message: "success",
        data: data,
        success: true,
        timestamp: Date.now(),
      };

      // 附加配置信息供拦截器使用
      (apiResponse as any).__config__ = { ...config, url };

      return await this.applyResponseInterceptors(apiResponse);
    }

    // 请求失败
    const errorMessage = data?.message || response.statusText || "请求失败";
    const requestError = new RequestError(
      errorMessage,
      data?.code || response.status,
      response.status,
      response,
      data
    );

    // 附加配置信息供拦截器使用
    (requestError as any).__config__ = { ...config, url };

    // 处理错误显示
    if (config.showError) {
      console.error("Request Error:", requestError);
    }

    if (config.onError) {
      config.onError(requestError);
    }

    throw await this.applyErrorInterceptors(requestError);
  }

  // ==================== HTTP 方法 ====================

  /** GET 请求 */
  async get<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(url, { ...config, method: "GET" });
  }

  /** POST 请求 */
  async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(url, { ...config, method: "POST", data });
  }

  /** PUT 请求 */
  async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(url, { ...config, method: "PUT", data });
  }

  /** DELETE 请求 */
  async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(url, { ...config, method: "DELETE" });
  }

  /** PATCH 请求 */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>(url, { ...config, method: "PATCH", data });
  }

  /** HEAD 请求 */
  async head(url: string, config?: RequestConfig): Promise<ApiResponse<void>> {
    return this.executeRequest<void>(url, { ...config, method: "HEAD" });
  }

  /** OPTIONS 请求 */
  async options(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<void>> {
    return this.executeRequest<void>(url, { ...config, method: "OPTIONS" });
  }

  // ==================== 便捷方法 ====================

  /** 上传文件 */
  async upload<T = any>(
    url: string,
    file: File | FormData,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = file instanceof FormData ? file : new FormData();
    if (file instanceof File) {
      formData.append("file", file);
    }

    return this.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        // 不设置 Content-Type，让浏览器自动设置
      },
    });
  }

  /** 下载文件 */
  async download(
    url: string,
    filename?: string,
    config?: RequestConfig
  ): Promise<void> {
    // 检查是否在浏览器环境
    if (typeof window === "undefined") {
      throw new Error("Download is only supported in browser environment");
    }

    const response = await this.executeRequest<any>(url, {
      ...config,
      parseJSON: false,
    });

    // 创建下载链接
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

// ==================== 默认实例 ====================

/** 默认请求客户端实例 */
/** 服务端URL和客户端URL */
const baseURL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
export const request = new HttpClient(baseURL);

// ==================== 便捷导出 ====================

/** 快捷 GET 请求 */
export const get = <T = any>(url: string, config?: RequestConfig) =>
  request.get<T>(url, config);

/** 快捷 POST 请求 */
export const post = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
) => request.post<T>(url, data, config);

/** 快捷 PUT 请求 */
export const put = <T = any>(url: string, data?: any, config?: RequestConfig) =>
  request.put<T>(url, data, config);

/** 快捷 DELETE 请求 */
export const del = <T = any>(url: string, config?: RequestConfig) =>
  request.delete<T>(url, config);

/** 快捷 PATCH 请求 */
export const patch = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
) => request.patch<T>(url, data, config);

/** 快捷上传文件 */
export const upload = <T = any>(
  url: string,
  file: File | FormData,
  config?: RequestConfig
) => request.upload<T>(url, file, config);

/** 快捷下载文件 */
export const download = (
  url: string,
  filename?: string,
  config?: RequestConfig
) => request.download(url, filename, config);

// ==================== 默认导出 ====================

export default request;
