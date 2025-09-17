import {
  SkeletonHeading,
  SkeletonText,
  SkeletonButton,
  Skeleton,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮骨架 */}
        <Skeleton className="h-6 w-16 mb-8" />

        {/* 编辑器头部骨架 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <SkeletonHeading className="w-32 mb-6" />

          {/* 标题输入框骨架 */}
          <div className="mb-6">
            <SkeletonText className="w-16 mb-2" />
            <Skeleton className="h-12 rounded-lg" />
          </div>

          {/* 分类和标签骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <SkeletonText className="w-12 mb-2" />
              <Skeleton className="h-10 rounded-lg" />
            </div>
            <div>
              <SkeletonText className="w-12 mb-2" />
              <Skeleton className="h-10 rounded-lg" />
            </div>
          </div>

          {/* 摘要输入框骨架 */}
          <div className="mb-6">
            <SkeletonText className="w-12 mb-2" />
            <Skeleton className="h-24 rounded-lg" />
          </div>

          {/* 封面图片上传骨架 */}
          <div className="mb-6">
            <SkeletonText className="w-16 mb-2" />
            <Skeleton className="h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600" />
          </div>
        </div>

        {/* 编辑器主体骨架 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
          {/* 工具栏骨架 */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-8 rounded" />
              ))}
            </div>
          </div>

          {/* 编辑器内容区域骨架 */}
          <div className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <SkeletonText />
                  <SkeletonText className="w-5/6" />
                  <SkeletonText className="w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 操作按钮骨架 */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <SkeletonButton />
            <SkeletonButton />
          </div>
          <div className="flex items-center gap-4">
            <SkeletonButton className="w-16" />
            <SkeletonButton className="w-16" />
          </div>
        </div>

        {/* 侧边栏骨架（预览模式） */}
        <div className="fixed top-20 right-8 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hidden xl:block">
          <Skeleton className="h-6 w-16 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-3" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
