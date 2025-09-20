import {
  SkeletonPostDetail,
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
        sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* 返回按钮骨架 */}
        <Skeleton sx={{ height: 24, width: 64, mb: 4 }} />

        {/* 文章详情骨架 */}
        <SkeletonPostDetail />

        {/* 相关文章骨架 */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            boxShadow: 1,
            border: 1,
            borderColor: "divider",
            p: 4,
            mt: 4,
          }}
        >
          <SkeletonHeading sx={{ width: 128, mb: 3 }} />
          <Grid container spacing={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Skeleton sx={{ height: 20, mb: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <SkeletonText />
                    <SkeletonText sx={{ width: "80%" }} />
                    <SkeletonText sx={{ width: "60%" }} />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <SkeletonText sx={{ width: 64 }} />
                    <SkeletonText sx={{ width: 48 }} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
