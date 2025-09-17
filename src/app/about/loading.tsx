import {
  SkeletonHeading,
  SkeletonText,
  Skeleton,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 返回按钮骨架 */}
        <Skeleton className="h-6 w-20 mb-8" />

        {/* 主要内容骨架 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* 头部横幅骨架 */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12 text-white">
            <div className="text-center">
              <Skeleton className="w-24 h-24 rounded-full mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-10 w-64 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-6 w-96 mx-auto bg-white/20" />
            </div>
          </div>

          <div className="p-8">
            {/* 博客介绍骨架 */}
            <section className="mb-12">
              <SkeletonHeading className="w-32 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <SkeletonText />
                    <SkeletonText className="w-5/6" />
                  </div>
                ))}
              </div>
            </section>

            {/* 技术栈骨架 */}
            <section className="mb-12">
              <SkeletonHeading className="w-24 mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <Skeleton className="w-12 h-12 rounded-lg mb-3" />
                    <SkeletonText className="w-16" />
                  </div>
                ))}
              </div>
            </section>

            {/* 联系方式骨架 */}
            <section className="mb-12">
              <SkeletonHeading className="w-24 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-20 mb-2" />
                      <SkeletonText className="w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 博客统计骨架 */}
            <section>
              <SkeletonHeading className="w-24 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <Skeleton className="h-10 w-12 mx-auto mb-2" />
                    <SkeletonText className="w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
