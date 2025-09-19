/**
 * 服务端文章内容获取函数
 * 不包含任何客户端 Hook，可以在服务端安全使用
 */

import { api } from "@/api";
import { postState, IPost } from "@/store/post";

/**
 * 用于在服务端获取文章内容的函数
 */
export async function getPostContent(postId: number): Promise<{
  post: IPost | null;
  content: string;
  error: string | null;
}> {
  // 从 store 获取文章基本信息
  const postFromStore = postState.postList.find((p) => p.id === postId);

  if (!postFromStore) {
    return {
      post: null,
      content: "",
      error: "文章不存在",
    };
  }

  try {
    // 从 API 获取文章内容
    const response = await api.post.getDetail(postId);
    const content = response.data.content || response.data.body || "";

    // 合并数据
    const post = {
      ...postFromStore,
      content,
      body: content,
    };

    return {
      post,
      content,
      error: null,
    };
  } catch (error) {
    console.error("获取文章内容失败:", error);

    // 使用 store 中的内容作为备用
    const fallbackContent = postFromStore.content || postFromStore.body || "";
    const post = {
      ...postFromStore,
      content: fallbackContent,
      body: fallbackContent,
    };

    return {
      post,
      content: fallbackContent,
      error: "获取文章内容失败，显示缓存内容",
    };
  }
}
