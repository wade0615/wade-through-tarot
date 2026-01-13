import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我們與隱私權政策",
  description:
    "Wade Through Tarot 是一個致力於推廣塔羅文化與自我探索的線上平台。我們重視您的隱私，所有占卜資料僅儲存在您的瀏覽器本地端，不會上傳至伺服器。",
  keywords: [
    "關於我們",
    "隱私權政策",
    "Wade Through Tarot",
    "塔羅平台",
    "隱私保護",
    "資料安全",
    "聯絡我們",
  ],
  openGraph: {
    title: "關於我們與隱私權政策 - Wade Through Tarot",
    description:
      "Wade Through Tarot 是一個致力於推廣塔羅文化與自我探索的線上平台。我們重視您的隱私。",
    url: "https://wade-through-tarot.vercel.app/info",
  },
  alternates: {
    canonical: "/info",
  },
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
