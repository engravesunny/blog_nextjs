# 统一请求方法使用指南

本项目提供了一套完整的 HTTP 请求解决方案，基于 fetch API 封装，提供类型安全、错误处理、拦截器等功能。

## 📦 文件结构

```
src/utils/
├── request.ts              # 核心请求客户端
├── request-interceptors.ts # 常用拦截器
├── request-config.ts       # 配置和初始化
├── request-examples.tsx    # 使用示例
└── README.md              # 使用文档

src/api/
└── index.ts               # API 服务层
```

## 🚀 快速开始

### 1. 基础使用

```typescript
import { get, post, put, del } from "@/utils/request";

// GET 请求
const response = await get("/posts", {
  params: { page: 1, pageSize: 10 },
});

// POST 请求
const response = await post("/posts", {
  title: "文章标题",
  content: "文章内容",
});

// PUT 请求
const response = await put("/posts/1", {
  title: "更新后的标题",
});

// DELETE 请求
const response = await del("/posts/1");
```

### 2. 使用 API 服务层（推荐）

```typescript
import { api } from "@/api";

// 获取文章列表
const response = await api.post.getList({
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
});

// 创建文章
const response = await api.post.create({
  title: "文章标题",
  content: "文章内容",
  category: "技术",
  tags: ["React", "TypeScript"],
});

// 上传文件
const response = await api.upload.image(file);
```

## 🎯 核心特性

### 1. 类型安全

```typescript
// 完整的 TypeScript 支持
interface User {
  id: number;
  name: string;
  email: string;
}

const response = await get<User>("/user/profile");
// response.data 的类型是 User
```

### 2. 统一的响应格式

```typescript
interface ApiResponse<T> {
  code: number; // 状态码
  message: string; // 响应消息
  data: T; // 响应数据
  success: boolean; // 是否成功
  timestamp?: number; // 时间戳
}
```

### 3. 错误处理

```typescript
import { RequestError } from "@/utils/request";

try {
  const response = await get("/api/data");
} catch (error) {
  if (error instanceof RequestError) {
    console.log("错误码:", error.code);
    console.log("HTTP状态:", error.status);
    console.log("错误信息:", error.message);
  }
}
```

### 4. 请求配置

```typescript
const response = await get("/posts", {
  timeout: 5000, // 超时时间
  retry: 3, // 重试次数
  retryDelay: 1000, // 重试延迟
  showLoading: true, // 显示加载状态
  showError: false, // 不显示错误提示
  onError: (error) => {
    // 自定义错误处理
    console.error("请求失败:", error);
  },
});
```

## 🔧 拦截器系统

### 1. 内置拦截器

```typescript
import { interceptors } from "@/utils/request-interceptors";

// 认证拦截器
request.addInterceptor(interceptors.auth(() => getToken()));

// 加载状态拦截器
request.addInterceptor(interceptors.loading(showLoading));

// 错误处理拦截器
request.addInterceptor(interceptors.errorHandler(showMessage));

// 日志拦截器
request.addInterceptor(interceptors.logger());

// 缓存拦截器
request.addInterceptor(interceptors.cache(5 * 60 * 1000));
```

### 2. 自定义拦截器

```typescript
import { Interceptor } from "@/utils/request";

const customInterceptor: Interceptor = {
  request: async (config) => {
    // 请求前处理
    config.headers = {
      ...config.headers,
      "X-Custom-Header": "value",
    };
    return config;
  },

  response: async (response) => {
    // 响应后处理
    console.log("响应数据:", response);
    return response;
  },

  error: async (error) => {
    // 错误处理
    console.error("请求错误:", error);
    return error;
  },
};

request.addInterceptor(customInterceptor);
```

## 📤 文件上传

### 1. 单文件上传

```typescript
import { upload } from "@/utils/request";

const handleUpload = async (file: File) => {
  try {
    const response = await upload("/upload/image", file);
    console.log("上传成功:", response.data.url);
  } catch (error) {
    console.error("上传失败:", error);
  }
};
```

### 2. 多文件上传

```typescript
import { api } from "@/api";

const handleMultipleUpload = async (files: File[]) => {
  try {
    const response = await api.upload.multiple(files);
    console.log("批量上传成功:", response.data);
  } catch (error) {
    console.error("批量上传失败:", error);
  }
};
```

### 3. 带进度的上传

```typescript
const uploadWithProgress = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await request.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // 可以添加上传进度回调
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log("上传进度:", progress + "%");
    },
  });
};
```

## 📥 文件下载

```typescript
import { download } from "@/utils/request";

// 下载文件
const handleDownload = async () => {
  try {
    await download("/api/files/report.pdf", "monthly-report.pdf");
    console.log("下载完成");
  } catch (error) {
    console.error("下载失败:", error);
  }
};
```

## 🔄 请求重试

```typescript
// 自动重试配置
const response = await get("/api/unstable", {
  retry: 3, // 重试3次
  retryDelay: 2000, // 每次重试延迟2秒
});

// 只对特定错误重试
const response = await get("/api/data", {
  retry: 2,
  retryCondition: (error) => {
    // 只对网络错误或5xx错误重试
    return error.status === 0 || error.status >= 500;
  },
});
```

## 💾 请求缓存

