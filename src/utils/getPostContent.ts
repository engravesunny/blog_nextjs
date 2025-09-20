/**
 * 服务端文章内容获取函数
 * 不包含任何客户端 Hook，可以在服务端安全使用
 */

import { getPostDetail } from "./postService";
import { IPost } from "@/store/post";

/**
 * 用于在服务端获取文章内容的函数
 */
export async function getPostContent(postId: number): Promise<{
  post: IPost | null;
  content: string;
  error: string | null;
  isFromMock?: boolean;
}> {
  try {
    // 使用新的 postService 获取文章详情
    const result = await getPostDetail(postId);

    if (!result.data) {
      return {
        post: null,
        content: "",
        error: result.error || "文章不存在",
        isFromMock: result.isFromMock,
      };
    }

    const post = result.data;
    const content = post.content || post.body || "";

    return {
      post: {
        ...post,
        content,
        body: content,
      },
      content,
      error: result.error,
      isFromMock: result.isFromMock,
    };
  } catch (error) {
    console.error("获取文章内容失败:", error);

    return {
      post: null,
      content: "",
      error: "获取文章内容失败",
      isFromMock: false,
    };
  }
}
