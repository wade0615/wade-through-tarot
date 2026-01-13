import { Metadata } from "next"
import { getTarotCardById, getAllTarotCards, getRelatedCards } from "@/data/tarotCards"
import { notFound } from "next/navigation"
import CardDetailClient from "./CardDetailClient"

// 生成所有卡牌的靜態路徑
export async function generateStaticParams() {
  const allCards = getAllTarotCards()

  return allCards.map((card) => ({
    id: card.id,
  }))
}

// 動態生成 meta tags
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const card = getTarotCardById(id)

  if (!card) {
    return {
      title: "找不到卡牌 | Wade Through Tarot",
    }
  }

  const suitNames = {
    major: "大阿爾克納",
    cups: "聖杯",
    pentacles: "金幣",
    swords: "寶劍",
    wands: "權杖",
  }

  const title = `${card.name} (${card.nameEn}) | ${suitNames[card.suit]} | Wade Through Tarot`
  const description = `${card.description.substring(0, 150)}... 了解 ${card.name} 的正位與逆位含義、關鍵詞、象徵意義，以及在愛情、事業、健康方面的解讀。`
  const keywords = [
    card.name,
    card.nameEn,
    "塔羅牌",
    suitNames[card.suit],
    "塔羅占卜",
    "塔羅解析",
    ...card.keywords,
  ].join(", ")

  return {
    title,
    description,
    keywords,
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
      canonical: `/cards/${card.id}`,
    },
  }
}

// Server Component
export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const card = getTarotCardById(id)

  if (!card) {
    notFound()
  }

  const suitNames = {
    major: "大阿爾克納",
    cups: "聖杯",
    pentacles: "金幣",
    swords: "寶劍",
    wands: "權杖",
  }

  // 獲取相關卡牌
  const relatedCards = getRelatedCards(card.id)

  // 結構化資料
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${card.name} (${card.nameEn})`,
    image: card.imageUrl,
    description: card.description,
    author: {
      "@type": "Organization",
      name: "Wade Through Tarot",
    },
    publisher: {
      "@type": "Organization",
      name: "Wade Through Tarot",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://wade-through-tarot.vercel.app/cards/${card.id}`,
    },
    keywords: card.keywords.join(", "),
    articleSection: suitNames[card.suit],
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CardDetailClient card={card} relatedCards={relatedCards} />
    </>
  )
}
