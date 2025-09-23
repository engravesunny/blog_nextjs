/**
 * MUI 主题类型扩展
 * 添加自定义的调色板 tokens 和字体配置
 */

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    postBackground: string;
    postCover: string;
  }

  interface PaletteOptions {
    postBackground?: string;
    postCover?: string;
  }

  interface TypographyVariants {
    fontFamilyMonospace: string;
  }

  interface TypographyVariantsOptions {
    fontFamilyMonospace?: string;
  }
}
