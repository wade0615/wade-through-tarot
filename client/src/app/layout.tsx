import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 從環境變數獲取 Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Wade Through Tarot - 線上塔羅占卜 | AI 塔羅抽牌 | 凱爾特十字占卜",
  description:
    "免費線上塔羅占卜，提供單張牌、三張牌、凱爾特十字等多種牌陣。78張偉特塔羅牌完整解析，AI 智能抽牌系統，幫助您找到內心的答案。立即開始您的塔羅占卜之旅！",
  keywords: [
    "塔羅占卜",
    "線上塔羅",
    "AI 塔羅",
    "AI 抽牌",
    "凱爾特十字線上抽牌",
    "偉特塔羅線上抽牌",
    "免費塔羅占卜",
    "塔羅牌解析",
    "塔羅牌陣",
    "塔羅牌圖鑑",
    "塔羅牌意思",
    "塔羅牌正逆位",
    "塔羅牌占卜",
    "塔羅牌教學",
    "塔羅牌歷史",
    "塔羅牌種類",
    "大阿爾卡納",
    "小阿爾卡納",
    "聖杯牌組",
    "金幣牌組",
    "寶劍牌組",
    "權杖牌組",
  ],
  authors: [{ name: "Wade Through Tarot Team" }],
  creator: "Wade Through Tarot",
  publisher: "Wade Through Tarot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wade-through-tarot.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wade Through Tarot - 線上塔羅占卜 | AI 塔羅抽牌",
    description:
      "免費線上塔羅占卜，提供單張牌、三張牌、凱爾特十字等多種牌陣。78張偉特塔羅牌完整解析，AI 智能抽牌系統。",
    url: "https://wade-through-tarot.vercel.app",
    siteName: "Wade Through Tarot",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wade Through Tarot - 線上塔羅占卜",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wade Through Tarot - 線上塔羅占卜 | AI 塔羅抽牌",
    description:
      "免費線上塔羅占卜，提供單張牌、三張牌、凱爾特十字等多種牌陣。78張偉特塔羅牌完整解析。",
    images: ["/og-image.jpg"],
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Wade Through Tarot",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Wade Through Tarot",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        {/* 結構化資料 - 網站 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Wade Through Tarot",
              alternateName: "線上塔羅占卜",
              url: "https://wade-through-tarot.vercel.app",
              description:
                "免費線上塔羅占卜，提供單張牌、三張牌、凱爾特十字等多種牌陣。78張偉特塔羅牌完整解析，AI 智能抽牌系統。",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://wade-through-tarot.vercel.app/cards?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* 結構化資料 - 組織 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Wade Through Tarot",
              url: "https://wade-through-tarot.vercel.app",
              logo: "https://wade-through-tarot.vercel.app/icon-512x512.png",
              description: "專業的線上塔羅占卜平台，提供免費的塔羅牌占卜服務",
              sameAs: ["https://github.com/your-username/wade-through-tarot"],
            }),
          }}
        />

        {/* 結構化資料 - 應用程式 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Wade Through Tarot",
              description:
                "免費線上塔羅占卜應用，提供多種牌陣和完整的塔羅牌解析",
              url: "https://wade-through-tarot.vercel.app",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "TWD",
              },
              featureList: [
                "單張牌占卜",
                "三張牌占卜",
                "凱爾特十字占卜",
                "78張塔羅牌完整解析",
                "正逆位解釋",
                "塔羅牌圖鑑",
                "離線使用",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Google Analytics - 只在生產環境和有 ID 時載入 */}
        {GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        )}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
