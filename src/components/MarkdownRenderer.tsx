"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Box, Typography, Paper, Divider } from "@mui/material";
// 代码高亮样式将通过内联样式实现

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        "& .markdown-content": {
          // 标题样式
          "& h1": {
            fontSize: "2rem",
            fontWeight: 700,
            color: "text.primary",
            mt: 4,
            mb: 2,
            pb: 1,
            borderBottom: 2,
            borderColor: "divider",
          },
          "& h2": {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "text.primary",
            mt: 3,
            mb: 2,
          },
          "& h3": {
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "text.primary",
            mt: 3,
            mb: 1.5,
          },
          "& h4, & h5, & h6": {
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "text.primary",
            mt: 2,
            mb: 1,
          },

          // 段落样式
          "& p": {
            color: "text.primary",
            lineHeight: 1.7,
            mb: 2,
            fontSize: "1rem",
          },

          // 链接样式
          "& a": {
            color: "primary.main",
            textDecoration: "underline",
            "&:hover": {
              color: "primary.dark",
              textDecoration: "none",
            },
          },

          // 列表样式
          "& ul, & ol": {
            pl: 3,
            mb: 2,
            "& li": {
              color: "text.primary",
              lineHeight: 1.6,
              mb: 0.5,
            },
          },

          // 引用样式
          "& blockquote": {
            borderLeft: 4,
            borderColor: "primary.main",
            backgroundColor: "action.hover",
            pl: 2,
            py: 1,
            my: 2,
            borderRadius: 1,
            "& p": {
              mb: 0,
              fontStyle: "italic",
              color: "text.secondary",
            },
          },

          // 代码块样式
          "& pre": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1e1e1e" : "#f8f8f8",
            color: (theme) =>
              theme.palette.mode === "dark" ? "#d4d4d4" : "#24292e",
            p: 3,
            borderRadius: 2,
            overflow: "auto",
            mb: 2,
            fontSize: "0.875rem",
            lineHeight: 1.6,
            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid #333"
                : "1px solid #e1e4e8",
            fontFamily: (theme) => theme.typography.fontFamilyMonospace,
            fontFeatureSettings: '"liga" 1, "calt" 1', // 启用连字符
            fontVariantLigatures: "common-ligatures",
            "& code": {
              backgroundColor: "transparent",
              color: "inherit",
              p: 0,
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            },
          },

          // 行内代码样式
          "& code": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(110, 118, 129, 0.4)"
                : "rgba(175, 184, 193, 0.2)",
            color: (theme) =>
              theme.palette.mode === "dark" ? "#f97583" : "#d73a49",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.875rem",
            fontFamily: (theme) => theme.typography.fontFamilyMonospace,
            fontWeight: 500,
            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(110, 118, 129, 0.2)"
                : "1px solid rgba(175, 184, 193, 0.2)",
          },

          // 表格样式
          "& table": {
            width: "100%",
            borderCollapse: "collapse",
            mb: 2,
            border: 1,
            borderColor: "divider",
            "& th, & td": {
              border: 1,
              borderColor: "divider",
              p: 1.5,
              textAlign: "left",
            },
            "& th": {
              backgroundColor: "action.hover",
              fontWeight: 600,
              color: "text.primary",
            },
            "& td": {
              color: "text.primary",
            },
          },

          // 分割线样式
          "& hr": {
            border: "none",
            borderTop: 1,
            borderColor: "divider",
            my: 3,
          },

          // 图片样式
          "& img": {
            maxWidth: "100%",
            height: "auto",
            borderRadius: 2,
            mb: 2,
          },

          // 强调样式
          "& strong": {
            fontWeight: 700,
            color: "text.primary",
          },
          "& em": {
            fontStyle: "italic",
            color: "text.primary",
          },

          // 删除线样式
          "& del": {
            textDecoration: "line-through",
            color: "text.secondary",
          },
        },
      }}
    >
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            // 自定义组件渲染
            h1: ({ children }) => (
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  mt: 4,
                  mb: 2,
                  pb: 1,
                  borderBottom: 2,
                  borderColor: "divider",
                }}
              >
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  mt: 3,
                  mb: 2,
                }}
              >
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  mt: 3,
                  mb: 1.5,
                }}
              >
                {children}
              </Typography>
            ),
            blockquote: ({ children }) => (
              <Paper
                elevation={0}
                sx={{
                  borderLeft: 4,
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                  pl: 2,
                  py: 1,
                  my: 2,
                }}
              >
                {children}
              </Paper>
            ),
            hr: () => <Divider sx={{ my: 3 }} />,
            table: ({ children }) => (
              <Box sx={{ overflowX: "auto", mb: 2 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  {children}
                </table>
              </Box>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </Box>
  );
};

export default MarkdownRenderer;
