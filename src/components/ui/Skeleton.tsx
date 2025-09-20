import { Box, BoxProps } from "@mui/material";

interface SkeletonProps extends Omit<BoxProps, "children"> {
  className?: string;
}

export function Skeleton({ className, sx, ...props }: SkeletonProps) {
  return (
    <Box
      className={className}
      sx={{
        backgroundColor: "action.hover",
        borderRadius: 1,
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "@keyframes pulse": {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
}

// 预定义的骨架组件
export function SkeletonText({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={className}
      sx={{ height: 16, ...props.sx }}
      {...props}
    />
  );
}

export function SkeletonTitle({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={className}
      sx={{ height: 24, ...props.sx }}
      {...props}
    />
  );
}

export function SkeletonHeading({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={className}
      sx={{ height: 32, ...props.sx }}
      {...props}
    />
  );
}

export function SkeletonButton({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={className}
      sx={{ height: 40, width: 96, ...props.sx }}
      {...props}
    />
  );
}

export function SkeletonAvatar({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={className}
      sx={{ height: 48, width: 48, borderRadius: "50%", ...props.sx }}
      {...props}
    />
  );
}

export function SkeletonCard({ className, sx, ...props }: SkeletonProps) {
  return (
    <Box
      className={className}
      sx={{ display: "flex", flexDirection: "column", gap: 3, ...sx }}
      {...props}
    >
      <Skeleton sx={{ height: 200, width: "100%", borderRadius: 3 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Skeleton sx={{ height: 16, width: 250 }} />
        <Skeleton sx={{ height: 16, width: 200 }} />
      </Box>
    </Box>
  );
}

// 文章卡片骨架
export function SkeletonPostCard() {
  return (
    <Box
      component="article"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 3,
        boxShadow: 1,
        border: 1,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      {/* 封面图片骨架 */}
      <Skeleton sx={{ aspectRatio: "16/9", width: "100%" }} />

      <Box sx={{ p: 3 }}>
        {/* 元信息骨架 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
          <SkeletonText sx={{ width: 64 }} />
          <SkeletonText sx={{ width: 80 }} />
          <SkeletonText sx={{ width: 64 }} />
        </Box>

        {/* 标题骨架 */}
        <SkeletonTitle sx={{ mb: 1.5 }} />

        {/* 摘要骨架 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          <SkeletonText />
          <SkeletonText sx={{ width: "75%" }} />
        </Box>

        {/* 标签骨架 */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              sx={{ height: 24, width: 64, borderRadius: 1 }}
            />
          ))}
        </Box>

        {/* 底部操作栏骨架 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SkeletonText sx={{ width: 48 }} />
            <SkeletonText sx={{ width: 48 }} />
          </Box>
          <SkeletonText sx={{ width: 80 }} />
        </Box>
      </Box>
    </Box>
  );
}

// 文章详情骨架
export function SkeletonPostDetail() {
  return (
    <Box
      component="article"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 3,
        boxShadow: 1,
        border: 1,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      {/* 封面图片骨架 */}
      <Skeleton sx={{ aspectRatio: "16/9", width: "100%" }} />

      <Box sx={{ p: 4 }}>
        {/* 分类标签骨架 */}
        <Skeleton sx={{ height: 24, width: 80, borderRadius: 3, mb: 2 }} />

        {/* 标题骨架 */}
        <Box sx={{ mb: 2 }}>
          <SkeletonHeading sx={{ mb: 1 }} />
          <SkeletonHeading sx={{ width: "75%" }} />
        </Box>

        {/* 文章元信息骨架 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 3,
            mb: 4,
            pb: 4,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Skeleton sx={{ height: 16, width: 16 }} />
              <SkeletonText sx={{ width: 64 }} />
            </Box>
          ))}
        </Box>

        {/* 文章内容骨架 */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <SkeletonText />
                <SkeletonText sx={{ width: "83%" }} />
                <SkeletonText sx={{ width: "80%" }} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* 标签骨架 */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              sx={{ height: 24, width: 64, borderRadius: 1 }}
            />
          ))}
        </Box>

        {/* 互动按钮骨架 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            pt: 3,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
        </Box>
      </Box>
    </Box>
  );
}
