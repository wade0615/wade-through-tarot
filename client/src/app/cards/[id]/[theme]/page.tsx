import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTarotCardById, getAllTarotCards } from "@/data/tarotCards"
import { getCardDetail, CardDetail } from "@/data/tarotCardsDetail"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ResponsiveAd } from "@/components/GoogleAds"
import { getAdSlot } from "@/config/ads"
import { formatThemeReadingText } from "@/utils/formatReading"
import { CardThemeHeader } from "@/components/cards/CardThemeHeader"
import { CrossThemeLinks } from "@/components/cards/CrossThemeLinks"
import { CardThemeFAQ } from "@/components/cards/CardThemeFAQ"

// --------------- Theme 設定 ---------------

const VALID_THEMES = [
  "upright-meanings",
  "reversed-meanings",
  "love-readings",
  "career-readings",
  "health-readings",
] as const

type ThemeSlug = (typeof VALID_THEMES)[number]

interface ThemeConfig {
  detailField: keyof CardDetail
  titleSuffix: string
  descTemplate: (name: string) => string
  keywordsSource: "upright" | "reversed" | "fixed"
  fixedKeywords?: string[]
  guideLabel: string
  guideDesc: string
}

const themeConfigMap: Record<ThemeSlug, ThemeConfig> = {
  "upright-meanings": {
    detailField: "uprightDetail",
    titleSuffix: "正位意義",
    descTemplate: (n) =>
      `深入解析${n}正位的完整意義，包含核心能量、日常表現、靈性啟示與行動建議。了解${n}正位在塔羅牌占卜中的指引。`,
    keywordsSource: "upright",
    guideLabel: "塔羅牌正位意義大全",
    guideDesc: "78 張牌正位完整解析",
  },
  "reversed-meanings": {
    detailField: "reversedDetail",
    titleSuffix: "逆位意義",
    descTemplate: (n) =>
      `深入解析${n}逆位的完整意義，包含能量失衡、日常表現、調整建議與搭配牌義。了解${n}逆位在塔羅牌占卜中的提醒。`,
    keywordsSource: "reversed",
    guideLabel: "塔羅牌逆位意義大全",
    guideDesc: "78 張牌逆位完整解析",
  },
  "love-readings": {
    detailField: "loveDetail",
    titleSuffix: "愛情解讀",
    descTemplate: (n) =>
      `${n}愛情塔羅完整解讀：正位愛情、逆位愛情、單身者建議、有伴侶者建議與復合指引。深度了解${n}在感情占卜中的啟示。`,
    keywordsSource: "fixed",
    fixedKeywords: [
      "愛情塔羅",
      "感情占卜",
      "愛情正位",
      "愛情逆位",
      "單身建議",
      "伴侶建議",
      "復合",
      "塔羅愛情解讀",
    ],
    guideLabel: "塔羅牌愛情解讀指南",
    guideDesc: "感情占卜完整攻略",
  },
  "career-readings": {
    detailField: "careerDetail",
    titleSuffix: "事業解讀",
    descTemplate: (n) =>
      `${n}事業塔羅完整解讀：正位事業、逆位事業、求職建議、在職者建議與財務指引。深度了解${n}在職場占卜中的啟示。`,
    keywordsSource: "fixed",
    fixedKeywords: [
      "事業塔羅",
      "職場占卜",
      "事業正位",
      "事業逆位",
      "求職建議",
      "在職建議",
      "創業",
      "財務",
      "塔羅事業解讀",
    ],
    guideLabel: "塔羅牌事業解讀指南",
    guideDesc: "職場占卜完整攻略",
  },
  "health-readings": {
    detailField: "healthDetail",
    titleSuffix: "健康解讀",
    descTemplate: (n) =>
      `${n}健康塔羅完整解讀：身體健康、心理健康、生活習慣建議與壓力管理。深度了解${n}在健康占卜中的啟示。`,
    keywordsSource: "fixed",
    fixedKeywords: [
      "健康塔羅",
      "健康占卜",
      "身體健康",
      "心理健康",
      "生活習慣",
      "壓力管理",
      "塔羅健康解讀",
    ],
    guideLabel: "塔羅牌健康解讀指南",
    guideDesc: "健康占卜完整攻略",
  },
}

