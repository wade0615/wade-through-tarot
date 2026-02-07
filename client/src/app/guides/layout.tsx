import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | 塔羅牌指南",
    default: "塔羅牌指南 - 正位逆位意義、愛情事業健康解析",
  },
  description:
    "完整的塔羅牌指南，涵蓋78張牌正位與逆位意義大全、愛情解讀、事業建議、健康指引。從大阿爾克納到小阿爾克納，一次掌握所有塔羅牌的核心含義。",
  keywords: [
    "塔羅牌指南",
    "塔羅牌正位",
    "塔羅牌逆位",
    "塔羅牌意義",
    "塔羅牌解析",
    "塔羅牌愛情",
    "塔羅牌事業",
    "塔羅牌健康",
    "78張塔羅牌",
  ],
  openGraph: {
    title: "塔羅牌指南 - 正位逆位意義、愛情事業健康解析",
    description:
      "完整的塔羅牌指南，涵蓋78張牌正位與逆位意義大全、愛情解讀、事業建議、健康指引。",
    url: "https://wade-through-tarot.vercel.app/guides",
  },
  alternates: {
    canonical: "/guides",
  },
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
