# 代码字体优化改进

## 改进概述

本次更新主要优化了 Markdown 渲染中代码块和行内代码的字体显示效果，提供更好的代码阅读体验。

## 主要改进

### 1. 现代代码字体支持

在主题配置中添加了现代代码字体栈：

```typescript
fontFamilyMonospace: [
  '"Fira Code"', // 支持连字符的现代代码字体
  '"JetBrains Mono"', // JetBrains 开发的代码字体
  '"Cascadia Code"', // Microsoft 开发的代码字体
  '"SF Mono"', // Apple 系统代码字体
  '"Monaco"', // macOS 经典代码字体
  '"Inconsolata"', // 开源代码字体
  '"Roboto Mono"', // Google 开发的等宽字体
  '"Source Code Pro"', // Adobe 开源代码字体
  '"Menlo"', // macOS 系统字体
  '"DejaVu Sans Mono"', // Linux 常用字体
  '"Courier New"', // 经典等宽字体
  "monospace", // 系统默认等宽字体
].join(",");
```

### 2. 代码块样式优化

#### 改进前

- 使用简单的 `fontFamily: "monospace"`
- 基础的背景色和边距
- 没有连字符支持

#### 改进后

- 使用现代代码字体栈
- 明暗主题适配的颜色方案
- 启用连字符支持 (`font-feature-settings`)
- 更好的行高和间距
- 优化的边框和阴影效果

```css
/* 代码块样式 */
pre {
  background-color: #f8f8f8 (亮色) / #1e1e1e (暗色);
  color: #24292e (亮色) / #d4d4d4 (暗色);
  font-family: 现代代码字体栈;
  font-feature-settings: "liga" 1, "calt" 1; /* 启用连字符 */
  line-height: 1.6;
  border: 1px solid 主题边框色;
}
```

### 3. 行内代码样式优化

#### 改进前

- 简单的背景色
- 基础的内边距

#### 改进后

- 更精致的背景色和边框
- 语义化的颜色（类似 GitHub 风格）
- 使用现代代码字体
- 更好的内边距和圆角

```css
/* 行内代码样式 */
code {
  background-color: rgba(175, 184, 193, 0.2) (亮色) / rgba(110, 118, 129, 0.4) (暗色);
  color: #d73a49 (亮色) / #f97583 (暗色);
  font-family: 现代代码字体栈;
  font-weight: 500;
  border: 1px solid 半透明边框;
}
```

### 4. 字体特性增强

- **连字符支持**: 启用了 `font-feature-settings` 和 `font-variant-ligatures`
- **渲染优化**: 添加了 `-webkit-font-smoothing` 和 `text-rendering` 优化
- **滚动条美化**: 自定义了代码块的滚动条样式
- **选择效果**: 优化了代码选择时的高亮效果

### 5. 全局样式文件

创建了 `src/styles/code-fonts.css` 文件：

- 导入 Google Fonts 中的现代代码字体
- 全局代码样式优化
- 滚动条和选择效果美化
- 明暗主题适配

## 文件修改列表

1. **src/theme/index.ts** - 添加代码字体配置
2. **src/theme/types.ts** - 添加字体类型定义
3. **src/components/MarkdownRenderer.tsx** - 更新代码块样式
4. **src/components/SimpleMarkdownRenderer.tsx** - 更新简化版渲染器样式
5. **src/styles/code-fonts.css** - 新增全局代码字体样式
6. **src/app/layout.tsx** - 导入全局样式
7. **src/app/test-markdown/page.tsx** - 更新测试内容

## 效果展示

### 支持的连字符效果

在支持连字符的字体（如 Fira Code）中，以下符号组合会显示为连字符：

- `=>` 箭头函数
- `!=` `!==` 不等于
- `>=` `<=` 大于等于/小于等于
- `&&` `||` 逻辑运算符
- `->` 指针符号
- `::` 作用域解析

### 颜色方案

#### 亮色主题

- 代码块背景: `#f8f8f8`
- 代码块文字: `#24292e`
- 行内代码背景: `rgba(175, 184, 193, 0.2)`
- 行内代码文字: `#d73a49`

#### 暗色主题

- 代码块背景: `#1e1e1e`
- 代码块文字: `#d4d4d4`
- 行内代码背景: `rgba(110, 118, 129, 0.4)`
- 行内代码文字: `#f97583`

## 测试方法

访问 `/test-markdown` 页面查看改进效果：

1. 查看不同编程语言的代码高亮
2. 测试连字符效果（需要支持的字体）
3. 切换明暗主题查看适配效果
4. 测试行内代码的显示效果

## 浏览器兼容性

- **现代浏览器**: 完全支持所有特性
- **旧版浏览器**: 自动回退到系统默认等宽字体
- **字体加载**: 使用 `font-display: swap` 优化加载体验

## 性能考虑

- 字体文件通过 Google Fonts CDN 加载，支持缓存
- 使用字体栈确保在字体未加载时有合适的回退
- CSS 特性检测确保在不支持的浏览器中正常显示

## 未来改进

- [ ] 添加更多代码字体选项
- [ ] 支持用户自定义字体选择
- [ ] 添加字体大小调节功能
- [ ] 优化移动端代码显示效果
