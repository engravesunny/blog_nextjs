"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/store/StoreProvider";
import { IPost, IComment } from "@/store/post";
import { Icons } from "@/components/icons";
import { usePostContent } from "@/hooks/usePostContent";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface PostDetailClientProps {
  postId: number;
  initialComments: IComment[];
  initialPost: IPost;
}

export function PostDetailClient({
  postId,
  initialComments,
  initialPost,
}: PostDetailClientProps) {
  const store = useStore();
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [newComment, setNewComment] = useState({ author: "", content: "" });

  // 使用 hook 获取最新的文章内容
  const {
    post: latestPost,
    loading: contentLoading,
    error: contentError,
    refetch,
  } = usePostContent(postId);

  // 使用最新的文章内容，如果获取失败则使用初始数据
  const currentPost = latestPost || initialPost;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.author.trim() && newComment.content.trim()) {
      store.getState().addComment({
        postId,
        author: newComment.author,
        content: newComment.content,
      });
      setNewComment({ author: "", content: "" });

      // 重新获取评论
      const postComments = store.use.postState.comments.filter(
        (c) => c.postId === postId
      );
      setComments(postComments);
    }
  };

  const handleLike = () => {
    store.getState().likePost(postId);
    // 增加浏览量
    store.getState().incrementViews(postId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* 点赞按钮和内容刷新 */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          border: 1,
          borderColor: "divider",
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              onClick={handleLike}
              variant="contained"
              startIcon={<FavoriteIcon />}
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
                color: "white",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 500,
                "&:hover": {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.error.dark} 0%, ${theme.palette.error.main} 100%)`,
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease",
              }}
            >
              点赞 ({currentPost.likes})
            </Button>

            {/* 内容刷新按钮 */}
            <Button
              onClick={refetch}
              disabled={contentLoading}
              variant="outlined"
              startIcon={
                contentLoading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RefreshIcon />
                )
              }
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                fontSize: "0.875rem",
                "&:disabled": {
                  opacity: 0.5,
                },
              }}
              title="刷新文章内容"
            >
              刷新内容
            </Button>
          </Stack>

          {/* 内容加载状态和错误提示 */}
          {contentLoading && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                正在获取最新内容...
              </Typography>
            </Box>
          )}

          {contentError && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                {contentError}
              </Alert>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* 评论区 */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          border: 1,
          borderColor: "divider",
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 3,
            }}
          >
            评论 ({comments.length})
          </Typography>

          {/* 评论表单 */}
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 4 }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                placeholder="您的姓名"
                value={newComment.author}
                onChange={(e) =>
                  setNewComment({ ...newComment, author: e.target.value })
                }
                required
                sx={{
                  maxWidth: { xs: "100%", md: "50%" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="写下您的评论..."
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              required
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 500,
              }}
            >
              发表评论
            </Button>
          </Box>

          {/* 评论列表 */}
          <Stack spacing={3}>
            {comments.map((comment, index) => (
              <Box key={comment.id}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      color: "white",
                      fontWeight: 500,
                    }}
                  >
                    {comment.author.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        mb: 0.5,
                      }}
                    >
                      {comment.author}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="time"
                      dateTime={comment.createdAt}
                    >
                      {formatDate(comment.createdAt)}
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    ml: 7,
                    lineHeight: 1.6,
                  }}
                >
                  {comment.content}
                </Typography>

                {index < comments.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}

            {comments.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  暂无评论，快来发表第一条评论吧！
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
