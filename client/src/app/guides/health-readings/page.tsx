import type { Metadata } from "next"
import { getAllTarotCards, getTarotCardById } from "@/data/tarotCards"
import {
  groupCardsBySuit,
  extractHealthReading,
  featuredHealthCardIds,
  cautionHealthCardIds,
} from "@/utils/guideHelpers"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ThemeCardSummary } from "@/components/guides/ThemeCardSummary"
import { FAQSection } from "@/components/guides/FAQSection"
import { ResponsiveAd } from "@/components/GoogleAds"
import { getAdSlot } from "@/config/ads"

const baseUrl = "https://wade-through-tarot.vercel.app"

export function generateMetadata(): Metadata {
  return {
    title: "塔羅牌健康解讀指南 - 身心健康占卜攻略",
    description:
      "專業塔羅牌健康解讀指南，詳解78張牌在身體健康、心理狀態與生活習慣方面的提示。了解每張牌的身心能量，掌握塔羅牌對健康的深層指引。",
    keywords: [
      "塔羅牌健康",
      "身心塔羅",
      "健康占卜",
      "塔羅牌身體",
      "塔羅牌心理",
      "塔羅牌健康解讀",
      "塔羅牌生活建議",
      "塔羅牌身心靈",
      "塔羅牌健康正位",
      "塔羅牌健康逆位",
    ],
    openGraph: {
      title: "塔羅牌健康解讀指南 - 身心健康占卜攻略",
      description:
        "專業塔羅牌健康解讀指南，詳解78張牌在身體健康與心理狀態方面的提示與指引。",
      url: `${baseUrl}/guides/health-readings`,
    },
    alternates: {
      canonical: "/guides/health-readings",
    },
  }
}

const faqs = [
  {
    question: "塔羅牌可以診斷疾病嗎？",
    answer:
      "絕對不行。塔羅牌不是醫療診斷工具，無法替代專業醫療人員的判斷。塔羅牌在健康領域的價值在於促進自我覺察——幫助你注意到被忽視的身心訊號、反思生活習慣、關注壓力來源。如有身體不適，請務必尋求專業醫療協助。",
  },
  {
    question: "哪些塔羅牌代表良好的健康狀態？",
    answer:
      "代表良好健康能量的牌包括：星星牌（療癒與希望）、太陽牌（活力與生命力）、節制牌（平衡與調和）、皇后牌（滋養與豐盛）、力量牌（內在力量與韌性）、金幣王牌（新的健康起點）、權杖王牌（充沛的生命能量）。這些牌鼓勵我們關注身心平衡。",
  },
  {
    question: "抽到死神牌或高塔牌代表健康有問題嗎？",
    answer:
      "不必過度驚慌。死神牌在健康中通常代表舊有習慣的結束與新生活方式的開始，例如戒菸、改變飲食等重大轉變。高塔牌可能暗示需要正視已久的健康問題，或是生活模式需要大幅調整。這些牌是提醒，而非預言。重要的是將訊息化為積極的行動。",
  },
  {
    question: "塔羅牌如何幫助改善心理健康？",
    answer:
      "塔羅牌是優秀的自我反思工具。透過每日抽牌練習，可以培養內觀的習慣，注意自己的情緒變化與壓力模式。塔羅牌能幫助你辨識潛意識中的焦慮來源、找到情緒出口、思考自我照顧的方式。但嚴重的心理健康問題仍需專業心理諮商師的協助。",
  },
  {
    question: "四大牌組在健康解讀中各代表什麼？",
    answer:
      "聖杯牌組（水元素）對應情緒健康與心理狀態；金幣牌組（土元素）對應身體健康、飲食與日常作息；寶劍牌組（風元素）對應心智健康、壓力與睡眠品質；權杖牌組（火元素）對應生命活力、運動習慣與精神能量。四種元素的平衡，象徵著全面的身心健康。",
  },
]

function healthExcerpts(data: ReturnType<typeof extractHealthReading>) {
  if (!data) return []
  return [
    { label: "身體健康", text: data.body, color: "text-emerald-300/80" },
    { label: "心理狀態", text: data.mental, color: "text-sky-300/80" },
  ]
}

