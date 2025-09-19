/**
 * API 服务层
 * 定义所有的 API 接口
 */

import { request, ApiResponse } from "@/utils/request";
import { IPost, IComment, ICategory } from "@/store/post";

// ==================== 类型定义 ====================

/** 分页参数 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  total?: number;
}

/** 分页响应 */
export interface PaginatedResponse<T> {
  list: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/** 文章查询参数 */
export interface PostQueryParams extends PaginationParams {
  keyword?: string;
  category?: string;
  tags?: string[];
  author?: string;
  status?: "draft" | "published" | "archived";
  sortBy?: "createdAt" | "updatedAt" | "views" | "likes";
  sortOrder?: "asc" | "desc";
}

/** 文章创建/更新参数 */
export interface PostCreateParams {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  status?: "draft" | "published";
}

export interface PostUpdateParams extends Partial<PostCreateParams> {
  id: number;
}

/** 评论创建参数 */
export interface CommentCreateParams {
  postId: number;
  author: string;
  email?: string;
  content: string;
  parentId?: number;
}

/** 文件上传响应 */
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

// ==================== 文章相关 API ====================

export const postApi = {
  /** 获取文章列表 */
  getList: (
    params?: PostQueryParams
  ): Promise<ApiResponse<PaginatedResponse<IPost>>> => {
    return request.get("/posts", { params });
  },

  /** 获取文章详情 */
  getDetail: (id: number): Promise<ApiResponse<IPost>> => {
    return request.get(`/posts/${id}`);
  },

  /** 创建文章 */
  create: (data: PostCreateParams): Promise<ApiResponse<IPost>> => {
    return request.post("/posts", data);
  },

  /** 更新文章 */
  update: (data: PostUpdateParams): Promise<ApiResponse<IPost>> => {
    const { id, ...updateData } = data;
    return request.put(`/posts/${id}`, updateData);
  },

  /** 删除文章 */
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/posts/${id}`);
  },

  /** 点赞文章 */
  like: (id: number): Promise<ApiResponse<{ likes: number }>> => {
    return request.post(`/posts/${id}/like`);
  },

  /** 取消点赞 */
  unlike: (id: number): Promise<ApiResponse<{ likes: number }>> => {
    return request.delete(`/posts/${id}/like`);
  },

  /** 增加浏览量 */
  incrementViews: (id: number): Promise<ApiResponse<{ views: number }>> => {
    return request.post(`/posts/${id}/views`);
  },

  /** 获取热门文章 */
  getPopular: (limit: number = 10): Promise<ApiResponse<IPost[]>> => {
    return request.get("/posts/popular", { params: { limit } });
  },

  /** 获取相关文章 */
  getRelated: (
    id: number,
    limit: number = 5
  ): Promise<ApiResponse<IPost[]>> => {
    return request.get(`/posts/${id}/related`, { params: { limit } });
  },

  /** 搜索文章 */
  search: (
    keyword: string,
    params?: PostQueryParams
  ): Promise<ApiResponse<PaginatedResponse<IPost>>> => {
    return request.get("/posts/search", {
      params: { keyword, ...params },
    });
  },
};

// ==================== 评论相关 API ====================

export const commentApi = {
  /** 获取文章评论 */
  getByPostId: (
    postId: number,
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<IComment>>> => {
    return request.get(`/posts/${postId}/comments`, { params });
  },

  /** 创建评论 */
  create: (data: CommentCreateParams): Promise<ApiResponse<IComment>> => {
    return request.post("/comments", data);
  },

  /** 删除评论 */
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/comments/${id}`);
  },

  /** 点赞评论 */
  like: (id: number): Promise<ApiResponse<{ likes: number }>> => {
    return request.post(`/comments/${id}/like`);
  },

  /** 举报评论 */
  report: (id: number, reason: string): Promise<ApiResponse<void>> => {
    return request.post(`/comments/${id}/report`, { reason });
  },
};

// ==================== 分类相关 API ====================

