# 骨架屏组件 (Skeleton Components)

这个目录包含了项目中使用的骨架屏组件，用于在内容加载时提供良好的用户体验。

## 组件列表

### 基础骨架组件

- `Skeleton` - 基础骨架组件，可自定义样式
- `SkeletonText` - 文本骨架 (高度: 16px)
- `SkeletonTitle` - 标题骨架 (高度: 24px)
- `SkeletonHeading` - 大标题骨架 (高度: 32px)
- `SkeletonButton` - 按钮骨架 (高度: 40px, 宽度: 96px)
- `SkeletonAvatar` - 头像骨架 (48x48px 圆形)

### 复合骨架组件

- `SkeletonCard` - 通用卡片骨架
- `SkeletonPostCard` - 文章卡片骨架
- `SkeletonPostDetail` - 文章详情骨架

## 使用方法

### 基础用法

```tsx
import {
  Skeleton,
  SkeletonText,
  SkeletonTitle,
} from "@/components/ui/Skeleton";

function MyComponent() {
  return (
    <div>
      <SkeletonTitle className="mb-4" />
      <SkeletonText className="mb-2" />
      <SkeletonText className="w-3/4" />
      <Skeleton className="h-32 w-full mt-4" />
    </div>
  );
}
```

### 文章列表骨架

```tsx
import { SkeletonPostCard } from "@/components/ui/Skeleton";

function PostListLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonPostCard key={index} />
      ))}
    </div>
  );
}
```

### 文章详情骨架

```tsx
import { SkeletonPostDetail } from "@/components/ui/Skeleton";

function PostDetailLoading() {
  return <SkeletonPostDetail />;
}
```

## 自定义样式

所有骨架组件都支持通过 `className` 属性自定义样式：

```tsx
<Skeleton className="h-20 w-full rounded-xl bg-blue-200" />
<SkeletonText className="w-1/2 bg-red-200" />
```

## 特性

- 🎨 **自适应主题** - 自动适配明暗主题
- 📱 **响应式设计** - 在不同屏幕尺寸下表现良好
- ⚡ **性能优化** - 使用 CSS 动画，性能优异
- 🔧 **高度可定制** - 支持自定义样式和尺寸
- 🎯 **语义化** - 组件名称直观，易于理解和使用

## 动画效果

所有骨架组件都使用了 `animate-pulse` 类，提供平滑的脉冲动画效果。动画通过 Tailwind CSS 实现，确保性能和一致性。

## 最佳实践

1. **匹配真实内容** - 骨架屏应该尽可能匹配真实内容的布局和尺寸
2. **合理的加载时间** - 骨架屏适合短时间加载，长时间加载建议使用进度条
3. **保持一致性** - 在整个应用中使用一致的骨架屏风格
4. **避免过度使用** - 只在必要的地方使用骨架屏，避免影响用户体验
