import { GradientBackgroundHomeHeader } from "@/components/StyledComponent";
import { Box, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 }, userSelect: "none" }}>
      <GradientBackgroundHomeHeader
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        🌸 琪宝~琪宝~ 🌸
      </GradientBackgroundHomeHeader>
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
  );
};
