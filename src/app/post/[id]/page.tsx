import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { postState } from "@/store/post";
import { PostDetailClient } from "./PostDetailClient";
import { getPostContent } from "@/utils/getPostContent";
import { SmartMarkdownRenderer } from "@/components/SmartMarkdownRenderer";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Visibility as EyeIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

// 生成动态 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const postId = parseInt((await params).id);
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
  // 在构建时，我们可以返回一个空数组或预定义的路径
  // 这样可以避免依赖客户端状态，让路由在运行时动态生成
  try {
    // 如果有 API 可以获取文章列表，使用 API
    // const posts = await api.post.getList();
    // return posts.data.list.map((post) => ({
    //   id: post.id.toString(),
    // }));

    // 暂时返回空数组，让所有路由都在运行时生成
    return [];
  } catch (error) {
    console.warn("Failed to generate static params:", error);
    return [];
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = parseInt((await params).id);

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

      <Box
        sx={{
          minHeight: "100vh",
          background: "postBackground",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}
        >
          {/* 返回按钮 */}
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "text.secondary",
              mb: 4,
              "&:hover": {
                color: "text.primary",
                backgroundColor: "action.hover",
              },
              transition: "all 0.2s ease",
            }}
          >
            返回
          </Button>

          {/* 文章头部 */}
          <Card
            component="article"
            sx={{
              borderRadius: 3,
              boxShadow: 1,
              border: 1,
              borderColor: "divider",
              overflow: "hidden",
              mb: 4,
            }}
          >
            {/* 封面图片 */}
            {post.coverImage && (
              <Box
                sx={{
                  aspectRatio: "16/9",
                  background: "postCover",
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "action.disabled",
                    opacity: 0.2,
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      backgroundColor: "background.paper",
                      color: "text.primary",
                      fontWeight: 500,
                      opacity: 0.9,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      color: "common.white",
                      fontSize: { xs: "1.875rem", md: "2.25rem" },
                    }}
                  >
                    {post.title}
                  </Typography>
                </Box>
              </Box>
            )}

            <CardContent sx={{ p: 4 }}>
              {/* 如果没有封面图片，显示标题 */}
              {!post.coverImage && (
                <Box sx={{ mb: 4 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      mb: 2,
                      borderRadius: 3,
                    }}
                  />
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      fontSize: { xs: "1.875rem", md: "2.25rem" },
                      mb: 2,
                    }}
                  >
                    {post.title}
                  </Typography>
                </Box>
              )}

              {/* 文章元信息 */}
              <Stack
                direction="row"
                spacing={3}
                flexWrap="wrap"
                sx={{
                  mb: 4,
                  pb: 4,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {post.author}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="time"
                    dateTime={post.createdAt}
                  >
                    {formatDate(post.createdAt)}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ClockIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {post.readTime} 分钟阅读
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EyeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {post.views} 次浏览
                  </Typography>
                </Stack>
              </Stack>

              {/* 文章内容 */}
              <Box sx={{ mb: 4 }}>
                {post.content ? (
                  <SmartMarkdownRenderer content={post.content} />
                ) : (
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {post.body}
                  </Typography>
                )}
              </Box>

              {/* 标签 */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                {post.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={`#${tag}`}
                    component={Link}
                    href={`/?tag=${encodeURIComponent(tag)}`}
                    clickable
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.light",
                        color: "primary.contrastText",
                      },
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </Box>

              {/* 分享按钮 */}
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  pt: 4,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  分享到：
                </Typography>
                <IconButton
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>

          {/* 客户端交互组件 */}
          <PostDetailClient
            postId={postId}
            initialComments={comments}
            initialPost={post}
          />

          {/* 相关文章 */}
          {relatedPosts.length > 0 && (
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 1,
                border: 1,
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 3,
                  }}
                >
                  相关文章
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(3, 1fr)",
                    },
                    gap: 3,
                  }}
                >
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      component={Link}
                      href={`/post/${relatedPost.id}`}
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        textDecoration: "none",
                        display: "block",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: 2,
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          mb: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {relatedPost.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {relatedPost.excerpt || relatedPost.body}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ fontSize: "0.75rem" }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="time"
                          dateTime={relatedPost.createdAt}
                        >
                          {formatDate(relatedPost.createdAt)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {relatedPost.readTime} 分钟
                        </Typography>
                      </Stack>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>
    </>
  );
}
