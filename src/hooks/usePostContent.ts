/**
 * 用于获取文章内容的自定义 Hook（仅客户端）
 */

import { useState, useEffect } from "react";
import { getPostDetail } from "@/utils/postService";
import { IPost } from "@/store/post";

interface UsePostContentResult {
  post: IPost | null;
  content: string;
  loading: boolean;
  error: string | null;
  isFromMock: boolean;
  refetch: () => Promise<void>;
}

export function usePostContent(postId: number): UsePostContentResult {
  const [post, setPost] = useState<IPost | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromMock, setIsFromMock] = useState<boolean>(false);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // 使用新的 postService 获取文章详情
      const result = await getPostDetail(postId);

      if (result.data) {
        const fetchedContent = result.data.content || result.data.body || "";

        setPost({
          ...result.data,
          content: fetchedContent,
          body: fetchedContent,
        });
        setContent(fetchedContent);
        setError(result.error);
        setIsFromMock(result.isFromMock);
      } else {
        setPost(null);
        setContent("");
        setError(result.error || "文章不存在");
        setIsFromMock(result.isFromMock);
      }
    } catch (err) {
      console.error("获取文章内容失败:", err);
      setError("获取文章内容失败");
      setPost(null);
      setContent("");
      setIsFromMock(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [postId]);

  return {
    post,
    content,
    loading,
    error,
    isFromMock,
    refetch: fetchContent,
  };
}

// 服务端函数已移动到 @/utils/getPostContent
// 如需在服务端使用，请导入：import { getPostContent } from "@/utils/getPostContent";
