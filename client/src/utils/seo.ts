import { TarotCard } from "@/data/tarotCards"

const suitNames: Record<TarotCard["suit"], string> = {
  major: "大阿爾克納",
  cups: "聖杯",
  pentacles: "金幣",
  swords: "寶劍",
  wands: "權杖",
}

/**
 * 從文案中提取指定【標籤】的段落內容
 */
export function extractSegment(text: string, marker: string): string {
  const regex = new RegExp(`【${marker}】([^【]*)`)
  const match = text.match(regex)
  return match ? match[1].trim() : ""
}

/**
 * 動態組合 SEO description
 */
export function generateCardSEODescription(card: TarotCard): string {
  const uprightSummary = card.meaning.upright.slice(0, 3).join("、")
  let desc = `${card.name}塔羅牌正位代表${uprightSummary}。`

  if (card.deepAnalysis?.loveReading) {
    const loveUpright = extractSegment(card.deepAnalysis.loveReading, "正位")
    if (loveUpright) {
      desc += `愛情方面：${loveUpright.substring(0, 60)}...`
    }
  }

  desc += `完整解析${card.name}在愛情、事業、健康的正位與逆位解讀。`
  return desc.substring(0, 160)
}

/**
 * 產生完整 SEO 關鍵字陣列
 */
export function generateCardSEOKeywords(card: TarotCard): string[] {
  const suit = suitNames[card.suit]
  const name = card.name

  return [
    name,
    card.nameEn,
    `${name}塔羅`,
    `${name}塔羅牌`,
    `${name}愛情`,
    `${name}愛情正位`,
    `${name}愛情逆位`,
    `${name}事業`,
    `${name}事業正位`,
    `${name}事業逆位`,
    `${name}健康`,
    `${name}正位`,
    `${name}逆位`,
    `${name}解析`,
    "塔羅牌",
    suit,
    "塔羅占卜",
    "塔羅解析",
    ...card.keywords,
  ]
}

/**
 * 產生 FAQPage JSON-LD
 */
export function generateFAQSchema(card: TarotCard) {
  const faqs: { question: string; answer: string }[] = []

  if (card.deepAnalysis?.loveReading) {
    const upright = extractSegment(card.deepAnalysis.loveReading, "正位")
    if (upright) {
      faqs.push({
        question: `${card.name}在愛情中正位代表什麼？`,
        answer: upright,
      })
    }
    const reversed = extractSegment(card.deepAnalysis.loveReading, "逆位")
    if (reversed) {
      faqs.push({
        question: `${card.name}在愛情中逆位代表什麼？`,
        answer: reversed,
      })
    }
  }

  if (card.deepAnalysis?.careerReading) {
    const upright = extractSegment(card.deepAnalysis.careerReading, "正位")
    if (upright) {
      faqs.push({
        question: `${card.name}在事業中正位代表什麼？`,
        answer: upright,
      })
    }
    const reversed = extractSegment(card.deepAnalysis.careerReading, "逆位")
    if (reversed) {
      faqs.push({
        question: `${card.name}在事業中逆位代表什麼？`,
        answer: reversed,
      })
    }
  }

  if (card.deepAnalysis?.healthReading) {
    const body = extractSegment(card.deepAnalysis.healthReading, "身體")
    const mental = extractSegment(card.deepAnalysis.healthReading, "心理")
    if (body || mental) {
      faqs.push({
        question: `${card.name}在健康中代表什麼？`,
        answer: [body, mental].filter(Boolean).join(" "),
      })
    }
  }

  if (card.keywords.length > 0) {
    faqs.push({
      question: `${card.name}核心關鍵詞有哪些？`,
      answer: `${card.name}的核心關鍵詞包括：${card.keywords.join("、")}。正位含義為${card.meaning.upright.join("、")}；逆位含義為${card.meaning.reversed.join("、")}。`,
    })
  }

  if (faqs.length === 0) return null

  return {
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
}

/**
 * 產生 BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(card: TarotCard) {
  const suit = suitNames[card.suit]
  const baseUrl = "https://wade-through-tarot.vercel.app"

  return {
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
        name: "塔羅牌圖鑑",
        item: `${baseUrl}/cards`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: suit,
        item: `${baseUrl}/cards#${card.suit}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: card.name,
        item: `${baseUrl}/cards/${card.id}`,
      },
    ],
  }
}