```typescript
// 启用缓存（仅对GET请求有效）
request.addInterceptor(interceptors.cache(5 * 60 * 1000)); // 5分钟缓存

// 或者为特定请求启用缓存
const response = await get("/api/config", {
  cache: true,
  cacheTTL: 10 * 60 * 1000, // 10分钟缓存
});
```

## 🔐 认证处理

### 1. 自动添加 Token

```typescript
// 配置认证拦截器
request.addInterceptor(
  interceptors.auth(() => {
    return localStorage.getItem("auth_token");
  })
);

// 之后的所有请求都会自动添加 Authorization 头部
const response = await get("/api/protected");
```

### 2. Token 刷新

```typescript
// 401错误时自动刷新token
const authInterceptor: Interceptor = {
  error: async (error) => {
    if (error.status === 401) {
      try {
        const refreshResponse = await api.auth.refreshToken();
        const newToken = refreshResponse.data.token;
        localStorage.setItem("auth_token", newToken);

        // 重新发送原请求
        return request.get(error.config.url, error.config);
      } catch (refreshError) {
        // 刷新失败，跳转到登录页
        window.location.href = "/login";
      }
    }
    return error;
  },
};
```

## 🌐 环境配置

### 1. 环境变量

```bash
# .env.development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com

# .env.test
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002/api
```

### 2. 配置不同环境

```typescript
// src/utils/request-config.ts
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
```

## 🎛️ 全局配置

### 1. 应用初始化

```typescript
// src/app/layout.tsx 或 _app.tsx
import { initializeRequest } from "@/utils/request-config";

export default function RootLayout({ children }) {
  useEffect(() => {
    // 初始化请求配置
    initializeRequest();
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### 2. 全局事件监听

```typescript
// 监听加载状态
useEffect(() => {
  const handleLoading = (event: CustomEvent) => {
    setGlobalLoading(event.detail.show);
  };

  window.addEventListener("loading", handleLoading);
  return () => window.removeEventListener("loading", handleLoading);
}, []);

// 监听消息提示
useEffect(() => {
  const handleMessage = (event: CustomEvent) => {
    const { message, type } = event.detail;
    showToast(message, type);
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);
```

## 🧪 测试

### 1. Mock 请求

```typescript
// 测试环境下mock请求
if (process.env.NODE_ENV === "test") {
  const mockInterceptor: Interceptor = {
    request: async (config) => {
      // 返回mock数据
      if (config.url === "/api/posts") {
        throw Promise.resolve({
          code: 200,
          message: "success",
          data: mockPosts,
          success: true,
        });
      }
      return config;
    },
  };

  request.addInterceptor(mockInterceptor);
}
```

### 2. 单元测试

```typescript
import { request } from "@/utils/request";

describe("Request", () => {
  test("should make GET request", async () => {
    const response = await request.get("/api/test");
    expect(response.success).toBe(true);
  });

  test("should handle errors", async () => {
    try {
      await request.get("/api/nonexistent");
    } catch (error) {
      expect(error).toBeInstanceOf(RequestError);
    }
  });
});
```

## 📊 性能优化

### 1. 请求去重

```typescript
// 防止重复请求
request.addInterceptor(interceptors.duplicateRequest(1000));
```

### 2. 请求缓存

```typescript
// 缓存GET请求结果
request.addInterceptor(interceptors.cache(5 * 60 * 1000));
```

### 3. 请求超时

```typescript
// 设置合理的超时时间
const response = await get("/api/data", {
  timeout: 10000, // 10秒超时
});
```

## 🐛 调试

### 1. 开发环境日志

```typescript
// 开发环境自动启用详细日志
if (process.env.NODE_ENV === "development") {
  request.addInterceptor(interceptors.logger());
  request.addInterceptor(interceptors.responseTime());
}
```

### 2. 请求追踪

```typescript
// 为每个请求添加唯一ID
request.addInterceptor(interceptors.requestId());
```

## 🔧 常见问题

### 1. CORS 问题

```typescript
// 配置CORS
const response = await get("/api/data", {
  mode: "cors",
  credentials: "include",
});
```

### 2. 请求取消

```typescript
const controller = new AbortController();

const response = await get("/api/data", {
  signal: controller.signal,
});

// 取消请求
controller.abort();
```

### 3. 大文件上传

```typescript
const uploadLargeFile = async (file: File) => {
  return upload("/upload/large", file, {
    timeout: 300000, // 5分钟超时
    retry: 0, // 不重试
  });
};
```

## 📚 最佳实践

1. **使用 API 服务层**：推荐使用 `api` 对象而不是直接调用 `request`
2. **错误处理**：始终使用 try-catch 处理异步请求
3. **类型安全**：为 API 响应定义明确的 TypeScript 类型
4. **拦截器**：合理使用拦截器处理通用逻辑
5. **配置管理**：使用环境变量管理不同环境的配置
6. **性能优化**：启用缓存和请求去重
7. **错误监控**：在生产环境中集成错误监控服务

## 🔗 相关链接

- [Fetch API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

这套请求系统提供了完整的 HTTP 客户端解决方案，支持现代 Web 应用的各种需求。通过合理配置和使用，可以大大提升开发效率和应用的健壮性。
