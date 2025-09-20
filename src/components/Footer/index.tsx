"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { Icons } from "@/components/icons";

export function Footer() {
  const socialLinks = [
    { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: GitHubIcon, href: "https://github.com", label: "GitHub" },
  ];

  const quickLinks = [
    { label: "首页", href: "/" },
    { label: "最新文章", href: "/posts/latest" },
    { label: "热门文章", href: "/posts/popular" },
    { label: "关于我", href: "/about" },
    { label: "联系方式", href: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        py: { xs: 6, md: 8 },
        mt: { xs: 10, md: 15 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Icons.Logo
                  sx={{
                    height: 24,
                    width: 24,
                    color: "primary.light",
                    mr: 1,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  我的博客
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                分享知识、记录生活、思考未来
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <IconButton
                      key={social.label}
                      component={Link}
                      href={social.href}
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "text.primary",
                          backgroundColor: "action.hover",
                        },
                        transition: "all 0.2s ease",
                      }}
                      aria-label={social.label}
                    >
                      <IconComponent fontSize="small" />
                    </IconButton>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "text.primary",
              }}
            >
              快速链接
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      color: "text.primary",
                    },
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "text.primary",
              }}
            >
              订阅更新
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              输入您的邮箱，获取最新文章更新
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                type="email"
                placeholder="您的邮箱地址"
                variant="outlined"
                size="small"
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "action.hover",
                    color: "text.primary",
                    "& fieldset": {
                      borderColor: "divider",
                    },
                    "&:hover fieldset": {
                      borderColor: "text.secondary",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "text.secondary",
                    opacity: 0.7,
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                订阅
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: { xs: 4, md: 6 },
            borderColor: "divider",
          }}
        />

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            © {new Date().getFullYear()} 我的博客. 保留所有权利.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
