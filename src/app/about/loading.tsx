import {
  SkeletonHeading,
  SkeletonText,
  Skeleton,
} from "@/components/ui/Skeleton";
import { Box, Container, Grid } from "@mui/material";
export default function Loading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* 返回按钮骨架 */}
        <Skeleton sx={{ height: 24, width: 80, mb: 4 }} />

        {/* 主要内容骨架 */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            boxShadow: 1,
            border: 1,
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          {/* 头部横幅骨架 */}
          <Box
            sx={{
              px: { xs: 4, md: 8 },
              py: { xs: 6, md: 12 },
              color: "white",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Skeleton
                sx={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  mx: "auto",
                  mb: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
              />
              <Skeleton
                sx={{
                  height: 40,
                  width: 256,
                  mx: "auto",
                  mb: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
              />
              <Skeleton
                sx={{
                  height: 24,
                  width: 384,
                  mx: "auto",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
              />
            </Box>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* 博客介绍骨架 */}
            <section className="mb-12">
              <SkeletonHeading className="w-32 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <SkeletonText />
                    <SkeletonText className="w-5/6" />
                  </div>
                ))}
              </div>
            </section>

            {/* 技术栈骨架 */}
            <section className="mb-12">
              <SkeletonHeading className="w-24 mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <Skeleton className="w-12 h-12 rounded-lg mb-3" />
                    <SkeletonText className="w-16" />
                  </div>
                ))}
              </div>
            </section>

            {/* 联系方式骨架 */}
            <section className="mb-12">
              <SkeletonHeading className="w-24 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-20 mb-2" />
                      <SkeletonText className="w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 博客统计骨架 */}
            <section>
              <SkeletonHeading className="w-24 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <Skeleton className="h-10 w-12 mx-auto mb-2" />
                    <SkeletonText className="w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </section>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
