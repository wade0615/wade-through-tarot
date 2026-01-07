import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "塔羅教學 - 塔羅牌入門指南與解牌技巧",
  description:
    "學習塔羅牌的基礎知識，包含塔羅牌歷史、牌陣介紹、解牌技巧、占卜流程等。適合初學者入門的完整塔羅教學，從零開始掌握塔羅占卜的奧秘。",
  keywords: [
    "塔羅教學",
    "塔羅牌入門",
    "塔羅新手",
    "解牌技巧",
    "塔羅占卜教學",
    "塔羅牌歷史",
    "塔羅牌陣",
    "塔羅解讀",
    "塔羅學習",
    "占卜教學",
  ],
  openGraph: {
    title: "塔羅教學 - 塔羅牌入門指南與解牌技巧",
    description:
      "學習塔羅牌的基礎知識，包含塔羅牌歷史、牌陣介紹、解牌技巧等。適合初學者入門的完整塔羅教學。",
    url: "https://wade-through-tarot.vercel.app/learn",
  },
  alternates: {
    canonical: "/learn",
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
