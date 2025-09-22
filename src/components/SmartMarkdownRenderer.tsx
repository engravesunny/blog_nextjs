"use client";

import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

// 动态导入完整版markdown渲染器，如果失败则使用简化版本
const MarkdownRenderer = dynamic(
  () =>
    import("./MarkdownRenderer").then((mod) => ({
      default: mod.MarkdownRenderer,
    })),
  {
    loading: () => (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    ),
    ssr: false,
  }
);

const SimpleMarkdownRenderer = dynamic(
  () =>
    import("./SimpleMarkdownRenderer").then((mod) => ({
      default: mod.SimpleMarkdownRenderer,
    })),
  {
    loading: () => (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    ),
    ssr: false,
  }
);

interface SmartMarkdownRendererProps {
  content: string;
  className?: string;
  useSimple?: boolean; // 强制使用简化版本
}

export const SmartMarkdownRenderer: React.FC<SmartMarkdownRendererProps> = ({
  content,
  className,
  useSimple = false,
}) => {
  // 如果强制使用简化版本或者检测到依赖问题，使用简化版本
  if (useSimple) {
    return (
      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        }
      >
        <SimpleMarkdownRenderer content={content} className={className} />
      </Suspense>
    );
  }

  // 尝试使用完整版本
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress size={24} />
        </Box>
      }
    >
      <ErrorBoundary
        fallback={
          <SimpleMarkdownRenderer content={content} className={className} />
        }
      >
        <MarkdownRenderer content={content} className={className} />
      </ErrorBoundary>
    </Suspense>
  );
};

// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.warn(
      "MarkdownRenderer failed, falling back to SimpleMarkdownRenderer:",
      error
    );
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("MarkdownRenderer error details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default SmartMarkdownRenderer;
