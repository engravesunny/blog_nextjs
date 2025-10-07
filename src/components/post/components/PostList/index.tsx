"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { PostCard } from "../PostCard";
import { Article as ArticleIcon } from "@mui/icons-material";
import { useStore } from "@/store/StoreProvider";
export const PostList = () => {
  const store = useStore();
  const filteredPosts = store.getState().getFilteredPosts();
  const selectedTags = store.use.postState.selectedTags;
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    store.getState().setSelectedTags(newTags);
  };
  return filteredPosts.length > 0 ? (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: { xs: 2, md: 3 },
        mb: 6,
      }}
    >
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} handleTagToggle={handleTagToggle} />
      ))}
    </Box>
  ) : (
    <Card sx={{ textAlign: "center", py: 8, borderRadius: 3 }}>
      <CardContent>
        <ArticleIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          没有找到文章
        </Typography>
        <Typography variant="body2" color="text.secondary">
          尝试调整搜索条件或筛选选项
        </Typography>
      </CardContent>
    </Card>
  );
};