export default function HealthReadingsPage() {
  const allCards = getAllTarotCards()
  const groups = groupCardsBySuit(allCards)

  const featuredCards = featuredHealthCardIds
    .map((id) => getTarotCardById(id))
    .filter(Boolean)
    .map((card) => extractHealthReading(card!))
    .filter(Boolean) as NonNullable<ReturnType<typeof extractHealthReading>>[]

  const cautionCards = cautionHealthCardIds
    .map((id) => getTarotCardById(id))
    .filter(Boolean)
    .map((card) => extractHealthReading(card!))
    .filter(Boolean) as NonNullable<ReturnType<typeof extractHealthReading>>[]

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "塔羅牌健康解讀指南 - 身心健康占卜攻略",
    description:
      "專業塔羅牌健康解讀指南，詳解78張牌在身體健康與心理狀態方面的提示與指引。",
    url: `${baseUrl}/guides/health-readings`,
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
        name: "健康解讀指南",
        item: `${baseUrl}/guides/health-readings`,
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
              { label: "健康解讀指南", href: "/guides/health-readings" },
            ]}
          />

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-4">
            塔羅牌健康解讀指南
          </h1>
          <p className="text-lg text-purple-200/80 mb-2">
            身心健康占卜攻略
          </p>

          {/* 前言 */}
          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              塔羅牌與身心健康
            </h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              塔羅牌在健康領域的價值不在於診斷疾病，而在於促進身心覺察。每張牌蘊含的能量能幫助我們關注被忽視的身體訊號、反思生活習慣、辨識壓力來源，並找到恢復平衡的方向。將塔羅牌視為一面反映身心狀態的鏡子，而非醫療工具。
            </p>
            <p className="text-slate-300 leading-relaxed">
              四大元素對應著身心健康的不同層面：水（聖杯）象徵情緒與心理健康，土（金幣）代表身體與物質層面的照護，風（寶劍）反映心智與睡眠品質，火（權杖）展現生命活力與行動力。當四元素處於和諧平衡時，便是最佳的身心狀態。以下為你完整解析每張牌在健康方面的提示。
            </p>
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-amber-200/90 text-sm">
                提醒：塔羅牌僅供自我反思參考，不能替代專業醫療建議。如有身體不適，請務必就醫諮詢。
              </p>
            </div>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 正面健康牌 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-purple-200 mb-2">
              代表良好健康能量的牌卡
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              這些牌在健康占卜中出現時，通常帶有療癒、活力與平衡的正面能量。
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCards.map((data) => (
                <ThemeCardSummary
                  key={data.card.id}
                  card={data.card}
                  excerpts={healthExcerpts(data)}
                  variant="featured"
                />
              ))}
            </div>
          </section>

          {/* 需留意的牌 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-purple-200 mb-2">
              健康方面需要留意的牌卡
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              這些牌提醒我們關注身心健康中可能被忽視的面向，是調整生活方式的訊號。
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cautionCards.map((data) => (
                <ThemeCardSummary
                  key={data.card.id}
                  card={data.card}
                  excerpts={healthExcerpts(data)}
                  variant="caution"
                />
              ))}
            </div>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 依牌組分類 */}
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-6">
            依牌組分類的健康解讀
          </h2>

          {groups.map((group, index) => {
            const readings = group.cards
              .map((card) => extractHealthReading(card))
              .filter(Boolean) as NonNullable<
              ReturnType<typeof extractHealthReading>
            >[]

            return (
              <section key={group.suit} className="mb-10">
                <h3 className="text-xl font-semibold text-purple-200 mb-4">
                  {group.title}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {readings.map((data) => (
                    <ThemeCardSummary
                      key={data.card.id}
                      card={data.card}
                      excerpts={healthExcerpts(data)}
                    />
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

          {/* 四元素健康對照 */}
          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-4">
              四大元素與健康對照
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-blue-200 font-medium mb-1">
                  水元素 — 聖杯牌組
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  對應情緒健康與心理狀態。關注情感流動、人際關係對身心的影響，以及內在的情緒平衡。
                </p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="text-green-200 font-medium mb-1">
                  土元素 — 金幣牌組
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  對應身體健康與生活品質。關注飲食營養、運動習慣、睡眠作息，以及物質環境的舒適度。
                </p>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="text-purple-200 font-medium mb-1">
                  風元素 — 寶劍牌組
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  對應心智健康與思維模式。關注壓力管理、思慮過度、焦慮傾向，以及理性與感性的平衡。
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h3 className="text-red-200 font-medium mb-1">
                  火元素 — 權杖牌組
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  對應生命活力與精神能量。關注動力來源、熱情消耗、過勞傾向，以及日常運動與活動量。
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
