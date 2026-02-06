import { TarotCard } from "@/data/tarotCards"
import { extractSegment } from "@/utils/seo"

export const suitOrder: TarotCard["suit"][] = [
  "major",
  "cups",
  "pentacles",
  "swords",
  "wands",
]

export const suitDisplayNames: Record<TarotCard["suit"], string> = {
  major: "大阿爾克納",
  cups: "聖杯牌組",
  pentacles: "金幣牌組",
  swords: "寶劍牌組",
  wands: "權杖牌組",
}

export function groupCardsBySuit(
  cards: TarotCard[]
): { suit: TarotCard["suit"]; title: string; cards: TarotCard[] }[] {
  return suitOrder
    .map((suit) => ({
      suit,
      title: suitDisplayNames[suit],
      cards: cards.filter((card) => card.suit === suit),
    }))
    .filter((group) => group.cards.length > 0)
}

export interface LoveReadingData {
  card: TarotCard
  upright: string
  reversed: string
  single: string
  partner: string
}

export function extractLoveReading(card: TarotCard): LoveReadingData | null {
  const text = card.deepAnalysis?.loveReading
  if (!text) return null

  return {
    card,
    upright: extractSegment(text, "正位"),
    reversed: extractSegment(text, "逆位"),
    single: extractSegment(text, "單身者"),
    partner: extractSegment(text, "有伴侶者"),
  }
}

/** 愛情解讀中最具代表性的牌 */
export const featuredLoveCardIds = [
  "lovers",
  "empress",
  "cups-ace",
  "cups-2",
  "cups-10",
  "star",
  "sun",
]

/** 愛情解讀中需要留意的牌 */
export const cautionLoveCardIds = [
  "swords-3",
  "tower",
  "devil",
  "moon",
  "swords-10",
  "cups-5",
]
