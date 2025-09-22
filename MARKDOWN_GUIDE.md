# Markdown 解析使用指南

本项目已经集成了完整的 Markdown 解析功能，支持在博客文章中使用 Markdown 语法。

## 功能特性

### 1. 智能渲染器 (SmartMarkdownRenderer)

- **完整版本**: 使用 `react-markdown` + `remark-gfm` + `rehype-highlight` 提供完整的 Markdown 支持
- **简化版本**: 纯 JavaScript 实现，作为备选方案
- **自动回退**: 如果完整版本加载失败，自动切换到简化版本

### 2. 支持的 Markdown 语法

#### 基础语法

- **标题**: `# H1`, `## H2`, `### H3` 等
- **粗体**: `**粗体文本**` 或 `__粗体文本__`
- **斜体**: `*斜体文本*` 或 `_斜体文本_`
- **删除线**: `~~删除线文本~~`
- **行内代码**: `` `代码` ``

#### 高级语法

- **代码块**:

  ````markdown
  ```javascript
  const hello = "world";
  ```
  ````

  ```

  ```

- **链接**: `[链接文本](https://example.com)`
- **图片**: `![图片描述](image-url.jpg)`
- **列表**:
  - 无序列表: `- 项目` 或 `* 项目`
  - 有序列表: `1. 项目`
- **引用**: `> 引用内容`
- **分割线**: `---` 或 `***`
- **表格**:
  ```markdown
  | 列 1   | 列 2   | 列 3   |
  | ------ | ------ | ------ |
  | 内容 1 | 内容 2 | 内容 3 |
  ```

#### GitHub 风格扩展 (GFM)

- **任务列表**: `- [ ] 未完成` 和 `- [x] 已完成`
- **删除线**: `~~删除线~~`
- **自动链接**: 直接输入 URL 会自动转换为链接

### 3. 代码高亮

- 支持多种编程语言的语法高亮
- 使用 `highlight.js` 提供代码着色
- 支持深色主题

## 组件使用

### 1. 文章渲染 (SmartMarkdownRenderer)

```tsx
import { SmartMarkdownRenderer } from '@/components/SmartMarkdownRenderer';

// 基础使用
<SmartMarkdownRenderer content={markdownContent} />

// 强制使用简化版本
<SmartMarkdownRenderer content={markdownContent} useSimple={true} />
```

### 2. 编辑器 (MarkdownEditor)

```tsx
import { MarkdownEditor } from "@/components/MarkdownEditor";

const [content, setContent] = useState("");

<MarkdownEditor
  value={content}
  onChange={setContent}
  placeholder="输入 Markdown 内容..."
  minRows={10}
  maxRows={30}
  showToolbar={true}
  showPreview={true}
/>;
```

#### 编辑器功能

- **实时预览**: 支持编辑和预览模式切换
- **工具栏**: 提供常用 Markdown 语法快捷按钮
- **快捷键**:
  - `Ctrl+B` / `Cmd+B`: 粗体
  - `Ctrl+I` / `Cmd+I`: 斜体
  - `Ctrl+K` / `Cmd+K`: 插入链接
- **语法帮助**: 内置 Markdown 语法参考

### 3. 简化渲染器 (SimpleMarkdownRenderer)

```tsx
import { SimpleMarkdownRenderer } from "@/components/SimpleMarkdownRenderer";

<SimpleMarkdownRenderer content={markdownContent} />;
```

## 项目集成

### 1. 文章详情页面

文件: `src/app/post/[id]/page.tsx`

```tsx
// 文章内容渲染
{
  post.content ? (
    <SmartMarkdownRenderer content={post.content} />
  ) : (
    <Typography variant="body1">{post.body}</Typography>
  );
}
```

### 2. 文章编辑页面

文件: `src/app/post/new/page.tsx`

```tsx
// Markdown 编辑器
<MarkdownEditor
  value={formData.content}
  onChange={(value) => handleInputChange("content", value)}
  placeholder="在这里写下你的文章内容，支持 Markdown 语法..."
  minRows={15}
  maxRows={40}
/>
```

## 样式定制

### 1. 主题适配

所有组件都使用 Material-UI 的主题系统，自动适配明暗主题。

### 2. 自定义样式

可以通过 `sx` 属性或 `className` 来自定义样式：

```tsx
<SmartMarkdownRenderer content={content} className="custom-markdown" />
```

### 3. 代码高亮主题

默认使用 `github-dark` 主题，可以在 `MarkdownRenderer.tsx` 中修改：

```tsx
import "highlight.js/styles/github-dark.css"; // 更改为其他主题
```

## 依赖管理

### 必需依赖

```bash
npm install react-markdown remark-gfm rehype-highlight rehype-raw
```

### 可选依赖

如果不安装完整依赖，系统会自动使用简化版本的渲染器。

## 性能优化

### 1. 动态加载

- 使用 `dynamic` 导入减少初始包大小
- 支持 SSR 和客户端渲染

### 2. 错误处理

- 内置错误边界，确保渲染失败时有备选方案
- 自动回退机制保证用户体验

### 3. 缓存策略

- 组件级别的懒加载
- 避免不必要的重新渲染

## 最佳实践

### 1. 内容存储

- 在数据库中存储原始 Markdown 文本
- 避免存储已渲染的 HTML

### 2. 安全考虑

- 使用 `rehype-raw` 时要注意 XSS 风险
- 对用户输入进行适当的验证和清理

### 3. SEO 优化

- Markdown 内容会被正确渲染为语义化的 HTML
- 支持搜索引擎索引和结构化数据

## 故障排除

### 1. 依赖问题

如果 `react-markdown` 相关依赖安装失败：

- 系统会自动使用 `SimpleMarkdownRenderer`
- 可以手动设置 `useSimple={true}` 强制使用简化版本

### 2. 样式问题

- 检查 Material-UI 主题配置
- 确保代码高亮 CSS 文件正确加载

### 3. 性能问题

- 对于大型文档，考虑分页或懒加载
- 使用 `React.memo` 优化组件渲染

## 示例

### 完整的 Markdown 文档示例

````markdown
# 我的技术博客文章

## 简介

这是一篇关于 **React** 和 _TypeScript_ 的技术文章。

### 代码示例

```javascript
const greeting = (name) => {
  console.log(`Hello, ${name}!`);
};

greeting("World");
```
````

### 功能列表

- [x] 支持 Markdown 语法
- [x] 代码高亮
- [ ] 数学公式支持

### 链接和图片

访问 [React 官网](https://reactjs.org) 了解更多信息。

![React Logo](https://reactjs.org/logo.svg)

### 表格

| 特性     | 支持 | 备注        |
| -------- | ---- | ----------- |
| 基础语法 | ✅   | 完全支持    |
| GFM      | ✅   | GitHub 风格 |
| 数学公式 | ❌   | 计划支持    |

> 这是一个引用块，用于强调重要信息。

---

感谢阅读！

```

这个 Markdown 解析系统为你的博客提供了完整的内容创作和展示能力。
```
