/**
 * 用于获取文章内容的自定义 Hook（仅客户端）
 */

import { useState, useEffect } from "react";
import { api } from "@/api";
import { postState, IPost } from "@/store/post";

interface UsePostContentResult {
  post: IPost | null;
  content: string;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePostContent(postId: number): UsePostContentResult {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 从 store 获取文章基本信息
  const postFromStore = postState.postList.find((p) => p.id === postId);

  const fetchContent = async () => {
    if (!postFromStore) {
      setError("文章不存在");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 从 API 获取文章内容
      const response = await api.post.getDetail(postId);
      const fetchedContent = response.data.content || response.data.body || "";

      setContent(fetchedContent);
    } catch (err) {
      console.error("获取文章内容失败:", err);
      setError("获取文章内容失败");

      // 使用 store 中的内容作为备用
      const fallbackContent = postFromStore.content || postFromStore.body || "";
      setContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [postId]);

  // 合并 store 数据和获取的内容
  const post = postFromStore
    ? {
        ...postFromStore,
        content,
        body: content,
      }
    : null;

  return {
    post,
    content,
    loading,
    error,
    refetch: fetchContent,
  };
}

// 服务端函数已移动到 @/utils/getPostContent
// 如需在服务端使用，请导入：import { getPostContent } from "@/utils/getPostContent";
