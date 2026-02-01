import { Metadata } from "next"
import { getTarotCardById, getAllTarotCards, getRelatedCards } from "@/data/tarotCards"
import { notFound } from "next/navigation"
import CardDetailClient from "./CardDetailClient"
import {
  generateCardSEODescription,
  generateCardSEOKeywords,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/utils/seo"

const suitNames = {
  major: "大阿爾克納",
  cups: "聖杯",
  pentacles: "金幣",
  swords: "寶劍",
  wands: "權杖",
} as const

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

  const title = `${card.name}塔羅牌解析 - 愛情事業健康正位逆位解讀 | ${card.nameEn} | Wade Through Tarot`
  const description = generateCardSEODescription(card)
  const keywords = generateCardSEOKeywords(card).join(", ")

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

  // 獲取相關卡牌
  const relatedCards = getRelatedCards(card.id)

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${card.name} (${card.nameEn}) 塔羅牌完整解析`,
    image: card.imageUrl,
    description: card.description,
    datePublished: "2025-01-01",
    dateModified: "2025-06-01",
    inLanguage: "zh-TW",
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

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = generateBreadcrumbSchema(card)

  // FAQPage JSON-LD
  const faqJsonLd = generateFAQSchema(card)

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* FAQPage JSON-LD */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <CardDetailClient card={card} relatedCards={relatedCards} />
    </>
  )
}
