import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "塔羅牌圖鑑 - 78張偉特塔羅牌完整解析",
  description:
    "瀏覽完整的78張偉特塔羅牌圖鑑，包含22張大阿爾克納和56張小阿爾克納。每張牌都有詳細的正逆位解釋、關鍵詞、象徵意義和實用建議。立即探索塔羅牌的奧秘！",
  keywords: [
    "塔羅牌圖鑑",
    "偉特塔羅牌",
    "78張塔羅牌",
    "大阿爾克納",
    "小阿爾克納",
    "塔羅牌意義",
    "塔羅牌解析",
    "正位含義",
    "逆位含義",
    "聖杯牌組",
    "金幣牌組",
    "寶劍牌組",
    "權杖牌組",
  ],
  openGraph: {
    title: "塔羅牌圖鑑 - 78張偉特塔羅牌完整解析",
    description:
      "瀏覽完整的78張偉特塔羅牌圖鑑，包含22張大阿爾克納和56張小阿爾克納。每張牌都有詳細的正逆位解釋。",
    url: "https://wade-through-tarot.vercel.app/cards",
  },
  alternates: {
    canonical: "/cards",
  },
};

export default function CardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
