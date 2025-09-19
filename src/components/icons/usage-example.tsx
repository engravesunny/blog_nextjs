// 图标使用示例
import { Icons } from "./index";

// 示例：在组件中使用图标
export function IconUsageExample() {
  return (
    <div className="space-y-4">
      {/* 基础用法 */}
      <div className="flex items-center gap-2">
        <Icons.User className="w-4 h-4" />
        <span>用户</span>
      </div>

      {/* 自定义大小和颜色 */}
      <div className="flex items-center gap-2">
        <Icons.Heart className="w-6 h-6 text-red-500" />
        <span>点赞</span>
      </div>

      {/* 使用 size 属性 */}
      <div className="flex items-center gap-2">
        <Icons.Search size={20} className="text-blue-500" />
        <span>搜索</span>
      </div>

      {/* 社交媒体图标 */}
      <div className="flex gap-3">
        <Icons.Twitter className="w-5 h-5 text-blue-400" />
        <Icons.GitHub className="w-5 h-5 text-gray-700" />
        <Icons.LinkedIn className="w-5 h-5 text-blue-600" />
      </div>

      {/* 导航图标 */}
      <div className="flex items-center gap-4">
        <Icons.Menu className="w-5 h-5" />
        <Icons.Close className="w-5 h-5" />
        <Icons.ChevronDown className="w-4 h-4" />
      </div>

      {/* 主题切换 */}
      <div className="flex gap-2">
        <Icons.Sun className="w-5 h-5 text-yellow-500" />
        <Icons.Moon className="w-5 h-5 text-gray-600" />
      </div>
    </div>
  );
}

// 在 Post 组件中的使用示例
export function PostComponentExample() {
  return (
    <article className="border rounded-lg p-4">
      {/* 文章元信息 */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Icons.User className="w-4 h-4" />
          作者名
        </span>
        <span className="flex items-center gap-1">
          <Icons.Calendar className="w-4 h-4" />
          2024-01-15
        </span>
        <span className="flex items-center gap-1">
          <Icons.Clock className="w-4 h-4" />5 分钟阅读
        </span>
      </div>

      {/* 文章标题 */}
      <h2 className="text-xl font-bold mb-3">文章标题</h2>

      {/* 文章摘要 */}
      <p className="text-gray-600 mb-4">文章摘要内容...</p>

      {/* 交互按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
            <Icons.Heart className="w-4 h-4" />
            <span>23</span>
          </button>
          <span className="flex items-center gap-1 text-gray-500">
            <Icons.Eye className="w-4 h-4" />
            <span>128</span>
          </span>
        </div>
        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
          <Icons.Share className="w-4 h-4" />
          <span>分享</span>
        </button>
      </div>
    </article>
  );
}
