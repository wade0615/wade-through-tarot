import type { Metadata } from "next"
import { getAllTarotCards } from "@/data/tarotCards"
import { groupCardsBySuit } from "@/utils/guideHelpers"
import { Breadcrumb } from "@/components/Breadcrumb"
import { CardSummaryList } from "@/components/guides/CardSummaryList"
import { FAQSection } from "@/components/guides/FAQSection"
import { ResponsiveAd } from "@/components/GoogleAds"
import { getAdSlot } from "@/config/ads"

const baseUrl = "https://wade-through-tarot.vercel.app"

export function generateMetadata(): Metadata {
  return {
    title: "塔羅牌正位意義大全 - 78張牌完整解析",
    description:
      "完整收錄78張塔羅牌正位意義，包含大阿爾克納與四大牌組。每張牌附正位關鍵詞、意義解析與實用建議，是學習塔羅牌正位解讀的最佳參考。",
    keywords: [
      "塔羅牌正位",
      "正位意義",
      "塔羅牌正位解析",
      "78張塔羅牌正位",
      "大阿爾克納正位",
      "聖杯正位",
      "金幣正位",
      "寶劍正位",
      "權杖正位",
      "塔羅牌意義大全",
    ],
    openGraph: {
      title: "塔羅牌正位意義大全 - 78張牌完整解析",
      description:
        "完整收錄78張塔羅牌正位意義，包含大阿爾克納與四大牌組。每張牌附正位關鍵詞與意義解析。",
      url: `${baseUrl}/guides/upright-meanings`,
    },
    alternates: {
      canonical: "/guides/upright-meanings",
    },
  }
}

const faqs = [
  {
    question: "什麼是塔羅牌的正位？",
    answer:
      "正位是指塔羅牌在占卜時以正面朝上、圖像方向正確的方式出現。正位通常代表該牌最直接、最核心的能量與意義，象徵事情的順利發展或該牌原本的正面特質。",
  },
  {
    question: "正位一定是好的意思嗎？",
    answer:
      "不一定。雖然正位通常代表較為正面的能量，但某些牌即使在正位也可能帶有挑戰性的含義，例如「高塔」正位代表突變與破壞，「死神」正位代表結束與轉變。重要的是結合整體牌陣與問題脈絡來解讀。",
  },
  {
    question: "78張塔羅牌正位有什麼共通的解讀原則？",
    answer:
      "正位的共通原則是：表達該牌最本質的能量。大阿爾克納的正位反映重大人生主題與靈性課題；小阿爾克納的正位則反映日常生活中的具體情境與行動。解讀時應關注牌面的核心象徵意義。",
  },
  {
    question: "如何學習記住每張牌的正位意義？",
    answer:
      "建議從大阿爾克納開始，理解每張牌的故事和象徵意義，而非死背關鍵詞。可以每天抽一張牌，記錄正位含義與當天經歷的連結。四大牌組則可透過元素（水、土、風、火）的特質來輔助記憶。",
  },
]

export default function UprightMeaningsPage() {
  const allCards = getAllTarotCards()
  const groups = groupCardsBySuit(allCards)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "塔羅牌正位意義大全 - 78張牌完整解析",
    description:
      "完整收錄78張塔羅牌正位意義，包含大阿爾克納與四大牌組。每張牌附正位關鍵詞、意義解析與實用建議。",
    url: `${baseUrl}/guides/upright-meanings`,
    publisher: {
      "@type": "Organization",
      name: "涉水塔羅",
      url: baseUrl,
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "塔羅牌指南",
        item: `${baseUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "正位意義大全",
        item: `${baseUrl}/guides/upright-meanings`,
      },
    ],
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd, faqJsonLd]),
        }}
      />
      <main className="min-h-[100dvh] bg-[#0F0F23]">
        <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto py-8 px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "塔羅牌指南", href: "/guides" },
              { label: "正位意義大全", href: "/guides/upright-meanings" },
            ]}
          />

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-4">
            塔羅牌正位意義大全
          </h1>
          <p className="text-lg text-purple-200/80 mb-2">
            78張牌完整解析
          </p>

          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              什麼是正位？
            </h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              在塔羅占卜中，「正位」是指牌面以正確方向出現在占卜者面前。正位代表該牌最核心、最直接的能量展現，通常象徵著事物的順利發展、潛能的自然流動，以及該牌所蘊含的正面特質。
            </p>
            <p className="text-slate-300 leading-relaxed">
              然而，正位並不總是意味著「好」——某些牌如高塔、死神在正位時依然帶有強烈的轉變能量。理解正位意義的關鍵在於掌握每張牌的核心象徵，並結合牌陣位置與問題背景進行綜合解讀。以下為 78 張塔羅牌的正位意義完整彙整。
            </p>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {groups.map((group, index) => (
            <div key={group.suit}>
              <CardSummaryList
                cards={group.cards}
                type="upright"
                suitTitle={group.title}
              />
              {index === 1 && (
                <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />
              )}
            </div>
          ))}

          <FAQSection faqs={faqs} />

          <div className="mt-8">
            <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />
          </div>
        </div>
      </main>
    </>
  )
}
