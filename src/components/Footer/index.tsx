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
  useTheme,
} from "@mui/material";
import {
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { Icons } from "@/components/icons";

export function Footer() {
  const theme = useTheme();

  const socialLinks = [
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
    { icon: GitHubIcon, href: "#", label: "GitHub" },
  ];

  const quickLinks = [
    { label: "首页", href: "/" },
    { label: "最新文章", href: "#" },
    { label: "热门文章", href: "#" },
    { label: "关于我", href: "#" },
    { label: "联系方式", href: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "grey.800",
        color: "common.white",
        py: { xs: 6, md: 8 },
        mt: { xs: 10, md: 15 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
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
                  color: "grey.400",
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
                        color: "grey.400",
                        "&:hover": {
                          color: "common.white",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
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
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "common.white",
              }}
            >
              快速链接
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Typography
                  key={link.href}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: "grey.400",
                    textDecoration: "none",
                    "&:hover": {
                      color: "common.white",
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
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "common.white",
              }}
            >
              订阅更新
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "grey.400",
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
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "common.white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                    opacity: 1,
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
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: "grey.400",
              fontSize: "0.875rem",
            }}
          >
            © {new Date().getFullYear()} 我的博客. 保留所有权利.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
