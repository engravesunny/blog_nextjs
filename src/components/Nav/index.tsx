"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTheme as useCustomTheme } from "@/providers/ThemeProvider";
import { Icons } from "@/components/icons";

export const Nav = () => {
  const { isDark, toggleTheme } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: "首页", href: "/" },
    { label: "分类", href: "/categories" },
    { label: "标签", href: "/tags" },
    { label: "关于", href: "/about" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 4,
              userSelect: "none",
            }}
          >
            <Icons.Logo
              sx={{
                height: 32,
                width: 32,
                color: "primary.main",
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                },
                transition: "color 0.2s ease",
              }}
            >
              🌸 琪宝~琪宝~ 🌸
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent",
                  },
                  transition: "color 0.2s ease",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right side buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Search button */}
            <IconButton
              size="medium"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* Theme toggle button */}
            <IconButton
              onClick={toggleTheme}
              size="medium"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Write button - Desktop */}
            <Button
              component={Link}
              href="/post/new"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 500,
              }}
            >
              写文章
            </Button>

            {/* Mobile menu button */}
            <IconButton
              onClick={toggleMobileMenu}
              size="medium"
              sx={{
                display: { xs: "flex", md: "none" },
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navigationItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 500,
                        color: "text.primary",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Button
            component={Link}
            href="/post/new"
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            onClick={toggleMobileMenu}
            sx={{
              borderRadius: 2,
              py: 1.5,
              fontWeight: 500,
            }}
          >
            写文章
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};
