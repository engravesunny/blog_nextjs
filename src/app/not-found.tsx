import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "页面未找到 - 404",
  description:
    "抱歉，您访问的页面不存在。请检查 URL 是否正确，或返回首页浏览其他内容。",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            页面未找到
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            返回首页
          </Link>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            或者尝试以下链接：
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              关于我们
            </Link>
            <Link
              href="/post/new"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              发布文章
            </Link>
          </div>
        </div>

        {/* 搜索建议 */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            寻找特定内容？
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            您可以返回首页使用搜索功能，或浏览我们的文章分类。
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            浏览所有文章 →
          </Link>
        </div>
      </div>
    </div>
  );
}
