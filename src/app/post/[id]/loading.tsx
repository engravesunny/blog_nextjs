import {
  SkeletonPostDetail,
  SkeletonHeading,
  SkeletonText,
  Skeleton,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮骨架 */}
        <Skeleton className="h-6 w-16 mb-8" />

        {/* 文章详情骨架 */}
        <SkeletonPostDetail />

        {/* 相关文章骨架 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mt-8">
          <SkeletonHeading className="w-32 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <Skeleton className="h-5 mb-2" />
                <div className="space-y-2 mb-3">
                  <SkeletonText />
                  <SkeletonText className="w-4/5" />
                  <SkeletonText className="w-3/5" />
                </div>
                <div className="flex items-center gap-4">
                  <SkeletonText className="w-16" />
                  <SkeletonText className="w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
