import { IPost } from "@/store/post";
import Link from "next/link";
import { Box, CardContent, Chip, Typography } from "@mui/material";
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { LikeButton } from "./LikeButton";
import { ReadMoreButton } from "./ReadMoreButton";
import {
  GradientBackgroundPostCard,
  GradientBackgroundPostCardBox,
  GradientBackgroundPostCardMedia,
} from "@/components/StyledComponent";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const PostCard = ({
  post,
  handleTagToggle,
}: {
  post: IPost;
  handleTagToggle: any;
}) => (
  <GradientBackgroundPostCard
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
      borderRadius: 3,
      overflow: "hidden",
    }}
  >
    {post.coverImage && (
      <GradientBackgroundPostCardMedia
        sx={{
          height: 200,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          p: 2,
        }}
      >
        <Chip
          label={post.category}
          size="small"
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
            fontWeight: 500,
            opacity: 0.9,
          }}
        />
      </GradientBackgroundPostCardMedia>
    )}

    <CardContent sx={{ flexGrow: 1, p: 3 }}>
      {/* Meta Information */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {post.author}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {formatDate(post.createdAt)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {post.readTime} 分钟阅读
          </Typography>
        </Box>
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        component={Link}
        href={`/post/${post.id}`}
        sx={{
          fontWeight: 600,
          color: "text.primary",
          textDecoration: "none",
          display: "block",
          mb: 2,
          "&:hover": {
            color: "primary.main",
          },
          transition: "color 0.2s ease",
        }}
      >
        {post.title}
      </Typography>

      {/* Excerpt */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.6,
        }}
      >
        {post.excerpt || post.body}
      </Typography>

      {/* Tags */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {post.tags.map((tag, index) => (
          <Chip
            key={index}
            label={`#${tag}`}
            size="small"
            variant="outlined"
            onClick={() => handleTagToggle(tag)}
            sx={{
              fontSize: "0.75rem",
              height: 24,
              cursor: "pointer",
              borderColor: "divider",
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "action.hover",
                borderColor: "primary.main",
                color: "primary.main",
              },
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </Box>
      <GradientBackgroundPostCardBox
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <LikeButton post={post} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VisibilityIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {post.views}
            </Typography>
          </Box>
        </Box>
        <ReadMoreButton post={post} />
      </GradientBackgroundPostCardBox>
    </CardContent>
  </GradientBackgroundPostCard>
);
