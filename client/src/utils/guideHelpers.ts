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

// --- 事業解讀 ---

export interface CareerReadingData {
  card: TarotCard
  upright: string
  reversed: string
  jobSeeker: string
  employed: string
  finance: string
}

export function extractCareerReading(
  card: TarotCard
): CareerReadingData | null {
  const text = card.deepAnalysis?.careerReading
  if (!text) return null

  return {
    card,
    upright: extractSegment(text, "正位"),
    reversed: extractSegment(text, "逆位"),
    jobSeeker: extractSegment(text, "求職者"),
    employed: extractSegment(text, "在職者"),
    finance: extractSegment(text, "財務"),
  }
}

/** 事業解讀中最具代表性的牌 */
export const featuredCareerCardIds = [
  "emperor",
  "chariot",
  "wheel-of-fortune",
  "pentacles-ace",
  "pentacles-3",
  "wands-3",
  "sun",
]

/** 事業解讀中需要留意的牌 */
export const cautionCareerCardIds = [
  "tower",
  "swords-10",
  "pentacles-5",
  "moon",
  "hermit",
  "cups-4",
]

// --- 健康解讀 ---

export interface HealthReadingData {
  card: TarotCard
  body: string
  mental: string
  habits: string
  caution: string
}

export function extractHealthReading(
  card: TarotCard
): HealthReadingData | null {
  const text = card.deepAnalysis?.healthReading
  if (!text) return null

  return {
    card,
    body: extractSegment(text, "身體"),
    mental: extractSegment(text, "心理"),
    habits: extractSegment(text, "生活習慣"),
    caution: extractSegment(text, "注意"),
  }
}

/** 健康解讀中最具代表性的牌 */
export const featuredHealthCardIds = [
  "star",
  "sun",
  "temperance",
  "empress",
  "strength",
  "pentacles-ace",
  "wands-ace",
]

/** 健康解讀中需要留意的牌 */
export const cautionHealthCardIds = [
  "tower",
  "moon",
  "devil",
  "swords-10",
  "swords-9",
  "pentacles-5",
]
