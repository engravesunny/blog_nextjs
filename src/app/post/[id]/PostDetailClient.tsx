"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/store/StoreProvider";
import { IPost, IComment } from "@/store/post";
import { Icons } from "@/components/icons";
import { usePostContent } from "@/hooks/usePostContent";

interface PostDetailClientProps {
  postId: number;
  initialComments: IComment[];
  initialPost: IPost;
}

export function PostDetailClient({
  postId,
  initialComments,
  initialPost,
}: PostDetailClientProps) {
  const store = useStore();
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [newComment, setNewComment] = useState({ author: "", content: "" });

  // 使用 hook 获取最新的文章内容
  const {
    post: latestPost,
    loading: contentLoading,
    error: contentError,
    refetch,
  } = usePostContent(postId);

  // 使用最新的文章内容，如果获取失败则使用初始数据
  const currentPost = latestPost || initialPost;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author.trim() && newComment.content.trim()) {
      store.getState().addComment({
        postId,
        author: newComment.author,
        content: newComment.content,
      });
      setNewComment({ author: "", content: "" });

      // 重新获取评论
      const postComments = store.use.postState.comments.filter(
        (c) => c.postId === postId
      );
      setComments(postComments);
    }
  };

  const handleLike = () => {
    store.getState().likePost(postId);
    // 增加浏览量
    store.getState().incrementViews(postId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* 点赞按钮和内容刷新 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icons.HeartFilled className="w-5 h-5" />
            <span>点赞 ({currentPost.likes})</span>
          </button>

          {/* 内容刷新按钮 */}
          <button
            onClick={refetch}
            disabled={contentLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors disabled:opacity-50"
            title="刷新文章内容"
          >
            <Icons.Refresh
              className={`w-4 h-4 ${contentLoading ? "animate-spin" : ""}`}
            />
            <span className="text-sm">刷新内容</span>
          </button>
        </div>

        {/* 内容加载状态和错误提示 */}
        {contentLoading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            正在获取最新内容...
          </div>
        )}

        {contentError && (
          <div className="mt-4 text-center text-sm text-amber-600 dark:text-amber-400">
            ⚠️ {contentError}
          </div>
        )}
      </div>

      {/* 评论区 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          评论 ({comments.length})
        </h3>

        {/* 评论表单 */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="您的姓名"
              value={newComment.author}
              onChange={(e) =>
                setNewComment({ ...newComment, author: e.target.value })
              }
              className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <textarea
            placeholder="写下您的评论..."
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            发表评论
          </button>
        </form>

        {/* 评论列表 */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {comment.author}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={comment.createdAt}>
                      {formatDate(comment.createdAt)}
                    </time>
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 ml-13">
                {comment.content}
              </p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              暂无评论，快来发表第一条评论吧！
            </p>
          )}
        </div>
      </div>
    </>
  );
}
