import type { Metadata } from "next"
import { getAllTarotCards, getTarotCardById } from "@/data/tarotCards"
import {
  groupCardsBySuit,
  extractLoveReading,
  featuredLoveCardIds,
  cautionLoveCardIds,
} from "@/utils/guideHelpers"
import { Breadcrumb } from "@/components/Breadcrumb"
import { LoveCardSummary } from "@/components/guides/LoveCardSummary"
import { FAQSection } from "@/components/guides/FAQSection"
import { ResponsiveAd } from "@/components/GoogleAds"
import { getAdSlot } from "@/config/ads"

const baseUrl = "https://wade-through-tarot.vercel.app"

export function generateMetadata(): Metadata {
  return {
    title: "塔羅牌愛情解讀指南 - 感情占卜完整攻略",
    description:
      "專業塔羅牌愛情解讀指南，詳解78張牌在感情問題中的正位逆位含義。包含戀人牌、聖杯牌組的愛情解析，以及單身求愛與伴侶關係的實用建議。",
    keywords: [
      "塔羅牌愛情",
      "感情占卜",
      "愛情塔羅",
      "戀愛塔羅",
      "塔羅牌感情解讀",
      "戀人牌愛情",
      "聖杯愛情",
      "塔羅牌愛情正位",
      "塔羅牌愛情逆位",
      "塔羅牌感情",
    ],
    openGraph: {
      title: "塔羅牌愛情解讀指南 - 感情占卜完整攻略",
      description:
        "專業塔羅牌愛情解讀指南，詳解78張牌在感情問題中的正位逆位含義，包含實用建議。",
      url: `${baseUrl}/guides/love-readings`,
    },
    alternates: {
      canonical: "/guides/love-readings",
    },
  }
}

const faqs = [
  {
    question: "抽到死神牌代表感情會結束嗎？",
    answer:
      "不一定。死神牌在愛情中更多代表的是「轉變」而非字面上的結束。正位的死神牌可能意味著一段關係正在經歷深刻的蛻變，例如從曖昧進入正式交往、從熱戀進入穩定期，或者放下舊有的感情模式。逆位則可能暗示抗拒必要的改變。關鍵在於結合牌陣中的其他牌一起解讀。",
  },
  {
    question: "逆位的戀人牌是不是代表分手？",
    answer:
      "逆位的戀人牌不直接等於分手。它更可能代表感情中出現了價值觀的分歧、溝通不順暢、或是面臨一個需要謹慎考量的選擇。它提醒我們需要重新審視關係中的平衡，找回彼此的連結。是否會走向分手，還需要看整體牌陣的訊息。",
  },
  {
    question: "哪些塔羅牌最代表愛情？",
    answer:
      "最具愛情代表性的牌包括：戀人牌（深刻的靈魂連結）、皇后牌（豐盛的愛與滋養）、聖杯王牌（新感情的萌芽）、聖杯二（相互吸引與承諾）、聖杯十（幸福圓滿的家庭）、星星牌（希望與療癒）、太陽牌（快樂與活力）。聖杯牌組整體與情感最為相關。",
  },
  {
    question: "如何解讀感情中的寶劍牌？",
    answer:
      "寶劍牌在愛情中通常代表溝通、思考與挑戰。寶劍牌提醒我們在感情中需要理性與感性的平衡。例如寶劍王牌代表重要的對話或決定，寶劍二代表選擇的猶豫，寶劍三代表心痛但也暗示療癒的開始。寶劍牌並非負面牌，而是提醒我們用清晰的思維面對感情課題。",
  },
  {
    question: "塔羅牌占卜感情準確嗎？",
    answer:
      "塔羅牌是一種自我反思與覺察的工具，而非預測命運的算命術。塔羅牌能夠幫助我們看見感情中潛在的能量與趨勢，提供不同角度的思考。占卜的價值在於啟發內在的智慧，幫助我們更有意識地做出選擇，而非被動等待結果。",
  },
]

