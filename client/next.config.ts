import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 圖片優化配置
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // 壓縮配置
  compress: true,

  // 實驗性功能
  experimental: {
    optimizeCss: false, // 暫時關閉以避免 critters 問題
  },

  // 重定向配置
  async redirects() {
    return [
      {
        source: "/tarot",
        destination: "/",
        permanent: true,
      },
      {
        source: "/reading",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // 標頭配置
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/cards/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // 環境變數
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // 輸出配置
  output: "standalone",

  // 類型檢查
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint 配置
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
