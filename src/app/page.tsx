import { Metadata } from "next";
import { Post } from "@/components/post";

export const metadata: Metadata = {
  title: "首页",
  description:
    "浏览最新的技术文章，包括前端开发、React、Next.js、TypeScript 等技术分享和实践经验。",
  keywords: [
    "技术博客",
    "前端开发",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "编程",
    "Web开发",
  ],
  openGraph: {
    title: "我的技术博客 - 首页",
    description:
      "浏览最新的技术文章，包括前端开发、React、Next.js、TypeScript 等技术分享和实践经验。",
    type: "website",
  },
  twitter: {
    title: "我的技术博客 - 首页",
    description:
      "浏览最新的技术文章，包括前端开发、React、Next.js、TypeScript 等技术分享和实践经验。",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Post />
      </div>
    </main>
  );
}
