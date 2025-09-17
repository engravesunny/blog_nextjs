import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}

// 预定义的骨架组件
export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-4", className)} />;
}

export function SkeletonTitle({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-6", className)} />;
}

export function SkeletonHeading({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-8", className)} />;
}

export function SkeletonButton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-24", className)} />;
}

export function SkeletonAvatar({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-12 w-12 rounded-full", className)} />;
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

// 文章卡片骨架
export function SkeletonPostCard() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* 封面图片骨架 */}
      <Skeleton className="aspect-video w-full" />

      <div className="p-6">
        {/* 元信息骨架 */}
        <div className="flex items-center gap-4 mb-3">
          <SkeletonText className="w-16" />
          <SkeletonText className="w-20" />
          <SkeletonText className="w-16" />
        </div>

        {/* 标题骨架 */}
        <SkeletonTitle className="mb-3" />

        {/* 摘要骨架 */}
        <div className="space-y-2 mb-4">
          <SkeletonText />
          <SkeletonText className="w-3/4" />
        </div>

        {/* 标签骨架 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-16 rounded-md" />
          ))}
        </div>

        {/* 底部操作栏骨架 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <SkeletonText className="w-12" />
            <SkeletonText className="w-12" />
          </div>
          <SkeletonText className="w-20" />
        </div>
      </div>
    </article>
  );
}

// 文章详情骨架
export function SkeletonPostDetail() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* 封面图片骨架 */}
      <Skeleton className="aspect-video w-full" />

      <div className="p-8">
        {/* 分类标签骨架 */}
        <Skeleton className="h-6 w-20 rounded-full mb-4" />

        {/* 标题骨架 */}
        <div className="mb-4">
          <SkeletonHeading className="mb-2" />
          <SkeletonHeading className="w-3/4" />
        </div>

        {/* 文章元信息骨架 */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <SkeletonText className="w-16" />
            </div>
          ))}
        </div>

        {/* 文章内容骨架 */}
        <div className="prose prose-lg max-w-none mb-8">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <SkeletonText />
                <SkeletonText className="w-5/6" />
                <SkeletonText className="w-4/5" />
              </div>
            ))}
          </div>
        </div>

        {/* 标签骨架 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-16 rounded-md" />
          ))}
        </div>

        {/* 互动按钮骨架 */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
        </div>
      </div>
    </article>
  );
}
