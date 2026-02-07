import type { Metadata } from "next"
import { getAllTarotCards, getTarotCardById } from "@/data/tarotCards"
import {
  groupCardsBySuit,
  extractCareerReading,
  featuredCareerCardIds,
  cautionCareerCardIds,
} from "@/utils/guideHelpers"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ThemeCardSummary } from "@/components/guides/ThemeCardSummary"
import { FAQSection } from "@/components/guides/FAQSection"
import { ResponsiveAd } from "@/components/GoogleAds"
import { getAdSlot } from "@/config/ads"

const baseUrl = "https://wade-through-tarot.vercel.app"

export function generateMetadata(): Metadata {
  return {
    title: "塔羅牌事業解讀指南 - 職場占卜完整攻略",
    description:
      "專業塔羅牌事業解讀指南，詳解78張牌在工作、職涯與財務問題中的正位逆位含義。包含求職建議、在職發展與財務規劃的實用指引。",
    keywords: [
      "塔羅牌事業",
      "工作占卜",
      "職場塔羅",
      "事業塔羅",
      "塔羅牌工作解讀",
      "塔羅牌財務",
      "塔羅牌職涯",
      "塔羅牌事業正位",
      "塔羅牌事業逆位",
      "金幣牌事業",
    ],
    openGraph: {
      title: "塔羅牌事業解讀指南 - 職場占卜完整攻略",
      description:
        "專業塔羅牌事業解讀指南，詳解78張牌在工作與財務問題中的正位逆位含義，包含實用建議。",
      url: `${baseUrl}/guides/career-readings`,
    },
    alternates: {
      canonical: "/guides/career-readings",
    },
  }
}

const faqs = [
  {
    question: "塔羅牌可以預測工作升遷嗎？",
    answer:
      "塔羅牌無法直接預測升遷結果，但能揭示目前的職場能量與趨勢。例如皇帝正位可能暗示領導機會即將來臨，金幣三正位可能代表專業能力受到認可。塔羅牌更適合幫助你釐清職涯方向、評估當前狀態，以及發現需要改進的面向，讓你更有意識地為升遷做準備。",
  },
  {
    question: "哪些塔羅牌最代表事業成功？",
    answer:
      "最具事業正面意義的牌包括：皇帝（領導力與權威）、戰車（決心與勝利）、命運之輪（轉機與好運）、金幣王牌（新的財務機會）、金幣三（專業成長）、權杖三（事業擴展）、太陽（成就與光明）。金幣牌組與權杖牌組整體與事業最為相關。",
  },
  {
    question: "抽到高塔牌代表會失業嗎？",
    answer:
      "不一定。高塔牌在事業中代表突如其來的變動與結構性的改變，可能是公司重組、部門調動，或是你自己意識到必須離開不適合的環境。它也可能代表舊有工作模式的崩塌，為更好的發展騰出空間。關鍵在於如何面對變化，而非恐懼變化本身。",
  },
  {
    question: "求職時適合用塔羅牌占卜嗎？",
    answer:
      "塔羅牌可以作為求職過程中的自我反思工具。它能幫助你檢視自己的優勢與盲點、評估不同工作機會的能量、了解面試前需要注意的面向。但最終的求職結果取決於你的準備、能力和行動，塔羅牌是輔助思考的工具而非決策的唯一依據。",
  },
  {
    question: "金幣牌組和權杖牌組在事業中有什麼區別？",
    answer:
      "金幣牌組（土元素）著重於物質層面——薪資、財務穩定、實際成果、長期投資與職業保障。權杖牌組（火元素）則聚焦於動力層面——熱情、創意、企業家精神、職涯願景與行動力。金幣牌強調穩健累積，權杖牌強調開創衝勁，兩者在事業解讀中互相補充。",
  },
]

function careerExcerpts(data: ReturnType<typeof extractCareerReading>) {
  if (!data) return []
  return [
    { label: "正位事業", text: data.upright, color: "text-emerald-300/80" },
    { label: "逆位事業", text: data.reversed, color: "text-amber-300/80" },
  ]
}