export const categoryApi = {
  /** 获取所有分类 */
  getAll: (): Promise<ApiResponse<ICategory[]>> => {
    return request.get("/categories");
  },

  /** 创建分类 */
  create: (data: {
    name: string;
    description?: string;
  }): Promise<ApiResponse<ICategory>> => {
    return request.post("/categories", data);
  },

  /** 更新分类 */
  update: (
    id: number,
    data: { name?: string; description?: string }
  ): Promise<ApiResponse<ICategory>> => {
    return request.put(`/categories/${id}`, data);
  },

  /** 删除分类 */
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/categories/${id}`);
  },

  /** 获取分类下的文章 */
  getPosts: (
    id: number,
    params?: PostQueryParams
  ): Promise<ApiResponse<PaginatedResponse<IPost>>> => {
    return request.get(`/categories/${id}/posts`, { params });
  },
};

// ==================== 标签相关 API ====================

export const tagApi = {
  /** 获取所有标签 */
  getAll: (): Promise<ApiResponse<string[]>> => {
    return request.get("/tags");
  },

  /** 获取热门标签 */
  getPopular: (
    limit: number = 20
  ): Promise<ApiResponse<Array<{ name: string; count: number }>>> => {
    return request.get("/tags/popular", { params: { limit } });
  },

  /** 搜索标签 */
  search: (keyword: string): Promise<ApiResponse<string[]>> => {
    return request.get("/tags/search", { params: { keyword } });
  },

  /** 获取标签下的文章 */
  getPosts: (
    tag: string,
    params?: PostQueryParams
  ): Promise<ApiResponse<PaginatedResponse<IPost>>> => {
    return request.get(`/tags/${encodeURIComponent(tag)}/posts`, { params });
  },
};

// ==================== 文件上传 API ====================

export const uploadApi = {
  /** 上传图片 */
  image: (file: File): Promise<ApiResponse<UploadResponse>> => {
    return request.upload("/upload/image", file);
  },

  /** 上传文件 */
  file: (file: File): Promise<ApiResponse<UploadResponse>> => {
    return request.upload("/upload/file", file);
  },

  /** 批量上传 */
  multiple: (files: File[]): Promise<ApiResponse<UploadResponse[]>> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    return request.post("/upload/multiple", formData);
  },

  /** 删除文件 */
  delete: (url: string): Promise<ApiResponse<void>> => {
    return request.delete("/upload", { params: { url } });
  },
};

// ==================== 统计相关 API ====================

export const statsApi = {
  /** 获取网站统计信息 */
  getSiteStats: (): Promise<
    ApiResponse<{
      totalPosts: number;
      totalViews: number;
      totalComments: number;
      totalCategories: number;
    }>
  > => {
    return request.get("/stats/site");
  },

  /** 获取文章统计 */
  getPostStats: (
    id: number
  ): Promise<
    ApiResponse<{
      views: number;
      likes: number;
      comments: number;
      shares: number;
    }>
  > => {
    return request.get(`/stats/posts/${id}`);
  },

  /** 获取访问统计 */
  getVisitStats: (
    days: number = 30
  ): Promise<
    ApiResponse<
      Array<{
        date: string;
        views: number;
        visitors: number;
      }>
    >
  > => {
    return request.get("/stats/visits", { params: { days } });
  },
};

// ==================== 用户相关 API ====================

export const userApi = {
  /** 获取用户信息 */
  getProfile: (): Promise<
    ApiResponse<{
      id: number;
      username: string;
      email: string;
      avatar?: string;
      bio?: string;
    }>
  > => {
    return request.get("/user/profile");
  },

  /** 更新用户信息 */
  updateProfile: (data: {
    username?: string;
    email?: string;
    avatar?: string;
    bio?: string;
  }): Promise<ApiResponse<void>> => {
    return request.put("/user/profile", data);
  },

  /** 修改密码 */
  changePassword: (data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<void>> => {
    return request.put("/user/password", data);
  },
};

// ==================== 认证相关 API ====================

export const authApi = {
  /** 登录 */
  login: (data: {
    username: string;
    password: string;
  }): Promise<
    ApiResponse<{
      token: string;
      user: {
        id: number;
        username: string;
        email: string;
      };
    }>
  > => {
    return request.post("/auth/login", data);
  },

  /** 注册 */
  register: (data: {
    username: string;
    email: string;
    password: string;
  }): Promise<
    ApiResponse<{
      token: string;
      user: {
        id: number;
        username: string;
        email: string;
      };
    }>
  > => {
    return request.post("/auth/register", data);
  },

  /** 登出 */
  logout: (): Promise<ApiResponse<void>> => {
    return request.post("/auth/logout");
  },

  /** 刷新 token */
  refreshToken: (): Promise<ApiResponse<{ token: string }>> => {
    return request.post("/auth/refresh");
  },

  /** 忘记密码 */
  forgotPassword: (email: string): Promise<ApiResponse<void>> => {
    return request.post("/auth/forgot-password", { email });
  },

  /** 重置密码 */
  resetPassword: (data: {
    token: string;
    password: string;
  }): Promise<ApiResponse<void>> => {
    return request.post("/auth/reset-password", data);
  },
};

// ==================== 导出所有 API ====================

export const api = {
  post: postApi,
  comment: commentApi,
  category: categoryApi,
  tag: tagApi,
  upload: uploadApi,
  stats: statsApi,
  user: userApi,
  auth: authApi,
};

export default api;
