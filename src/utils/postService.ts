/**
 * 文章服务 - 处理文章数据获取，包含错误处理和 Mock 数据回退
 */

import { api, PostCreateParams } from "@/api";
import { postState, IPost, IComment } from "@/store/post";

export interface PostServiceResponse<T> {
  data: T;
  error: string | null;
  isFromMock: boolean;
}

/**
 * 获取文章列表
 */
export async function getPostList(): Promise<PostServiceResponse<IPost[]>> {
  try {
    // 尝试从 API 获取数据
    const response = await api.post.getList();
    return {
      data: response.data.list,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn("API 请求失败，使用 Mock 数据:", error);

    // 返回 Mock 数据
    return {
      data: postState.postList,
      error: "API 请求失败，显示测试数据",
      isFromMock: true,
    };
  }
}

/**
 * 获取文章详情
 */
export async function getPostDetail(
  id: number
): Promise<PostServiceResponse<IPost | null>> {
  try {
    // 尝试从 API 获取数据
    const response = await api.post.getDetail(id);
    return {
      data: response.data,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn(`文章 ${id} API 请求失败，使用 Mock 数据:`, error);

    // 从 Mock 数据中查找
    const mockPost = postState.postList.find((post) => post.id === id);

    if (mockPost) {
      return {
        data: mockPost,
        error: "API 请求失败，显示测试数据",
        isFromMock: true,
      };
    } else {
      return {
        data: null,
        error: "文章不存在",
        isFromMock: true,
      };
    }
  }
}

/**
 * 获取文章评论
 */
export async function getPostComments(
  postId: number
): Promise<PostServiceResponse<IComment[]>> {
  try {
    // 尝试从 API 获取数据
    const response = await api.comment.getByPostId(postId);
    return {
      data: response.data.list,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn(`文章 ${postId} 评论 API 请求失败，使用 Mock 数据:`, error);

    // 从 Mock 数据中获取评论
    const mockComments = postState.comments.filter(
      (comment) => comment.postId === postId
    );

    return {
      data: mockComments,
      error: "API 请求失败，显示测试数据",
      isFromMock: true,
    };
  }
}

/**
 * 搜索文章
 */
export async function searchPosts(
  keyword: string
): Promise<PostServiceResponse<IPost[]>> {
  try {
    // 尝试从 API 搜索
    const response = await api.post.search(keyword);
    return {
      data: response.data.list,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn(`搜索 "${keyword}" API 请求失败，使用 Mock 数据:`, error);

    // 在 Mock 数据中搜索
    const query = keyword.toLowerCase();
    const filteredPosts = postState.postList.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );

    return {
      data: filteredPosts,
      error: "API 请求失败，显示测试数据搜索结果",
      isFromMock: true,
    };
  }
}

/**
 * 获取分类文章
 */
export async function getPostsByCategory(
  category: string
): Promise<PostServiceResponse<IPost[]>> {
  try {
    // 尝试从 API 获取分类文章
    const response = await api.post.getList({ category });
    return {
      data: response.data.list,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn(`分类 "${category}" API 请求失败，使用 Mock 数据:`, error);

    // 从 Mock 数据中筛选分类
    const categoryPosts = postState.postList.filter(
      (post) => post.category === category
    );

    return {
      data: categoryPosts,
      error: "API 请求失败，显示测试数据",
      isFromMock: true,
    };
  }
}

/**
 * 获取标签文章
 */
export async function getPostsByTag(
  tag: string
): Promise<PostServiceResponse<IPost[]>> {
  try {
    // 尝试从 API 获取标签文章
    const response = await api.post.getList({ tags: [tag] });
    return {
      data: response.data.list,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn(`标签 "${tag}" API 请求失败，使用 Mock 数据:`, error);

    // 从 Mock 数据中筛选标签
    const tagPosts = postState.postList.filter((post) =>
      post.tags.includes(tag)
    );

    return {
      data: tagPosts,
      error: "API 请求失败，显示测试数据",
      isFromMock: true,
    };
  }
}

/**
 * 创建文章
 */
export async function createPost(
  postData: Omit<IPost, "id" | "createdAt" | "updatedAt" | "views" | "likes">
): Promise<PostServiceResponse<IPost>> {
  try {
    // 尝试通过 API 创建文章
    const response = await api.post.create(postData as PostCreateParams);
    return {
      data: response.data,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn("创建文章 API 请求失败，使用本地存储:", error);

    // 创建本地文章（仅用于测试）
    const newPost: IPost = {
      ...postData,
      id: Math.max(...postState.postList.map((p) => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    };

    // 添加到本地状态（仅用于测试）
    postState.postList.unshift(newPost);

    return {
      data: newPost,
      error: "API 请求失败，文章已保存到本地（测试模式）",
      isFromMock: true,
    };
  }
}

/**
 * 点赞文章
 */
export async function likePost(
  id: number
): Promise<PostServiceResponse<{ likes: number }>> {
  try {
    // 尝试通过 API 点赞
    const response = await api.post.like(id);
    return {
      data: response.data,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn(`点赞文章 ${id} API 请求失败，使用本地操作:`, error);

    // 本地点赞操作
    const post = postState.postList.find((p) => p.id === id);
    if (post) {
      post.likes++;
      return {
        data: { likes: post.likes },
        error: "API 请求失败，点赞已保存到本地（测试模式）",
        isFromMock: true,
      };
    } else {
      return {
        data: { likes: 0 },
        error: "文章不存在",
        isFromMock: true,
      };
    }
  }
}

/**
 * 增加浏览量
 */
export async function incrementViews(
  id: number
): Promise<PostServiceResponse<{ views: number }>> {
  try {
    // 尝试通过 API 增加浏览量
    const response = await api.post.incrementViews(id);
    return {
      data: response.data,
      error: null,
      isFromMock: false,
    };
  } catch (error) {
    console.warn(`增加浏览量 ${id} API 请求失败，使用本地操作:`, error);

    // 本地浏览量操作
    const post = postState.postList.find((p) => p.id === id);
    if (post) {
      post.views++;
      return {
        data: { views: post.views },
        error: null, // 浏览量增加不显示错误信息
        isFromMock: true,
      };
    } else {
      return {
        data: { views: 0 },
        error: "文章不存在",
        isFromMock: true,
      };
    }
  }
}
