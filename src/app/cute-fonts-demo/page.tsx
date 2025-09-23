"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

export default function CuteFontsDemoPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 页面标题 */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          component="h1"
          className="gradient-text"
          sx={{ mb: 2 }}
        >
          🌸 可爱字体展示 🌸
        </Typography>
        <Typography variant="h6" color="text.secondary">
          体验不同风格的可爱字体效果
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* 中文字体展示 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h4" className="cute-title" gutterBottom>
              🎨 中文字体
            </Typography>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                霞鹜文楷 (LXGW WenKai)
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"LXGW WenKai", serif',
                  fontSize: "1.2rem",
                  lineHeight: 1.8,
                }}
              >
                这是一款优雅的手写风格字体，适合阅读和展示。文字流畅自然，给人温暖的感觉。✨
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                马善政毛笔楷书 (Ma Shan Zheng)
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Ma Shan Zheng", cursive',
                  fontSize: "1.3rem",
                  lineHeight: 1.8,
                }}
              >
                传统毛笔字体，充满艺术气息 🖌️
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                志芒星 (Zhi Mang Xing)
              </Typography>
              <Typography
                className="handwriting"
                sx={{
                  fontSize: "1.2rem",
                }}
              >
                手写风格，随性自然 ✍️
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 英文字体展示 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h4" className="cute-title" gutterBottom>
              🌟 English Fonts
            </Typography>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Comfortaa
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Comfortaa", sans-serif',
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                A rounded, geometric font that feels friendly and approachable.
                Perfect for modern designs! 🎯
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Nunito
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                Well-balanced and highly readable. Great for both headings and
                body text. 📚
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Fredoka One
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Fredoka One", cursive',
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                Playful and bold! 🎪
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Quicksand
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                Clean and friendly sans-serif font ⚡
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 特殊效果展示 */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" className="cute-title" gutterBottom>
              ✨ 特殊效果展示
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 2, height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      className="card-title"
                      gutterBottom
                    >
                      渐变文字
                    </Typography>
                    <Typography className="gradient-text" variant="h5">
                      彩虹般的文字效果
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={2}>
                      使用CSS渐变和动画创建的彩色文字效果
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 2, height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      className="card-title"
                      gutterBottom
                    >
                      阴影效果
                    </Typography>
                    <Typography className="cute-shadow" variant="h5">
                      温柔的阴影
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={2}>
                      粉色调的柔和阴影效果
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 2, height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      className="card-title"
                      gutterBottom
                    >
                      可爱文字
                    </Typography>
                    <Typography className="cute-text" variant="h5">
                      Hello Cute! 你好可爱！
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={2}>
                      专门的可爱字体样式类
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* 按钮和交互元素展示 */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" className="cute-title" gutterBottom>
              🎮 交互元素
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
              <Button variant="contained" color="primary">
                可爱按钮
              </Button>
              <Button variant="outlined" color="secondary">
                轮廓按钮
              </Button>
              <Button variant="text" color="success">
                文字按钮
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              链接效果测试
            </Typography>
            <Typography variant="body1">
              这里有一个{" "}
              <a href="#" style={{ color: "#ff6b6b" }}>
                可爱的链接
              </a>{" "}
              和另一个{" "}
              <a href="#" style={{ color: "#4ecdc4" }}>
                彩色链接
              </a>
              ，鼠标悬停时会有动画效果。
            </Typography>
          </Paper>
        </Grid>

        {/* 使用说明 */}
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
              🎯 如何使用这些字体
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  CSS 类名
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <li>
                    <code>.cute-text</code> - 可爱文字样式
                  </li>
                  <li>
                    <code>.cute-title</code> - 可爱标题样式
                  </li>
                  <li>
                    <code>.handwriting</code> - 手写风格
                  </li>
                  <li>
                    <code>.gradient-text</code> - 渐变文字
                  </li>
                  <li>
                    <code>.cute-shadow</code> - 可爱阴影
                  </li>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  直接使用字体
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <li>LXGW WenKai - 中文主字体</li>
                  <li>Comfortaa - 英文主字体</li>
                  <li>Nunito - 标题字体</li>
                  <li>Quicksand - 按钮字体</li>
                  <li>Fredoka One - 特殊标题</li>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
