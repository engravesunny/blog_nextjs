import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import RootStoreProvider from "@/store/StoreProvider";
import { initState } from "@/store";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Metadata } from "next";
import "@/styles/code-fonts.css";
import "@/styles/cute-fonts.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 我的技术博客",
    default: "我的技术博客 - 分享前端开发经验与见解",
  },
  description:
    "专注于前端开发技术分享，包括 React、Next.js、TypeScript 等现代前端技术的深度解析和实践经验。",
  keywords: [
    "前端开发",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "技术博客",
    "Web开发",
  ],
  authors: [{ name: "博主姓名" }],
  creator: "博主姓名",
  publisher: "我的技术博客",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourdomain.com"), // 替换为你的域名
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yourdomain.com", // 替换为你的域名
    siteName: "我的技术博客",
    title: "我的技术博客 - 分享前端开发经验与见解",
    description:
      "专注于前端开发技术分享，包括 React、Next.js、TypeScript 等现代前端技术的深度解析和实践经验。",
    images: [
      {
        url: "/og-image.jpg", // 需要添加这个图片
        width: 1200,
        height: 630,
        alt: "我的技术博客",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "我的技术博客 - 分享前端开发经验与见解",
    description:
      "专注于前端开发技术分享，包括 React、Next.js、TypeScript 等现代前端技术的深度解析和实践经验。",
    images: ["/og-image.jpg"], // 需要添加这个图片
    creator: "@yourtwitterhandle", // 替换为你的 Twitter 用户名
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // 替换为你的 Google 验证码
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" style={{ fontSize: "18px" }}>
      <body>
        <ThemeProvider>
          <RootStoreProvider initState={initState}>
            <Nav></Nav>
            {children}
            <Footer></Footer>
          </RootStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