export default function CareerReadingsPage() {
  const allCards = getAllTarotCards()
  const groups = groupCardsBySuit(allCards)

  const featuredCards = featuredCareerCardIds
    .map((id) => getTarotCardById(id))
    .filter(Boolean)
    .map((card) => extractCareerReading(card!))
    .filter(Boolean) as NonNullable<ReturnType<typeof extractCareerReading>>[]

  const cautionCards = cautionCareerCardIds
    .map((id) => getTarotCardById(id))
    .filter(Boolean)
    .map((card) => extractCareerReading(card!))
    .filter(Boolean) as NonNullable<ReturnType<typeof extractCareerReading>>[]

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "塔羅牌事業解讀指南 - 職場占卜完整攻略",
    description:
      "專業塔羅牌事業解讀指南，詳解78張牌在工作與財務問題中的正位逆位含義，包含實用建議。",
    url: `${baseUrl}/guides/career-readings`,
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
        name: "事業解讀指南",
        item: `${baseUrl}/guides/career-readings`,
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
              { label: "事業解讀指南", href: "/guides/career-readings" },
            ]}
          />

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-4">
            塔羅牌事業解讀指南
          </h1>
          <p className="text-lg text-purple-200/80 mb-2">
            職場占卜完整攻略
          </p>

          {/* 前言 */}
          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              塔羅牌與事業占卜
            </h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              塔羅牌是探索職涯方向與事業發展的實用工具。無論你正在求職、考慮轉換跑道、面臨工作挑戰，或是想了解財務前景，塔羅牌都能提供獨特的視角與深度的反思。每張牌蘊含的事業能量，幫助你看見職場中潛藏的機會與需要留意的陷阱。
            </p>
            <p className="text-slate-300 leading-relaxed">
              在事業解讀中，金幣牌組與物質成就、財務穩定最為相關；權杖牌組展現熱情與行動力；寶劍牌組反映策略思維與溝通；聖杯牌組則揭示職場中的人際關係與滿足感。大阿爾克納代表職涯中的重大轉折與靈性課題。以下為你完整解析每張牌在事業中的意義。
            </p>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 最佳事業牌 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-purple-200 mb-2">
              最具事業正面意義的牌卡
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              這些牌在事業占卜中出現時，通常帶有強烈的成功與機會能量。
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCards.map((data) => (
                <ThemeCardSummary
                  key={data.card.id}
                  card={data.card}
                  excerpts={careerExcerpts(data)}
                  theme="career-readings"
                  variant="featured"
                />
              ))}
            </div>
          </section>

          {/* 需留意的牌 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-purple-200 mb-2">
              事業中需要留意的牌卡
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              這些牌提醒我們職場中需要注意的面向，包含轉變、挑戰與需要調整的方向。
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cautionCards.map((data) => (
                <ThemeCardSummary
                  key={data.card.id}
                  card={data.card}
                  excerpts={careerExcerpts(data)}
                  theme="career-readings"
                  variant="caution"
                />
              ))}
            </div>
          </section>

          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 依牌組分類 */}
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-6">
            依牌組分類的事業解讀
          </h2>

          {groups.map((group, index) => {
            const readings = group.cards
              .map((card) => extractCareerReading(card))
              .filter(Boolean) as NonNullable<
              ReturnType<typeof extractCareerReading>
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
                      excerpts={careerExcerpts(data)}
                  theme="career-readings"
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

          {/* 事業牌陣推薦 */}
          <section className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-4">
              事業牌陣推薦
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-purple-100 font-medium mb-1">
                  職涯方向三張牌陣
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  三張牌分別代表：目前的職場能量、面臨的核心挑戰、建議的行動方向。適合想了解整體職涯走勢的人。
                </p>
              </div>
              <div>
                <h3 className="text-purple-100 font-medium mb-1">
                  工作選擇五張牌陣
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  五張牌分別代表：選擇 A 的發展、選擇 B 的發展、你的內在需求、外在影響因素、最佳行動建議。適合在兩個工作機會間做抉擇的人。
                </p>
              </div>
              <div>
                <h3 className="text-purple-100 font-medium mb-1">
                  財務規劃四張牌陣
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  四張牌分別代表：目前的財務狀態、收入來源的能量、支出需要注意的面向、長期財務展望。適合想檢視財務健康的人。
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
