/**
 * 请求配置
 * 配置默认的请求客户端和拦截器
 */

import { request, HttpClient } from "./request";
import { interceptors } from "./request-interceptors";

// ==================== 配置函数 ====================

/**
 * 配置请求客户端
 * 添加必要的拦截器
 */
export function setupRequest() {
  // 1. 添加请求 ID 拦截器
  request.addInterceptor(interceptors.requestId());

  // 2. 添加响应时间拦截器（开发环境）
  if (process.env.NODE_ENV === "development") {
    request.addInterceptor(interceptors.responseTime());
  }

  // 3. 添加日志拦截器（开发环境）
  request.addInterceptor(interceptors.logger());

  // 4. 添加认证拦截器
  request.addInterceptor(
    interceptors.auth(() => {
      // 从 localStorage 或其他地方获取 token
      if (typeof window !== "undefined") {
        return localStorage.getItem("auth_token");
      }
      return null;
    })
  );

  // 5. 添加加载状态拦截器
  request.addInterceptor(
    interceptors.loading((show: boolean) => {
      // 这里可以控制全局加载状态
      // 例如：显示/隐藏 loading 组件
      if (typeof window !== "undefined") {
        const event = new CustomEvent("loading", { detail: { show } });
        window.dispatchEvent(event);
      }
    })
  );

  // 6. 添加错误处理拦截器
  request.addInterceptor(
    interceptors.errorHandler(
      (message: string, type: "success" | "error" | "warning") => {
        // 这里可以显示全局消息提示
        // 例如：toast 消息
        if (typeof window !== "undefined") {
          const event = new CustomEvent("message", {
            detail: { message, type },
          });
          window.dispatchEvent(event);
        }
      }
    )
  );

  // 7. 添加重复请求拦截器
  request.addInterceptor(interceptors.duplicateRequest(1000));

  // 8. 添加缓存拦截器（可选）
  // request.addInterceptor(interceptors.cache(5 * 60 * 1000)); // 5分钟缓存
}

// ==================== 环境配置 ====================

/**
 * 根据环境配置不同的 baseURL
 */
export function getBaseURL(): string {
  const env = process.env.NODE_ENV;

  switch (env) {
    case "development":
      return (
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"
      );
    case "production":
      return process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
    case "test":
      return "http://localhost:3001/api";
    default:
      return "/api";
  }
}

// ==================== 请求配置常量 ====================

/** 默认请求配置 */
export const DEFAULT_REQUEST_CONFIG = {
  timeout: 10000, // 10秒超时
  retry: 2, // 重试2次
  retryDelay: 1000, // 重试延迟1秒
  showLoading: true, // 显示加载状态
  showError: true, // 显示错误信息
  parseJSON: true, // 自动解析JSON
};

/** 文件上传配置 */
export const UPLOAD_CONFIG = {
  timeout: 60000, // 60秒超时
  retry: 0, // 不重试
  showLoading: true,
  showError: true,
  parseJSON: true,
};

/** 下载配置 */
export const DOWNLOAD_CONFIG = {
  timeout: 120000, // 120秒超时
  retry: 1, // 重试1次
  showLoading: true,
  showError: true,
  parseJSON: false, // 不解析JSON
};

// ==================== 工具函数 ====================

/**
 * 创建带有特定配置的请求实例
 */
export function createRequestInstance(baseURL: string, config = {}) {
  return new HttpClient(baseURL, {
    ...DEFAULT_REQUEST_CONFIG,
    ...config,
  });
}

/**
 * 获取请求头
 */
export function getHeaders(includeAuth = true) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (includeAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * 处理 API 错误
 */
export function handleApiError(error: any) {
  console.error("API Error:", error);

  // 根据错误类型进行不同处理
  if (error.status === 401) {
    // 未授权，清除 token 并跳转到登录页
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
  } else if (error.status === 403) {
    // 权限不足
    console.warn("Access denied");
  } else if (error.status >= 500) {
    // 服务器错误
    console.error("Server error");
  }

  throw error;
}

/**
 * 格式化 API 响应
 */
export function formatApiResponse<T>(response: any): T {
  if (response && response.data !== undefined) {
    return response.data;
  }
  return response;
}

// ==================== 初始化 ====================

/**
 * 初始化请求配置
 * 在应用启动时调用
 */
export function initializeRequest() {
  // 设置基础 URL
  const baseURL = getBaseURL();
  console.log("API Base URL:", baseURL);

  // 配置请求客户端
  setupRequest();

  // 监听网络状态变化
  if (typeof window !== "undefined") {
    window.addEventListener("online", () => {
      console.log("Network is online");
    });

    window.addEventListener("offline", () => {
      console.log("Network is offline");
    });
  }
}
