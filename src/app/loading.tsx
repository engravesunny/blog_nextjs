import {
  SkeletonPostCard,
  SkeletonHeading,
  SkeletonTitle,
  Skeleton,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="max-w-7xl mx-auto">
          {/* 页面标题骨架 */}
          <div className="text-center mb-12">
            <SkeletonHeading className="w-64 mx-auto mb-4" />
            <SkeletonTitle className="w-96 mx-auto" />
          </div>

          {/* 搜索和筛选栏骨架 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
            {/* 搜索框骨架 */}
            <div className="relative mb-4">
              <Skeleton className="h-12 rounded-lg" />
            </div>

            {/* 筛选按钮骨架 */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-32 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          </div>

          {/* 文章网格骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonPostCard key={index} />
            ))}
          </div>

          {/* 快速操作按钮骨架 */}
          <div className="fixed bottom-8 right-8">
            <Skeleton className="w-32 h-12 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
