"use client";

import React, { useState } from "react";
import { useStore } from "@/store/StoreProvider";
import { IPost } from "@/store/post";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Container,
  Collapse,
  Divider,
  Avatar,
  Fab,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Favorite as FavoriteIcon,
  Visibility as VisibilityIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Sort as SortIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";

export const Post = () => {
  const store = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const filteredPosts = store.getState().getFilteredPosts();
  const categories = store.use.postState.categories;
  const allTags = store.use.postState.allTags;
  const searchQuery = store.use.postState.searchQuery;
  const selectedCategory = store.use.postState.selectedCategory;
  const selectedTags = store.use.postState.selectedTags;
  const sortBy = store.use.postState.sortBy;
  const sortOrder = store.use.postState.sortOrder;

  const [showFilters, setShowFilters] = useState(false);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    store.getState().setSelectedTags(newTags);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const PostCard = ({ post }: { post: IPost }) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {post.coverImage && (
        <CardMedia
          sx={{
            height: 200,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
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
        </CardMedia>
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

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              size="small"
              startIcon={<FavoriteIcon />}
              onClick={() => store.getState().likePost(post.id)}
              sx={{
                minWidth: "auto",
                color: "text.secondary",
                "&:hover": {
                  color: "error.main",
                  backgroundColor: "transparent",
                },
              }}
            >
              {post.likes}
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VisibilityIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {post.views}
              </Typography>
            </Box>
          </Box>

          <Button
            component={Link}
            href={`/post/${post.id}`}
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={() => store.getState().incrementViews(post.id)}
            sx={{
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            阅读更多
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ px: 0 }}>
      {/* Page Header */}
      <Box
        sx={{ textAlign: "center", mb: { xs: 6, md: 8 }, userSelect: "none" }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "2rem", md: "3rem" },
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          🌸 琪宝~琪宝~ 🌸
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          分享技术见解，记录学习历程，探索前端世界的无限可能
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="搜索文章标题、内容或标签..."
            value={searchQuery}
            onChange={(e) => store.getState().setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Filter Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              startIcon={<FilterListIcon />}
              endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setShowFilters(!showFilters)}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              筛选选项
            </Button>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={(e) =>
                    store
                      .getState()
                      .setSortBy(e.target.value as "date" | "views" | "likes")
                  }
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="date">按日期排序</MenuItem>
                  <MenuItem value="views">按浏览量排序</MenuItem>
                  <MenuItem value="likes">按点赞数排序</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                onClick={() =>
                  store
                    .getState()
                    .setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                sx={{
                  transform: sortOrder === "desc" ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              >
                <SortIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Filter Options */}
          <Collapse in={showFilters}>
            <Box
              sx={{
                mt: 3,
                pt: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              {/* Categories */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  分类
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Chip
                    label="全部"
                    onClick={() => store.getState().setSelectedCategory("")}
                    color={selectedCategory === "" ? "primary" : "default"}
                    sx={{ borderRadius: 2 }}
                  />
                  {categories.map((category) => (
                    <Chip
                      key={category.id}
                      label={`${category.name} (${category.count})`}
                      onClick={() =>
                        store.getState().setSelectedCategory(category.name)
                      }
                      color={
                        selectedCategory === category.name
                          ? "primary"
                          : "default"
                      }
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Tags */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  标签
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {allTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      onClick={() => handleTagToggle(tag)}
                      color={selectedTags.includes(tag) ? "primary" : "default"}
                      variant={
                        selectedTags.includes(tag) ? "filled" : "outlined"
                      }
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
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
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      ) : (
        <Card sx={{ textAlign: "center", py: 8, borderRadius: 3 }}>
          <CardContent>
            <ArticleIcon
              sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              没有找到文章
            </Typography>
            <Typography variant="body2" color="text.secondary">
              尝试调整搜索条件或筛选选项
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Floating Action Button */}
      <Fab
        component={Link}
        href="/post/new"
        color="primary"
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1000,
        }}
        aria-label="写文章"
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};
