import {
  SkeletonPostCard,
  SkeletonHeading,
  SkeletonTitle,
  Skeleton,
} from "@/components/ui/Skeleton";
import { Box, Container, Grid } from "@mui/material";

export default function Loading() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: "background.default",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
      >
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
          {/* 页面标题骨架 */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <SkeletonHeading sx={{ width: 256, mx: "auto", mb: 2 }} />
            <SkeletonTitle sx={{ width: 384, mx: "auto" }} />
          </Box>

          {/* 搜索和筛选栏骨架 */}
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 3,
              boxShadow: 1,
              border: 1,
              borderColor: "divider",
              p: 3,
              mb: 4,
            }}
          >
            {/* 搜索框骨架 */}
            <Box sx={{ position: "relative", mb: 2 }}>
              <Skeleton sx={{ height: 48, borderRadius: 2 }} />
            </Box>

            {/* 筛选按钮骨架 */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton sx={{ height: 40, width: 128, borderRadius: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton sx={{ height: 40, width: 128, borderRadius: 2 }} />
                <Skeleton sx={{ height: 40, width: 40, borderRadius: 2 }} />
              </Box>
            </Box>
          </Box>

          {/* 文章网格骨架 */}
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 6 }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid key={index}>
                <SkeletonPostCard />
              </Grid>
            ))}
          </Grid>

          {/* 快速操作按钮骨架 */}
          <Box
            sx={{
              position: "fixed",
              bottom: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
            }}
          >
            <Skeleton sx={{ width: 128, height: 48, borderRadius: 6 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
