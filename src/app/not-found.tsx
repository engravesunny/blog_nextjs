import { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export const metadata: Metadata = {
  title: "页面未找到 - 404",
  description:
    "抱歉，您访问的页面不存在。请检查 URL 是否正确，或返回首页浏览其他内容。",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center" }}>
          {/* 404 大标题 */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", md: "9rem" },
              fontWeight: 700,
              color: "text.disabled",
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          {/* 标题和描述 */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            页面未找到
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              lineHeight: 1.6,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
          </Typography>

          {/* 主要操作按钮 */}
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              mb: 3,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 500,
            }}
          >
            返回首页
          </Button>

          {/* 提示文字 */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            或者尝试以下链接：
          </Typography>

          {/* 快速链接 */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              component={Link}
              href="/about"
              variant="text"
              startIcon={<PersonIcon />}
              sx={{
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              关于我们
            </Button>
            <Button
              component={Link}
              href="/post/new"
              variant="text"
              startIcon={<ArticleIcon />}
              sx={{
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              发布文章
            </Button>
          </Stack>

          {/* 搜索建议卡片 */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 1,
              border: 1,
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SearchIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  寻找特定内容？
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.6 }}
              >
                您可以返回首页使用搜索功能，或浏览我们的文章分类。
              </Typography>

              <Button
                component={Link}
                href="/"
                variant="text"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
                endIcon={<span>→</span>}
              >
                浏览所有文章
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
