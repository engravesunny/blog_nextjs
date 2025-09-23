"use client";

import React, { JSX } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

interface SimpleMarkdownRendererProps {
  content: string;
  className?: string;
}

export const SimpleMarkdownRenderer: React.FC<SimpleMarkdownRendererProps> = ({
  content,
  className,
}) => {
  // 简单的markdown解析函数
  const parseMarkdown = (text: string): JSX.Element[] => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = "";
    let listItems: string[] = [];
    let inList = false;
    let listType: "ul" | "ol" = "ul";

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(" ");
        if (paragraphText.trim()) {
          elements.push(
            <Typography
              key={elements.length}
              variant="body1"
              sx={{ mb: 2, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{
                __html: parseInlineMarkdown(paragraphText),
              }}
            />
          );
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        const ListComponent = listType === "ol" ? "ol" : "ul";
        elements.push(
          <Box
            key={elements.length}
            component={ListComponent}
            sx={{ pl: 3, mb: 2 }}
          >
            {listItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: parseInlineMarkdown(item),
                  }}
                />
              </li>
            ))}
          </Box>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      // 代码块处理
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // 结束代码块
          elements.push(
            <Paper
              key={elements.length}
              elevation={0}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1e1e1e" : "#f8f8f8",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#d4d4d4" : "#24292e",
                p: 3,
                borderRadius: 2,
                mb: 2,
                overflow: "auto",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid #333"
                    : "1px solid #e1e4e8",
              }}
            >
              <Typography
                component="pre"
                sx={{
                  fontFamily: (theme) => theme.typography.fontFamilyMonospace,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  m: 0,
                  fontFeatureSettings: '"liga" 1, "calt" 1',
                  fontVariantLigatures: "common-ligatures",
                }}
              >
                {codeBlockContent.join("\n")}
              </Typography>
            </Paper>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          // 开始代码块
          flushParagraph();
          flushList();
          codeBlockLanguage = line.substring(3).trim();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // 标题处理
      if (line.startsWith("#")) {
        flushParagraph();
        flushList();
        const level = line.match(/^#+/)?.[0].length || 1;
        const title = line.replace(/^#+\s*/, "");

        const variant =
          level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4";
        const fontSize =
          level === 1
            ? "2rem"
            : level === 2
            ? "1.5rem"
            : level === 3
            ? "1.25rem"
            : "1.125rem";

        elements.push(
          <Typography
            key={elements.length}
            variant={variant}
            sx={{
              fontSize,
              fontWeight: level === 1 ? 700 : 600,
              mt: level === 1 ? 4 : 3,
              mb: level === 1 ? 2 : level === 2 ? 2 : 1.5,
              ...(level === 1 && {
                pb: 1,
                borderBottom: 2,
                borderColor: "divider",
              }),
            }}
            dangerouslySetInnerHTML={{
              __html: parseInlineMarkdown(title),
            }}
          />
        );
        return;
      }

      // 分割线处理
      if (line.trim() === "---" || line.trim() === "***") {
        flushParagraph();
        flushList();
        elements.push(<Divider key={elements.length} sx={{ my: 3 }} />);
        return;
      }

      // 引用处理
      if (line.startsWith(">")) {
        flushParagraph();
        flushList();
        const quoteText = line.replace(/^>\s*/, "");
        elements.push(
          <Paper
            key={elements.length}
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
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "text.secondary", m: 0 }}
              dangerouslySetInnerHTML={{
                __html: parseInlineMarkdown(quoteText),
              }}
            />
          </Paper>
        );
        return;
      }

      // 列表处理
      const unorderedListMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
      const orderedListMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);

      if (unorderedListMatch || orderedListMatch) {
        flushParagraph();
        const listItem = (unorderedListMatch || orderedListMatch)?.[1] || "";
        const currentListType = unorderedListMatch ? "ul" : "ol";

        if (!inList || listType !== currentListType) {
          flushList();
          inList = true;
          listType = currentListType;
        }

        listItems.push(listItem);
        return;
      }

      // 空行处理
      if (line.trim() === "") {
        flushParagraph();
        flushList();
        return;
      }

      // 普通段落
      flushList();
      currentParagraph.push(line);
    });

    // 处理剩余内容
    flushParagraph();
    flushList();

    return elements;
  };

  // 解析行内markdown语法
  const parseInlineMarkdown = (text: string): string => {
    return (
      text
        // 粗体
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.*?)__/g, "<strong>$1</strong>")
        // 斜体
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/_(.*?)_/g, "<em>$1</em>")
        // 删除线
        .replace(/~~(.*?)~~/g, "<del>$1</del>")
        // 行内代码
        .replace(
          /`([^`]+)`/g,
          '<code style="background-color: rgba(0,0,0,0.1); padding: 2px 4px; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">$1</code>'
        )
        // 链接
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" style="color: #1976d2; text-decoration: underline;">$1</a>'
        )
        // 自动链接
        .replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" style="color: #1976d2; text-decoration: underline;">$1</a>'
        )
    );
  };

  return <Box className={className}>{parseMarkdown(content)}</Box>;
};

export default SimpleMarkdownRenderer;
