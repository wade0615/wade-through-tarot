import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "占卜記錄 - 我的塔羅占卜歷史",
  description:
    "查看您的塔羅占卜歷史記錄，包含過去的占卜問題、抽到的牌卡、正逆位狀態。最多保存10筆記錄，所有資料儲存在您的瀏覽器本地端，完全保護隱私。",
  openGraph: {
    title: "占卜記錄 - 我的塔羅占卜歷史",
    description:
      "查看您的塔羅占卜歷史記錄，包含過去的占卜問題、抽到的牌卡、正逆位狀態。",
    url: "https://wade-through-tarot.vercel.app/history",
  },
  robots: {
    index: false, // 個人記錄頁面不需要被索引
    follow: true,
  },
  alternates: {
    canonical: "/history",
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
