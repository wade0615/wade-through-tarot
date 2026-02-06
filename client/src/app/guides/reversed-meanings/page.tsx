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
    title: "塔羅牌逆位意義大全 - 78張牌完整解析",
    description:
      "完整收錄78張塔羅牌逆位意義，包含大阿爾克納與四大牌組。每張牌附逆位關鍵詞、意義解析與實用建議，深入了解逆位的能量轉變與提醒。",
    keywords: [
      "塔羅牌逆位",
      "逆位意義",
      "塔羅牌逆位解析",
      "78張塔羅牌逆位",
      "大阿爾克納逆位",
      "聖杯逆位",
      "金幣逆位",
      "寶劍逆位",
      "權杖逆位",
      "塔羅牌意義大全",
    ],
    openGraph: {
      title: "塔羅牌逆位意義大全 - 78張牌完整解析",
      description:
        "完整收錄78張塔羅牌逆位意義，包含大阿爾克納與四大牌組。每張牌附逆位關鍵詞與意義解析。",
      url: `${baseUrl}/guides/reversed-meanings`,
    },
    alternates: {
      canonical: "/guides/reversed-meanings",
    },
  }
}

const faqs = [
  {
    question: "什麼是塔羅牌的逆位？",
    answer:
      "逆位是指塔羅牌在占卜時以上下顛倒的方式出現，即圖像方向與正常方向相反。逆位通常代表該牌能量的減弱、延遲、內化或扭曲，提醒我們需要注意的面向。",
  },
  {
    question: "逆位一定是壞的意思嗎？",
    answer:
      "不一定。逆位並非簡單的「相反」或「負面」。它可能代表能量的內化（需要內省）、延遲（時機未到）、減弱（程度較輕），甚至某些牌的逆位反而是正面的，例如「死神」逆位可能代表抗拒必要的改變。應避免將逆位一律視為壞兆頭。",
  },
  {
    question: "占卜時一定要看逆位嗎？",
    answer:
      "不一定，是否使用逆位取決於占卜者的選擇與習慣。有些塔羅師認為逆位能提供更細緻的解讀層次；也有塔羅師認為正位已包含完整的能量光譜，不需要額外使用逆位。初學者可以先從正位開始學習，熟練後再加入逆位。",
  },
  {
    question: "逆位的解讀方法有哪些？",
    answer:
      "常見的逆位解讀方法包括：（1）能量減弱或過度——正位意義的程度變化；（2）內化——能量向內而非向外展現；（3）延遲——正位能量存在但尚未完全顯現；（4）阻塞——正位能量被阻擋需要克服障礙；（5）反面——正位意義的對立面。建議結合直覺與牌陣脈絡綜合判斷。",
  },
]

export default function ReversedMeaningsPage() {
  const allCards = getAllTarotCards()
  const groups = groupCardsBySuit(allCards)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "塔羅牌逆位意義大全 - 78張牌完整解析",
    description:
      "完整收錄78張塔羅牌逆位意義，包含大阿爾克納與四大牌組。每張牌附逆位關鍵詞、意義解析與實用建議。",
    url: `${baseUrl}/guides/reversed-meanings`,
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
        name: "逆位意義大全",
        item: `${baseUrl}/guides/reversed-meanings`,
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
              { label: "逆位意義大全", href: "/guides/reversed-meanings" },
            ]}
          />

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-4">
            塔羅牌逆位意義大全
          </h1>
          <p className="text-lg text-purple-200/80 mb-2">
            78張牌完整解析
          </p>

          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              什麼是逆位？
            </h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              在塔羅占卜中，「逆位」是指牌面以上下顛倒的方向出現。逆位並非簡單地代表正位的「相反」，而是呈現該牌能量的另一個面向——可能是能量的減弱、內化、延遲或扭曲。
            </p>
            <p className="text-slate-300 leading-relaxed">
              逆位提供了更細緻的解讀維度，幫助我們看見潛藏的問題、內在的掙扎，或是尚未成熟的轉變。理解逆位的關鍵在於不將其視為「壞牌」，而是將其當作一面鏡子，照見需要我們關注與調整的面向。以下為 78 張塔羅牌的逆位意義完整彙整。
            </p>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {groups.map((group, index) => (
            <div key={group.suit}>
              <CardSummaryList
                cards={group.cards}
                type="reversed"
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
