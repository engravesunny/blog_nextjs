# 现代化博客网站

一个基于 Next.js 15 + React 19 + TypeScript + Tailwind CSS 构建的现代化博客网站，具有完整的文章管理、搜索筛选、评论系统和暗黑模式等功能。

## ✨ 主要特性

### 🎨 现代化设计

- **响应式布局** - 完美适配桌面端和移动端
- **暗黑模式** - 支持明暗主题切换，自动适应系统偏好
- **优雅动画** - 流畅的过渡动画和交互效果
- **现代 UI** - 基于 Tailwind CSS 的精美界面设计

### 📝 文章管理

- **富文本编辑** - 支持 Markdown 语法的文章编辑器
- **实时预览** - 编辑时可实时预览文章效果
- **分类管理** - 灵活的文章分类系统
- **标签系统** - 多标签支持，便于文章归类
- **草稿功能** - 支持保存草稿，随时继续编辑

### 🔍 搜索与筛选

- **全文搜索** - 支持标题、内容、标签的全文搜索
- **分类筛选** - 按分类快速筛选文章
- **标签筛选** - 支持多标签组合筛选
- **排序功能** - 按日期、浏览量、点赞数排序

### 💬 互动功能

- **评论系统** - 完整的文章评论功能
- **点赞功能** - 文章点赞和浏览量统计
- **社交分享** - 支持多平台分享

### 🛠 技术特性

- **状态管理** - 基于 Zustand 的轻量级状态管理
- **类型安全** - 完整的 TypeScript 类型定义
- **性能优化** - Next.js 15 的最新性能优化
- **SEO 友好** - 服务端渲染和 SEO 优化

## 🚀 技术栈

- **前端框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **类型系统**: TypeScript
- **样式框架**: Tailwind CSS v4
- **状态管理**: Zustand
- **开发工具**: ESLint, PostCSS
- **部署平台**: Vercel (推荐)

## 📦 安装与运行

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm run start
```

## 📁 项目结构

```
blog-nextjs/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── about/             # 关于页面
│   │   ├── post/              # 文章相关页面
│   │   │   ├── [id]/          # 文章详情页
│   │   │   └── new/           # 新建/编辑文章页
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # React 组件
│   │   ├── Footer/            # 页脚组件
│   │   ├── Nav/               # 导航栏组件
│   │   └── post/              # 文章相关组件
│   ├── store/                 # 状态管理
│   │   ├── StoreProvider.tsx  # Store 提供者
│   │   ├── index.tsx          # Store 配置
│   │   └── post.ts            # 文章状态管理
│   └── utils/                 # 工具函数
├── public/                    # 静态资源
├── next.config.ts             # Next.js 配置
├── tailwind.config.ts         # Tailwind CSS 配置
├── tsconfig.json              # TypeScript 配置
└── package.json               # 项目依赖
```

## 🎯 功能使用指南

### 📖 浏览文章

- 在首页可以看到所有已发布的文章
- 使用搜索框搜索感兴趣的文章
- 点击筛选按钮可以按分类和标签筛选
- 支持按日期、浏览量、点赞数排序

### ✍️ 写文章

1. 点击右上角的"写文章"按钮或首页的浮动按钮
2. 填写文章标题、摘要和正文内容
3. 选择分类，添加标签
4. 可以切换到预览模式查看效果
5. 点击"发布文章"完成发布

### 💬 评论互动

- 在文章详情页底部可以发表评论
- 点击文章的点赞按钮为文章点赞
- 查看文章的浏览量和其他统计信息

### 🌙 主题切换

- 点击导航栏的主题切换按钮
- 支持明亮模式和暗黑模式
- 会自动保存用户的主题偏好

## 🔧 自定义配置

### 修改主题色彩

编辑 `src/app/globals.css` 文件中的 CSS 变量：

```css
@theme {
  --color-primary: #3b82f6; /* 主色调 */
  --color-secondary: #10b981; /* 辅助色 */
  --color-accent: #8b5cf6; /* 强调色 */
}
```

### 添加新的文章分类

在 `src/store/post.ts` 文件中的 `categories` 数组添加新分类：

```typescript
categories: [
  { id: "new-category", name: "新分类", description: "分类描述", count: 0 },
  // ... 其他分类
];
```

### 自定义导航菜单

编辑 `src/components/Nav/index.tsx` 文件，修改导航链接。

## 🚀 部署

### Vercel 部署 (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台

项目支持部署到任何支持 Next.js 的平台，如：

- Netlify
- Railway
- Heroku
- 自建服务器

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 开发流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理
- [Heroicons](https://heroicons.com/) - 图标库

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 邮箱: your-email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
