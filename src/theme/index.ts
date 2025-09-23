import { createTheme, ThemeOptions } from "@mui/material/styles";
import "./types"; // 导入类型扩展

// 定义颜色 tokens
const colorTokens = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
};

// 基础主题配置
const baseTheme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 8, // 8px 基础间距单位
  shape: {
    borderRadius: 12, // 统一圆角
  },
  typography: {
    fontFamily: [
      // 可爱的中文字体
      '"LXGW WenKai"', // 霞鹜文楷 - 优雅的手写风格
      '"Ma Shan Zheng"', // 马善政毛笔楷书 - 可爱的中文字体
      '"Zhi Mang Xing"', // 志芒星 - 手写风格中文字体
      '"Liu Jian Mao Cao"', // 刘建毛草 - 草书风格

      // 可爱的英文字体
      '"Comfortaa"', // 圆润可爱的几何字体
      '"Nunito"', // 友好圆润的无衬线字体
      '"Poppins"', // 现代几何字体
      '"Quicksand"', // 友好的无衬线字体
      '"Fredoka One"', // 可爱的圆润字体

      // 系统字体回退
      '"PingFang SC"', // macOS 中文字体
      '"Hiragino Sans GB"', // macOS 中文字体
      '"Microsoft YaHei"', // Windows 中文字体
      '"WenQuanYi Micro Hei"', // Linux 中文字体

      // 英文系统字体回退
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",

      // Emoji 字体
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    // 代码字体配置 - 使用更现代的等宽字体
    fontFamilyMonospace: [
      '"Fira Code"',
      '"JetBrains Mono"',
      '"Cascadia Code"',
      '"SF Mono"',
      '"Monaco"',
      '"Inconsolata"',
      '"Roboto Mono"',
      '"Source Code Pro"',
      '"Menlo"',
      '"DejaVu Sans Mono"',
      '"Courier New"',
      "monospace",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600, // 稍微减轻字重，更可爱
      lineHeight: 1.3,
      letterSpacing: "0.5px",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0.3px",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500, // 更轻的字重
      lineHeight: 1.5,
      letterSpacing: "0.3px",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.2px",
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.2px",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.2px",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7, // 更舒适的行高
      letterSpacing: "0.3px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      letterSpacing: "0.2px",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 500,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

// 亮色主题
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: colorTokens.primary[600],
      light: colorTokens.primary[400],
      dark: colorTokens.primary[800],
      contrastText: colorTokens.secondary[50],
    },
    secondary: {
      main: colorTokens.secondary[600],
      light: colorTokens.secondary[400],
      dark: colorTokens.secondary[800],
      contrastText: colorTokens.secondary[50],
    },
    success: {
      main: colorTokens.success[600],
      light: colorTokens.success[400],
      dark: colorTokens.success[800],
      contrastText: colorTokens.secondary[50],
    },
    warning: {
      main: colorTokens.warning[600],
      light: colorTokens.warning[400],
      dark: colorTokens.warning[800],
      contrastText: colorTokens.secondary[50],
    },
    error: {
      main: colorTokens.error[600],
      light: colorTokens.error[400],
      dark: colorTokens.error[800],
      contrastText: colorTokens.secondary[50],
    },
    background: {
      default: colorTokens.secondary[50],
      paper: colorTokens.secondary[50],
    },
    // 自定义背景 tokens
    postBackground: `linear-gradient(to bottom, ${colorTokens.secondary[50]}, ${colorTokens.secondary[100]})`,
    postCover: `linear-gradient(135deg, ${colorTokens.primary[600]} 0%, ${colorTokens.secondary[600]} 100%)`,
    text: {
      primary: colorTokens.secondary[900],
      secondary: colorTokens.secondary[600],
    },
    divider: colorTokens.secondary[200],
    grey: colorTokens.secondary,
  },
});

// 暗色主题
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: colorTokens.primary[400],
      light: colorTokens.primary[300],
      dark: colorTokens.primary[600],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colorTokens.secondary[400],
      light: colorTokens.secondary[300],
      dark: colorTokens.secondary[600],
      contrastText: "#ffffff",
    },
    success: {
      main: colorTokens.success[400],
      light: colorTokens.success[300],
      dark: colorTokens.success[600],
      contrastText: "#ffffff",
    },
    warning: {
      main: colorTokens.warning[400],
      light: colorTokens.warning[300],
      dark: colorTokens.warning[600],
      contrastText: "#ffffff",
    },
    error: {
      main: colorTokens.error[400],
      light: colorTokens.error[300],
      dark: colorTokens.error[600],
      contrastText: "#ffffff",
    },
    background: {
      default: colorTokens.secondary[900],
      paper: colorTokens.secondary[800],
    },
    // 自定义背景 tokens
    postBackground: `linear-gradient(to bottom, ${colorTokens.secondary[900]}, ${colorTokens.secondary[800]})`,
    postCover: `linear-gradient(135deg, ${colorTokens.primary[400]} 0%, ${colorTokens.secondary[400]} 100%)`,
    text: {
      primary: colorTokens.secondary[50],
      secondary: colorTokens.secondary[300],
    },
    divider: colorTokens.secondary[700],
    grey: {
      50: colorTokens.secondary[900],
      100: colorTokens.secondary[800],
      200: colorTokens.secondary[700],
      300: colorTokens.secondary[600],
      400: colorTokens.secondary[500],
      500: colorTokens.secondary[400],
      600: colorTokens.secondary[300],
      700: colorTokens.secondary[200],
      800: colorTokens.secondary[100],
      900: colorTokens.secondary[50],
    },
  },
});

export { colorTokens };
