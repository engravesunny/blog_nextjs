import { getPostInfo } from "@/api/post";
import { Post } from "@/components/post";
import { SavePostInfo } from "@/components/post/SavePostInfo";
import { Box, Container } from "@mui/material";

export const metadata = {
  title: "首页",
  description:
    "浏览最新的技术文章，包括前端开发、React、Next.js、TypeScript 等技术分享和实践经验。",
  keywords: [
    "技术博客",
    "前端开发",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "编程",
    "Web开发",
  ],
  openGraph: {
    title: "我的技术博客 - 首页",
    description:
      "浏览最新的技术文章，包括前端开发、React、Next.js、TypeScript 等技术分享和实践经验。",
    type: "website",
  },
  twitter: {
    title: "我的技术博客 - 首页",
    description:
      "浏览最新的技术文章，包括前端开发、React、Next.js、TypeScript 等技术分享和实践经验。",
  },
};

export default async function Home() {
  const postInfo = await getPostInfo();
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: "postBackground",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <SavePostInfo postInfo={postInfo.data} />
        <Post postInfo={postInfo.data} />
      </Container>
    </Box>
  );
}
