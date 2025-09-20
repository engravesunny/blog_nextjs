import { MetadataRoute } from "next";
import { postState } from "@/store/post";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourdomain.com"; // 替换为你的域名

  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/post/new`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];

  // 动态文章页面 - 在构建时可能为空，运行时会更新
  const postPages =
    postState.postList?.map((post) => ({
      url: `${baseUrl}/post/${post.id}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) || [];

  // 分类页面 - 在构建时可能为空，运行时会更新
  const categoryPages =
    postState.categories?.map((category) => ({
      url: `${baseUrl}/?category=${encodeURIComponent(category.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || [];

  return [...staticPages, ...postPages, ...categoryPages];
}