const suitNames: Record<string, string> = {
  major: "大阿爾克納",
  cups: "聖杯",
  pentacles: "金幣",
  swords: "寶劍",
  wands: "權杖",
}

const ALL_THEME_LINKS = VALID_THEMES.map((slug) => ({
  slug,
  titleSuffix: themeConfigMap[slug].titleSuffix,
}))

function isValidTheme(theme: string): theme is ThemeSlug {
  return VALID_THEMES.includes(theme as ThemeSlug)
}

// --------------- generateStaticParams ---------------

export async function generateStaticParams() {
  const allCards = getAllTarotCards()
  const params: { id: string; theme: string }[] = []

  for (const card of allCards) {
    for (const theme of VALID_THEMES) {
      params.push({ id: card.id, theme })
    }
  }

  return params
}

// --------------- generateMetadata ---------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; theme: string }>
}): Promise<Metadata> {
  const { id, theme } = await params
  const card = getTarotCardById(id)

  if (!card || !isValidTheme(theme)) {
    return { title: "找不到頁面 | Wade Through Tarot" }
  }

  const config = themeConfigMap[theme]
  const title = `${card.name}${config.titleSuffix} - 完整解析與實用建議 | Wade Through Tarot`
  const description = config.descTemplate(card.name)

  const keywords: string[] = [
    card.name,
    card.nameEn,
    `${card.name}${config.titleSuffix}`,
    `${card.name}塔羅`,
    `${card.name}塔羅牌`,
  ]

  if (config.keywordsSource === "upright") {
    keywords.push(...card.meaning.upright)
  } else if (config.keywordsSource === "reversed") {
    keywords.push(...card.meaning.reversed)
  } else if (config.fixedKeywords) {
    keywords.push(...config.fixedKeywords)
  }

  keywords.push("塔羅牌", "塔羅占卜", suitNames[card.suit])

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: card.imageUrl,
          width: 300,
          height: 500,
          alt: `${card.name} 塔羅牌`,
        },
      ],
      siteName: "Wade Through Tarot",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [card.imageUrl],
    },
    alternates: {
      canonical: `/cards/${id}/${theme}`,
    },
  }
}

// --------------- Page Component ---------------

