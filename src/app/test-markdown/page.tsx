"use client";

import React, { useState } from "react";
import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import { SmartMarkdownRenderer } from "@/components/SmartMarkdownRenderer";
import { MarkdownEditor } from "@/components/MarkdownEditor";

const testMarkdown = `# Markdown 解析测试

## 基础语法测试

这是一个 **粗体文本** 和 *斜体文本* 的示例。

还有 ~~删除线~~ 和 \`行内代码\` 的效果。

### 列表测试

#### 无序列表
- 第一项
- 第二项
  - 嵌套项目
  - 另一个嵌套项目
- 第三项

#### 有序列表
1. 第一步
2. 第二步
3. 第三步

### 链接和图片

访问 [React 官网](https://reactjs.org) 了解更多信息。

### 引用

> 这是一个引用块的示例。
>
> 可以包含多行内容。

### 代码块

\`\`\`javascript
const greeting = (name) => {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome, \${name}!\`;
};

// 调用函数
const message = greeting('World');
console.log(message);
\`\`\`

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];
\`\`\`

### 表格

| 功能 | 状态 | 备注 |
|------|------|------|
| 基础语法 | ✅ | 完全支持 |
| 代码高亮 | ✅ | 多语言支持 |
| 表格 | ✅ | GitHub 风格 |
| 数学公式 | ❌ | 暂不支持 |

### 分割线

---

### 任务列表

- [x] 实现基础 Markdown 解析
- [x] 添加代码高亮
- [x] 支持表格
- [ ] 添加数学公式支持
- [ ] 添加图表支持

### 自动链接

访问 https://github.com 查看更多开源项目。

邮箱: example@domain.com

---

**测试完成！** 🎉
`;

export default function TestMarkdownPage() {
  const [editorContent, setEditorContent] = useState(testMarkdown);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Markdown 解析功能测试
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        测试项目中的 Markdown 解析和编辑功能
      </Typography>

      <Grid container spacing={4}>
        {/* 编辑器测试 */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Markdown 编辑器
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              支持实时预览、工具栏和快捷键
            </Typography>
            <MarkdownEditor
              value={editorContent}
              onChange={setEditorContent}
              minRows={20}
              maxRows={40}
            />
          </Paper>
        </Grid>

        {/* 渲染器测试 */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Markdown 渲染器
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              智能渲染器，支持完整版本和简化版本自动切换
            </Typography>
            <Box
              sx={{
                maxHeight: "80vh",
                overflow: "auto",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
                backgroundColor: "background.paper",
              }}
            >
              <SmartMarkdownRenderer content={editorContent} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* 功能说明 */}
      <Paper elevation={1} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          功能说明
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <li>
            <Typography variant="body2">
              <strong>智能渲染器</strong>: 优先使用完整版本
              (react-markdown)，失败时自动回退到简化版本
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>实时编辑器</strong>:
              支持编辑/预览模式切换，内置工具栏和语法帮助
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>代码高亮</strong>: 支持多种编程语言的语法高亮
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>GitHub 风格</strong>: 支持 GFM
              扩展语法，包括表格、任务列表等
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>主题适配</strong>: 自动适配明暗主题，使用 Material-UI
              设计系统
            </Typography>
          </li>
        </Box>
      </Paper>
    </Container>
  );
}