export default function LoveReadingsPage() {
  const allCards = getAllTarotCards()
  const groups = groupCardsBySuit(allCards)

  const featuredCards = featuredLoveCardIds
    .map((id) => getTarotCardById(id))
    .filter(Boolean)
    .map((card) => extractLoveReading(card!))
    .filter(Boolean) as NonNullable<ReturnType<typeof extractLoveReading>>[]

  const cautionCards = cautionLoveCardIds
    .map((id) => getTarotCardById(id))
    .filter(Boolean)
    .map((card) => extractLoveReading(card!))
    .filter(Boolean) as NonNullable<ReturnType<typeof extractLoveReading>>[]

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "塔羅牌愛情解讀指南 - 感情占卜完整攻略",
    description:
      "專業塔羅牌愛情解讀指南，詳解78張牌在感情問題中的正位逆位含義，包含實用建議。",
    url: `${baseUrl}/guides/love-readings`,
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
        name: "愛情解讀指南",
        item: `${baseUrl}/guides/love-readings`,
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
              { label: "愛情解讀指南", href: "/guides/love-readings" },
            ]}
          />

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-4">
            塔羅牌愛情解讀指南
          </h1>
          <p className="text-lg text-purple-200/80 mb-2">
            感情占卜完整攻略
          </p>

          {/* 前言 */}
          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              塔羅牌與愛情占卜
            </h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              塔羅牌是探索感情世界的強大工具。無論你正在尋找新的戀情、希望改善現有關係，或是需要釐清感情中的困惑，塔羅牌都能提供深刻的洞察與指引。每張牌都蘊含著關於愛情的獨特訊息，從熱烈的激情到溫柔的陪伴，從心痛的考驗到重生的希望。
            </p>
            <p className="text-slate-300 leading-relaxed">
              在感情解讀中，聖杯牌組與情感最為密切相關，但其他牌組同樣能揭示感情的不同面向——寶劍代表溝通與思考，金幣象徵穩定與承諾，權杖則展現熱情與行動力。大阿爾克納則反映感情中的重大轉折與靈性課題。以下為你完整解析每張牌在愛情中的意義。
            </p>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 最佳愛情牌 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-pink-200 mb-2">
              最具愛情代表性的牌卡
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              這些牌在愛情占卜中出現時，通常帶有強烈的正面情感能量。
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCards.map((data) => (
                <LoveCardSummary
                  key={data.card.id}
                  data={data}
                  variant="featured"
                />
              ))}
            </div>
          </section>

          {/* 需留意的牌 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-purple-200 mb-2">
              愛情中需要留意的牌卡
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              這些牌提醒我們在感情中需要注意的面向，並非代表「壞結果」，而是指出需要關注與調整的方向。
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cautionCards.map((data) => (
                <LoveCardSummary
                  key={data.card.id}
                  data={data}
                  variant="caution"
                />
              ))}
            </div>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 依牌組分類的愛情解讀 */}
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-6">
            依牌組分類的愛情解讀
          </h2>

          {groups.map((group, index) => {
            const loveReadings = group.cards
              .map((card) => extractLoveReading(card))
              .filter(Boolean) as NonNullable<
              ReturnType<typeof extractLoveReading>
            >[]

            return (
              <section key={group.suit} className="mb-10">
                <h3 className="text-xl font-semibold text-purple-200 mb-4">
                  {group.title}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {loveReadings.map((data) => (
                    <LoveCardSummary key={data.card.id} data={data} />
                  ))}
                </div>
                {index === 1 && (
                  <div className="mt-6">
                    <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />
                  </div>
                )}
              </section>
            )
          })}

          {/* 愛情牌陣推薦 */}
          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-4">
              愛情牌陣推薦
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-purple-100 font-medium mb-1">
                  單身求緣三張牌陣
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  三張牌分別代表：目前的感情能量、需要注意的面向、未來的發展方向。適合想了解近期感情運勢的單身者。
                </p>
              </div>
              <div>
                <h3 className="text-purple-100 font-medium mb-1">
                  感情發展五張牌陣
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  五張牌分別代表：你的狀態、對方的狀態、關係的現況、面臨的挑戰、未來的走向。適合已有對象或正在曖昧中的人。
                </p>
              </div>
              <div>
                <h3 className="text-purple-100 font-medium mb-1">
                  關係檢視凱爾特十字
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  經典的十張牌牌陣，能全面解析一段關係的過去、現在與未來，揭示隱藏的影響因素與最終結果。適合需要深度分析感情狀況的人。
                </p>
              </div>
            </div>
          </section>

          <FAQSection faqs={faqs} />

          <div className="mt-8">
            <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />
          </div>
        </div>
      </main>
    </>
  )
}
