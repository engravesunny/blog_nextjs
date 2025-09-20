import { createTheme, ThemeOptions } from "@mui/material/styles";

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
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
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
      contrastText: "#ffffff",
    },
    secondary: {
      main: colorTokens.secondary[600],
      light: colorTokens.secondary[400],
      dark: colorTokens.secondary[800],
      contrastText: "#ffffff",
    },
    success: {
      main: colorTokens.success[600],
      light: colorTokens.success[400],
      dark: colorTokens.success[800],
      contrastText: "#ffffff",
    },
    warning: {
      main: colorTokens.warning[600],
      light: colorTokens.warning[400],
      dark: colorTokens.warning[800],
      contrastText: "#ffffff",
    },
    error: {
      main: colorTokens.error[600],
      light: colorTokens.error[400],
      dark: colorTokens.error[800],
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
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
