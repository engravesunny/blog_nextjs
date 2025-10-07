"use client";

import { Box, Card, CardMedia, styled, Typography } from "@mui/material";

export const GradientBackgroundHomeHeader = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

export const GradientBackgroundPostCard = styled(Card)(({ theme }) => ({
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));
export const GradientBackgroundPostCardMedia = styled(CardMedia)(
  ({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  })
);
export const GradientBackgroundPostCardBox = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
}));
