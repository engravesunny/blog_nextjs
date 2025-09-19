# 图标系统使用指南

本项目使用统一的图标组件库，所有图标都封装在 `src/components/icons` 目录下。

## 📦 安装和导入

```tsx
// 导入单个图标
import { UserIcon, HeartIcon, SearchIcon } from "@/components/icons";

// 导入图标对象（推荐）
import { Icons } from "@/components/icons";
```

## 🎯 基础用法

### 使用单个图标组件

```tsx
import { UserIcon, HeartIcon } from "@/components/icons";

function MyComponent() {
  return (
    <div>
      <UserIcon className="w-5 h-5 text-gray-500" />
      <HeartIcon className="w-6 h-6 text-red-500" />
    </div>
  );
}
```

### 使用 Icons 对象（推荐）

```tsx
import { Icons } from "@/components/icons";

function MyComponent() {
  return (
    <div>
      <Icons.User className="w-5 h-5 text-gray-500" />
      <Icons.Heart className="w-6 h-6 text-red-500" />
    </div>
  );
}
```

## ⚙️ 属性配置

所有图标组件都支持以下属性：

| 属性          | 类型               | 默认值           | 描述                                  |
| ------------- | ------------------ | ---------------- | ------------------------------------- |
| `className`   | `string`           | `"w-5 h-5"`      | CSS 类名                              |
| `size`        | `number \| string` | -                | 图标大小（会覆盖 className 中的尺寸） |
| `color`       | `string`           | `"currentColor"` | 图标颜色                              |
| `strokeWidth` | `number`           | `2`              | 描边宽度（仅线性图标）                |

### 示例

```tsx
// 使用 className 控制样式
<Icons.Search className="w-4 h-4 text-blue-500" />

// 使用 size 属性
<Icons.Heart size={24} className="text-red-500" />

// 自定义颜色和描边
<Icons.User color="#3B82F6" strokeWidth={1.5} />
```

## 📋 可用图标列表

### 👤 用户相关

- `Icons.User` - 用户图标

### ⏰ 时间相关

- `Icons.Calendar` - 日历图标
- `Icons.Clock` - 时钟图标

### 💝 交互图标

- `Icons.Heart` - 心形图标（线性）
- `Icons.HeartFilled` - 心形图标（填充）
- `Icons.Eye` - 眼睛图标

### 🧭 导航图标

- `Icons.Search` - 搜索图标
- `Icons.Filter` - 筛选图标
- `Icons.ChevronDown` - 向下箭头
- `Icons.ChevronLeft` - 向左箭头
- `Icons.Sort` - 排序图标

### 🌙 主题切换

- `Icons.Sun` - 太阳图标
- `Icons.Moon` - 月亮图标

### ⚡ 操作图标

- `Icons.Plus` - 加号图标
- `Icons.Edit` - 编辑图标
- `Icons.Menu` - 菜单图标
- `Icons.Close` - 关闭图标
- `Icons.Write` - 写作图标

### 📤 分享图标

- `Icons.Share` - 分享图标

### 🌐 社交媒体

- `Icons.Twitter` - Twitter 图标
- `Icons.LinkedIn` - LinkedIn 图标
- `Icons.Instagram` - Instagram 图标
- `Icons.GitHub` - GitHub 图标

### 📄 文档相关

- `Icons.Document` - 文档图标

### 🏷️ 其他

- `Icons.Logo` - Logo 图标
- `Icons.Mail` - 邮件图标
- `Icons.Phone` - 电话图标
- `Icons.Location` - 位置图标
- `Icons.Tag` - 标签图标

## 🎨 样式定制

### 颜色控制

```tsx
// 使用 Tailwind CSS 类
<Icons.Heart className="text-red-500 hover:text-red-600" />

// 使用自定义颜色
<Icons.User color="#3B82F6" />
```

### 尺寸控制

```tsx
// 使用 Tailwind CSS 类
<Icons.Search className="w-4 h-4" />  // 16px
<Icons.Search className="w-6 h-6" />  // 24px
<Icons.Search className="w-8 h-8" />  // 32px

// 使用 size 属性
<Icons.Search size={20} />
<Icons.Search size="1.5rem" />
```

### 动画效果

```tsx
// 旋转动画
<Icons.Search className="w-5 h-5 animate-spin" />

// 悬停效果
<Icons.Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />

// 缩放效果
<Icons.Plus className="w-5 h-5 transform hover:scale-110 transition-transform" />
```

## 📝 实际使用示例

### 导航栏

```tsx
import { Icons } from "@/components/icons";

function Navigation() {
  return (
    <nav className="flex items-center gap-4">
      <Icons.Logo className="w-8 h-8 text-blue-600" />
      <Icons.Search className="w-5 h-5 text-gray-500" />
      <Icons.Menu className="w-5 h-5 md:hidden" />
    </nav>
  );
}
```

### 文章卡片

```tsx
import { Icons } from "@/components/icons";

function PostCard({ post }) {
  return (
    <article className="border rounded-lg p-4">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Icons.User className="w-4 h-4" />
          {post.author}
        </span>
        <span className="flex items-center gap-1">
          <Icons.Calendar className="w-4 h-4" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Icons.Clock className="w-4 h-4" />
          {post.readTime} 分钟
        </span>
      </div>

      <h2 className="text-xl font-bold mb-3">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
            <Icons.Heart className="w-4 h-4" />
            {post.likes}
          </button>
          <span className="flex items-center gap-1 text-gray-500">
            <Icons.Eye className="w-4 h-4" />
            {post.views}
          </span>
        </div>
        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
          <Icons.Share className="w-4 h-4" />
          分享
        </button>
      </div>
    </article>
  );
}
```

### 主题切换按钮

```tsx
import { Icons } from "@/components/icons";

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {isDark ? (
        <Icons.Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Icons.Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
```

## 🔧 添加新图标

1. 在 `src/components/icons/index.tsx` 中添加新的图标组件
2. 将图标添加到 `Icons` 对象中
3. 更新本文档的图标列表

```tsx
// 添加新图标
export const NewIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="..." />
  </Icon>
);

// 添加到 Icons 对象
export const Icons = {
  // ... 其他图标
  New: NewIcon,
};
```

## 💡 最佳实践

1. **统一使用 Icons 对象**：推荐使用 `Icons.IconName` 而不是单独导入
2. **保持一致的尺寸**：在同一上下文中使用相同的图标尺寸
3. **语义化命名**：使用描述性的图标名称
4. **颜色继承**：优先使用 `currentColor` 让图标继承文本颜色
5. **响应式设计**：在不同屏幕尺寸下调整图标大小

```tsx
// ✅ 好的做法
<Icons.User className="w-4 h-4 text-current" />

// ❌ 避免的做法
<svg className="w-4 h-4" fill="none" stroke="currentColor">
  <path d="..." />
</svg>
```

## 🚀 性能优化

- 所有图标都是 SVG 格式，体积小，加载快
- 使用 Tree Shaking，只打包使用的图标
- 图标组件支持服务端渲染 (SSR)
- 内联 SVG 避免额外的网络请求
