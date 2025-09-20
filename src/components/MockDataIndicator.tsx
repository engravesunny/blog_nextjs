/**
 * Mock 数据指示器组件
 * 用于在开发/测试阶段提示用户当前显示的是测试数据
 */

import React from "react";
import {
  Alert,
  AlertTitle,
  Chip,
  Box,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface MockDataIndicatorProps {
  isFromMock: boolean;
  error?: string | null;
  variant?: "banner" | "chip" | "alert";
  onClose?: () => void;
  showDetails?: boolean;
}

export const MockDataIndicator: React.FC<MockDataIndicatorProps> = ({
  isFromMock,
  error,
  variant = "alert",
  onClose,
  showDetails = true,
}) => {
  if (!isFromMock && !error) {
    return null;
  }

  // Chip 变体 - 简洁的标签形式
  if (variant === "chip") {
    return (
      <Chip
        icon={<InfoIcon />}
        label="测试数据"
        size="small"
        color="warning"
        variant="outlined"
        sx={{
          fontSize: "0.75rem",
          "& .MuiChip-icon": {
            fontSize: "0.875rem",
          },
        }}
      />
    );
  }

  // Banner 变体 - 顶部横幅形式
  if (variant === "banner") {
    return (
      <Box
        sx={{
          backgroundColor: "warning.light",
          color: "warning.contrastText",
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          fontSize: "0.875rem",
        }}
      >
        <InfoIcon sx={{ fontSize: "1rem" }} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          当前显示测试数据 - 开发模式
        </Typography>
        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "inherit",
              ml: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    );
  }

  // Alert 变体 - 详细的警告框形式（默认）
  return (
    <Alert
      severity={error ? "warning" : "info"}
      icon={error ? <WarningIcon /> : <InfoIcon />}
      sx={{
        mb: 2,
        borderRadius: 2,
        "& .MuiAlert-message": {
          width: "100%",
        },
      }}
      action={
        onClose && (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )
      }
    >
      <AlertTitle sx={{ fontWeight: 600 }}>
        {error ? "API 连接失败" : "开发模式"}
      </AlertTitle>

      {showDetails && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {error || "当前显示的是测试数据，用于开发和演示目的。"}
          </Typography>

          {isFromMock && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                💡 提示：在生产环境中，这些数据将从真实的 API 获取。
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Alert>
  );
};

// 全局 Mock 数据状态指示器
interface GlobalMockIndicatorProps {
  show: boolean;
  onDismiss: () => void;
}

export const GlobalMockIndicator: React.FC<GlobalMockIndicatorProps> = ({
  show,
  onDismiss,
}) => {
  return (
    <Collapse in={show}>
      <MockDataIndicator
        isFromMock={true}
        variant="banner"
        onClose={onDismiss}
        showDetails={false}
      />
    </Collapse>
  );
};

export default MockDataIndicator;
