"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/store/StoreProvider";
import { IPost, IComment } from "@/store/post";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const store = useStore();
  const postId = parseInt(params.id as string);

  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [relatedPosts, setRelatedPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const foundPost = store.use.postState.postList.find((p) => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
      store.getState().incrementViews(postId);

      // 获取评论
      const postComments = store.use.postState.comments.filter(
        (c) => c.postId === postId
      );
      setComments(postComments);

      // 获取相关文章（同分类或相同标签）
      const related = store.use.postState.postList
        .filter(
          (p) =>
            p.id !== postId &&
            (p.category === foundPost.category ||
              p.tags.some((tag) => foundPost.tags.includes(tag)))
        )
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [postId, store.use.postState.postList, store.use.postState.comments]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            文章未找到
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮 */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回
        </button>

        {/* 文章头部 */}
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
          {/* 封面图片 */}
          {post.coverImage && (
            <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-sm font-medium rounded-full text-gray-800 dark:text-gray-200 mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {post.title}
                </h1>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* 如果没有封面图片，显示标题 */}
            {!post.coverImage && (
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>
              </div>
            )}

            {/* 文章元信息 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readTime} 分钟阅读</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>{post.views} 次浏览</span>
              </div>
              <button
                onClick={() => store.getState().likePost(post.id)}
                className="flex items-center gap-2 hover:text-red-500 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{post.likes} 点赞</span>
              </button>
            </div>

            {/* 文章内容 */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {post.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(/\n/g, "<br>"),
                  }}
                />
              ) : (
                <p>{post.body}</p>
              )}
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/?tag=${encodeURIComponent(tag)}`}
                  className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-md font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* 分享按钮 */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                分享到：
              </span>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </article>

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
                      {formatDate(comment.createdAt)}
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

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              相关文章
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/post/${relatedPost.id}`}
                  className="group block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {relatedPost.excerpt || relatedPost.body}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>{formatDate(relatedPost.createdAt)}</span>
                    <span>{relatedPost.readTime} 分钟</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
