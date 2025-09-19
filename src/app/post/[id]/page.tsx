import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { postState } from "@/store/post";
import { PostDetailClient } from "./PostDetailClient";
import { Icons } from "@/components/icons";
import { getPostContent } from "@/utils/getPostContent";

// 生成动态 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const postId = parseInt(params.id);
  const post = postState.postList.find((p) => p.id === postId);

  if (!post) {
    return {
      title: "文章未找到",
      description: "抱歉，您访问的文章不存在。",
    };
  }

  const baseUrl = "https://yourdomain.com"; // 替换为你的域名
  const postUrl = `${baseUrl}/post/${post.id}`;
  const imageUrl = post.coverImage
    ? `${baseUrl}${post.coverImage}`
    : `${baseUrl}/og-image.jpg`;

  return {
    title: post.title,
    description: post.excerpt || post.body.substring(0, 160) + "...",
    keywords: [...post.tags, post.category, "技术博客", "前端开发"],
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: "我的技术博客",

    alternates: {
      canonical: postUrl,
    },

    openGraph: {
      type: "article",
      locale: "zh_CN",
      url: postUrl,
      siteName: "我的技术博客",
      title: post.title,
      description: post.excerpt || post.body.substring(0, 160) + "...",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.body.substring(0, 160) + "...",
      images: [imageUrl],
      creator: "@yourtwitterhandle", // 替换为你的 Twitter 用户名
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // 结构化数据 - 文章类型
    other: {
      "article:author": post.author,
      "article:published_time": post.createdAt,
      "article:modified_time": post.updatedAt,
      "article:section": post.category,
      "article:tag": post.tags.join(","),
    },
  };
}

// 生成静态路径（可选，用于静态生成）
export async function generateStaticParams() {
  return postState.postList.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = parseInt(params.id);

  // 使用 getPostContent 函数获取文章数据
  const { post, error } = await getPostContent(postId);

  if (!post) {
    notFound();
  }

  // 如果有错误但仍有文章数据，在控制台输出警告
  if (error) {
    console.warn("文章内容获取警告:", error);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 获取相关文章
  const relatedPosts = postState.postList
    .filter(
      (p) =>
        p.id !== postId &&
        (p.category === post.category ||
          p.tags.some((tag) => post.tags.includes(tag)))
    )
    .slice(0, 3);

  // 获取评论
  const comments = postState.comments.filter((c) => c.postId === postId);

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || post.body.substring(0, 160),
            image: post.coverImage
              ? `https://yourdomain.com${post.coverImage}`
              : "https://yourdomain.com/og-image.jpg",
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "我的技术博客",
              logo: {
                "@type": "ImageObject",
                url: "https://yourdomain.com/logo.png",
              },
            },
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://yourdomain.com/post/${post.id}`,
            },
            articleSection: post.category,
            keywords: post.tags.join(", "),
            wordCount: post.content ? post.content.length : post.body.length,
            timeRequired: `PT${post.readTime}M`,
            interactionStatistic: [
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/ReadAction",
                userInteractionCount: post.views,
              },
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/LikeAction",
                userInteractionCount: post.likes,
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* 返回按钮 */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <Icons.ChevronLeft className="w-5 h-5" />
            返回
          </Link>

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
                  <Icons.User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Calendar className="w-4 h-4" />
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Clock className="w-4 h-4" />
                  <span>{post.readTime} 分钟阅读</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Eye className="w-4 h-4" />
                  <span>{post.views} 次浏览</span>
                </div>
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
                  <Icons.Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Icons.LinkedIn className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Icons.Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </article>

          {/* 客户端交互组件 */}
          <PostDetailClient
            postId={postId}
            initialComments={comments}
            initialPost={post}
          />

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
                      <time dateTime={relatedPost.createdAt}>
                        {formatDate(relatedPost.createdAt)}
                      </time>
                      <span>{relatedPost.readTime} 分钟</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
