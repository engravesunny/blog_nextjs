/**
 * 常用的请求拦截器
 */

import {
  Interceptor,
  RequestConfig,
  RequestError,
  ApiResponse,
} from "./request";

// ==================== 认证拦截器 ====================

/**
 * 认证拦截器
 * 自动添加 Authorization 头部
 */
export function createAuthInterceptor(
  getToken: () => string | null
): Interceptor {
  return {
    request: async (config: RequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },

    error: async (error: RequestError) => {
      // 401 未授权时，可以触发重新登录
      if (error.status === 401) {
        // 这里可以触发登录逻辑
        console.warn("Token expired, please login again");
        // 可以发送事件或调用登录函数
        // window.dispatchEvent(new CustomEvent('auth:logout'));
      }
      return error;
    },
  };
}

// ==================== 加载状态拦截器 ====================

/**
 * 加载状态拦截器
 * 自动管理全局加载状态
 */
export function createLoadingInterceptor(
  showLoading: (show: boolean) => void
): Interceptor {
  let loadingCount = 0;

  return {
    request: async (config: RequestConfig) => {
      if (config.showLoading !== false) {
        loadingCount++;
        showLoading(true);
      }
      return config;
    },

    response: async <T>(response: ApiResponse<T>) => {
      if (loadingCount > 0) {
        loadingCount--;
        if (loadingCount === 0) {
          showLoading(false);
        }
      }
      return response;
    },

    error: async (error: RequestError) => {
      if (loadingCount > 0) {
        loadingCount--;
        if (loadingCount === 0) {
          showLoading(false);
        }
      }
      return error;
    },
  };
}

// ==================== 错误处理拦截器 ====================

/**
 * 错误处理拦截器
 * 统一处理常见错误
 */
export function createErrorHandlerInterceptor(
  showMessage: (message: string, type: "success" | "error" | "warning") => void
): Interceptor {
  return {
    response: async <T>(response: ApiResponse<T>) => {
      // 处理业务错误
      if (!response.success && response.code !== 200) {
        showMessage(response.message || "请求失败", "error");
      }
      return response;
    },

    error: async (error: RequestError) => {
      let message = error.message;

      // 根据状态码显示不同的错误信息
      switch (error.status) {
        case 400:
          message = "请求参数错误";
          break;
        case 401:
          message = "未授权，请重新登录";
          break;
        case 403:
          message = "权限不足";
          break;
        case 404:
          message = "请求的资源不存在";
          break;
        case 408:
          message = "请求超时";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        case 502:
          message = "网关错误";
          break;
        case 503:
          message = "服务不可用";
          break;
        case 504:
          message = "网关超时";
          break;
        default:
          if (error.status === 0) {
            message = "网络连接失败";
          }
      }

      showMessage(message, "error");
      return error;
    },
  };
}

// ==================== 缓存拦截器 ====================

/**
 * 简单的内存缓存拦截器
 * 仅对 GET 请求进行缓存
 */
export function createCacheInterceptor(
  ttl: number = 5 * 60 * 1000 // 默认 5 分钟
): Interceptor {
  const cache = new Map<string, { data: any; timestamp: number }>();

  const generateCacheKey = (config: RequestConfig, url: string): string => {
    const params = config.params || config.query || {};
    const paramsStr = JSON.stringify(params);
    return `${config.method || "GET"}:${url}:${paramsStr}`;
  };

  return {
    response: async <T>(response: ApiResponse<T>) => {
      // 缓存成功的 GET 请求响应
      const config = (response as any).__config__;
      if (
        config &&
        (config.method === "GET" || !config.method) &&
        response.success
      ) {
        const cacheKey = generateCacheKey(config, config.url || "");
        cache.set(cacheKey, {
          data: response,
          timestamp: Date.now(),
        });
      }

      return response;
    },
  };
}

// ==================== 日志拦截器 ====================

/**
 * 日志拦截器
 * 记录请求和响应信息
 */
