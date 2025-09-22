"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as PreviewIcon,
  Help as HelpIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  List as ListIcon,
  FormatQuote as QuoteIcon,
} from "@mui/icons-material";
import { SmartMarkdownRenderer } from "./SmartMarkdownRenderer";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  showToolbar?: boolean;
  showPreview?: boolean;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "在这里写下你的文章内容，支持 Markdown 语法...",
  minRows = 10,
  maxRows = 30,
  showToolbar = true,
  showPreview = true,
}) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showHelp, setShowHelp] = useState(false);

  // 插入markdown语法的辅助函数
  const insertMarkdown = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const textarea = document.querySelector(
        "textarea"
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      const textToInsert = selectedText || placeholder;

      const newValue =
        value.substring(0, start) +
        before +
        textToInsert +
        after +
        value.substring(end);

      onChange(newValue);

      // 设置光标位置
      setTimeout(() => {
        const newCursorPos = start + before.length + textToInsert.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    },
    [value, onChange]
  );

  // 工具栏按钮配置
  const toolbarButtons = [
    {
      icon: <BoldIcon />,
      tooltip: "粗体 (Ctrl+B)",
      action: () => insertMarkdown("**", "**", "粗体文本"),
    },
    {
      icon: <ItalicIcon />,
      tooltip: "斜体 (Ctrl+I)",
      action: () => insertMarkdown("*", "*", "斜体文本"),
    },
    {
      icon: <CodeIcon />,
      tooltip: "行内代码",
      action: () => insertMarkdown("`", "`", "代码"),
    },
    {
      icon: <LinkIcon />,
      tooltip: "链接",
      action: () => insertMarkdown("[", "](url)", "链接文本"),
    },
    {
      icon: <ListIcon />,
      tooltip: "无序列表",
      action: () => insertMarkdown("- ", "", "列表项"),
    },
    {
      icon: <QuoteIcon />,
      tooltip: "引用",
      action: () => insertMarkdown("> ", "", "引用内容"),
    },
  ];

  // 快捷键处理
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "b":
            event.preventDefault();
            insertMarkdown("**", "**", "粗体文本");
            break;
          case "i":
            event.preventDefault();
            insertMarkdown("*", "*", "斜体文本");
            break;
          case "k":
            event.preventDefault();
            insertMarkdown("[", "](url)", "链接文本");
            break;
        }
      }
    },
    [insertMarkdown]
  );

  const markdownHelp = `
# Markdown 语法帮助

## 标题
# 一级标题
## 二级标题
### 三级标题

## 文本格式
**粗体文本**
*斜体文本*
~~删除线~~
\`行内代码\`

## 链接和图片
[链接文本](https://example.com)
![图片描述](image-url.jpg)

## 列表
- 无序列表项
- 另一个项目

1. 有序列表项
2. 另一个项目

## 引用
> 这是一个引用

## 代码块
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

## 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |

## 分割线
---
  `;

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* 标签栏 */}
      {showPreview && (
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ minHeight: 48 }}
          >
            <Tab
              icon={<EditIcon />}
              label="编辑"
              value="edit"
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
            <Tab
              icon={<PreviewIcon />}
              label="预览"
              value="preview"
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
          </Tabs>
        </Box>
      )}

      {/* 工具栏 */}
      {showToolbar && activeTab === "edit" && (
        <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            {toolbarButtons.map((button, index) => (
              <Tooltip key={index} title={button.tooltip}>
                <IconButton
                  size="small"
                  onClick={button.action}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {button.icon}
                </IconButton>
              </Tooltip>
            ))}

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Tooltip title="Markdown 语法帮助">
              <IconButton
                size="small"
                onClick={() => setShowHelp(!showHelp)}
                sx={{
                  color: showHelp ? "primary.main" : "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      )}

      {/* 编辑器内容 */}
      <Box sx={{ position: "relative" }}>
        {activeTab === "edit" ? (
          <Box>
            <TextField
              multiline
              fullWidth
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              minRows={minRows}
              maxRows={maxRows}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  p: 2,
                },
              }}
            />

            {/* 帮助面板 */}
            {showHelp && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "40%",
                  height: "100%",
                  backgroundColor: "background.paper",
                  borderLeft: 1,
                  borderColor: "divider",
                  overflow: "auto",
                  zIndex: 1,
                }}
              >
                <Box sx={{ p: 2 }}>
                  <SmartMarkdownRenderer content={markdownHelp} useSimple />
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ p: 2, minHeight: 300 }}>
            {value.trim() ? (
              <SmartMarkdownRenderer content={value} />
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                预览将在这里显示...
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default MarkdownEditor;