export default async function ThemePage({
  params,
}: {
  params: Promise<{ id: string; theme: string }>
}) {
  const { id, theme } = await params

  if (!isValidTheme(theme)) {
    notFound()
  }

  const card = getTarotCardById(id)
  if (!card) {
    notFound()
  }

  const detail = getCardDetail(id)
  if (!detail) {
    notFound()
  }

  const config = themeConfigMap[theme]
  const detailText = detail[config.detailField] as string
  const baseUrl = "https://wade-through-tarot.vercel.app"

  // --- JSON-LD: Article ---
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${card.name}${config.titleSuffix} - 完整解析與實用建議`,
    image: card.imageUrl,
    description: config.descTemplate(card.name),
    datePublished: "2025-01-01",
    dateModified: "2025-06-01",
    inLanguage: "zh-TW",
    author: { "@type": "Organization", name: "Wade Through Tarot" },
    publisher: {
      "@type": "Organization",
      name: "Wade Through Tarot",
      logo: { "@type": "ImageObject", url: "/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/cards/${id}/${theme}`,
    },
    articleSection: `${suitNames[card.suit]} - ${config.titleSuffix}`,
  }

  // --- JSON-LD: BreadcrumbList (5 層) ---
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "塔羅牌圖鑑",
        item: `${baseUrl}/cards`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: suitNames[card.suit],
        item: `${baseUrl}/cards#${card.suit}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: card.name,
        item: `${baseUrl}/cards/${id}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: config.titleSuffix,
        item: `${baseUrl}/cards/${id}/${theme}`,
      },
    ],
  }

  // --- 關鍵詞 ---
  const keywordsList = getKeywordsForTheme(card, theme)

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CardThemeFAQ cardName={card.name} theme={theme} detailText={detailText} />

      <div className="min-h-screen bg-[#0F0F23]">
        {/* 背景裝飾 */}
        <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Navigation */}
        <nav className="p-4 relative z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href={`/cards/${id}`}
              className="text-purple-300 hover:text-amber-300 transition-colors duration-200"
            >
              ← 返回{card.name}
            </Link>
            <div className="text-slate-400 text-sm">
              <span className="text-purple-300">{suitNames[card.suit]}</span>
              {card.number !== undefined && (
                <span>
                  {" "}
                  • 編號{" "}
                  <span className="text-amber-400">{card.number}</span>
                </span>
              )}
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "塔羅牌圖鑑", href: "/cards" },
              { label: suitNames[card.suit], href: `/cards#${card.suit}` },
              { label: card.name, href: `/cards/${id}` },
              {
                label: config.titleSuffix,
                href: `/cards/${id}/${theme}`,
              },
            ]}
          />
        </div>

        <article className="max-w-4xl mx-auto p-4 relative z-10">
          {/* 標題區 */}
          <CardThemeHeader
            cardName={card.name}
            cardNameEn={card.nameEn}
            suitName={suitNames[card.suit]}
            number={card.number}
            imageUrl={card.imageUrl}
            titleSuffix={config.titleSuffix}
          />

          {/* 關鍵詞區 */}
          <section className="glass-card p-5 mb-6">
            <h2 className="text-lg font-semibold text-purple-200 mb-3">
              {card.name}
              {config.titleSuffix}關鍵詞
            </h2>
            <div className="flex flex-wrap gap-2">
              {keywordsList.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-200 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          {/* 主內容區 */}
          <section className="glass-card p-6 mb-6">
            <h2 className="text-xl font-semibold text-purple-200 mb-4">
              {card.name}
              {config.titleSuffix}完整解析
            </h2>
            {theme === "upright-meanings" || theme === "reversed-meanings" ? (
              <div className="text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                {detailText.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : (
              formatThemeReadingText(detailText, card.name, theme)
            )}
          </section>

          {/* 廣告 */}
          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 跨主題連結區 */}
          <CrossThemeLinks
            cardId={id}
            cardName={card.name}
            currentTheme={theme}
            themes={ALL_THEME_LINKS}
          />

          {/* 延伸閱讀 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-200 mb-4">
              延伸閱讀
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={`/cards/${id}`}
                className="glass-card-subtle p-4 hover:bg-purple-500/15 hover:border-purple-400/40 transition-all duration-300 block"
              >
                <h3 className="text-purple-100 text-sm font-medium mb-1">
                  {card.name}完整解析
                </h3>
                <p className="text-slate-400 text-xs">
                  查看{card.name}的所有面向與深度分析
                </p>
              </Link>
              <Link
                href={`/guides/${theme}`}
                className="glass-card-subtle p-4 hover:bg-purple-500/15 hover:border-purple-400/40 transition-all duration-300 block"
              >
                <h3 className="text-purple-100 text-sm font-medium mb-1">
                  {config.guideLabel}
                </h3>
                <p className="text-slate-400 text-xs">{config.guideDesc}</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}

// --------------- Helper ---------------

function getKeywordsForTheme(
  card: ReturnType<typeof getTarotCardById> & object,
  theme: ThemeSlug
): string[] {
  const config = themeConfigMap[theme]

  if (config.keywordsSource === "upright") {
    return card.meaning.upright
  }
  if (config.keywordsSource === "reversed") {
    return card.meaning.reversed
  }
  return config.fixedKeywords || card.keywords
}