export function createLoggerInterceptor(
  isDevelopment: boolean = process.env.NODE_ENV === "development"
): Interceptor {
  return {
    request: async (config: RequestConfig) => {
      if (isDevelopment) {
        console.group(
          `🚀 Request: ${config.method || "GET"} ${config.url || ""}`
        );
        console.log("Config:", config);
        console.groupEnd();
      }
      return config;
    },

    response: async <T>(response: ApiResponse<T>) => {
      if (isDevelopment) {
        console.group(`✅ Response: ${response.code}`);
        console.log("Data:", response);
        console.groupEnd();
      }
      return response;
    },

    error: async (error: RequestError) => {
      if (isDevelopment) {
        console.group(`❌ Error: ${error.status}`);
        console.error("Error:", error);
        console.groupEnd();
      }
      return error;
    },
  };
}

// ==================== 重复请求拦截器 ====================

/**
 * 重复请求拦截器
 * 防止短时间内发送相同的请求
 */
export function createDuplicateRequestInterceptor(
  delay: number = 1000 // 1秒内的重复请求会被拦截
): Interceptor {
  const pendingRequests = new Map<string, number>();

  const generateRequestKey = (config: RequestConfig, url: string): string => {
    const params = config.params || config.data || {};
    const paramsStr = JSON.stringify(params);
    return `${config.method || "GET"}:${url}:${paramsStr}`;
  };

  return {
    request: async (config: RequestConfig) => {
      const requestKey = generateRequestKey(config, config.url || "");
      const now = Date.now();

      // 如果有相同的请求在延迟时间内，拒绝新请求
      if (pendingRequests.has(requestKey)) {
        const lastRequestTime = pendingRequests.get(requestKey)!;
        if (now - lastRequestTime < delay) {
          throw new Error("Duplicate request blocked");
        }
      }

      // 记录请求时间
      pendingRequests.set(requestKey, now);

      return config;
    },

    response: async <T>(response: ApiResponse<T>) => {
      // 响应成功后清理记录
      const config = (response as any).__config__;
      if (config) {
        const requestKey = generateRequestKey(config, config.url || "");
        setTimeout(() => {
          pendingRequests.delete(requestKey);
        }, delay);
      }

      return response;
    },

    error: async (error: RequestError) => {
      // 错误时也要清理请求记录
      const config = (error as any).__config__;
      if (config) {
        const requestKey = generateRequestKey(config, config.url || "");
        setTimeout(() => {
          pendingRequests.delete(requestKey);
        }, delay);
      }

      return error;
    },
  };
}

// ==================== 请求 ID 拦截器 ====================

/**
 * 请求 ID 拦截器
 * 为每个请求添加唯一 ID，便于追踪
 */
export function createRequestIdInterceptor(): Interceptor {
  let requestId = 0;

  return {
    request: async (config: RequestConfig) => {
      const id = ++requestId;
      config.headers = {
        ...config.headers,
        "X-Request-ID": id.toString(),
      };

      // 将 ID 附加到配置中，便于后续使用
      (config as any).__requestId__ = id;

      return config;
    },
  };
}

// ==================== 响应时间拦截器 ====================

/**
 * 响应时间拦截器
 * 记录请求的响应时间
 */
export function createResponseTimeInterceptor(): Interceptor {
  return {
    request: async (config: RequestConfig) => {
      (config as any).__startTime__ = Date.now();
      return config;
    },

    response: async <T>(response: ApiResponse<T>) => {
      const config = (response as any).__config__;
      if (config && (config as any).__startTime__) {
        const duration = Date.now() - (config as any).__startTime__;
        console.log(`⏱️ Request completed in ${duration}ms`);
      }
      return response;
    },

    error: async (error: RequestError) => {
      const config = (error as any).__config__;
      if (config && (config as any).__startTime__) {
        const duration = Date.now() - (config as any).__startTime__;
        console.log(`⏱️ Request failed after ${duration}ms`);
      }
      return error;
    },
  };
}

// ==================== 导出所有拦截器 ====================

export const interceptors = {
  auth: createAuthInterceptor,
  loading: createLoadingInterceptor,
  errorHandler: createErrorHandlerInterceptor,
  cache: createCacheInterceptor,
  logger: createLoggerInterceptor,
  duplicateRequest: createDuplicateRequestInterceptor,
  requestId: createRequestIdInterceptor,
  responseTime: createResponseTimeInterceptor,
};
