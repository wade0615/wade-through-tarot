type ThemeSlug =
  | "upright-meanings"
  | "reversed-meanings"
  | "love-readings"
  | "career-readings"
  | "health-readings"

interface FAQItem {
  question: string
  answer: string
}

interface Props {
  cardName: string
  theme: ThemeSlug
  detailText: string
}

export function CardThemeFAQ({ cardName, theme, detailText }: Props) {
  const faqItems = buildFAQItems(cardName, theme, detailText)

  if (faqItems.length === 0) return null

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
  )
}

function buildFAQItems(
  cardName: string,
  theme: ThemeSlug,
  detailText: string
): FAQItem[] {
  const faqs: FAQItem[] = []

  switch (theme) {
    case "upright-meanings":
      faqs.push({
        question: `${cardName}正位代表什麼意義？`,
        answer: detailText.substring(0, 200) + "...",
      })
      faqs.push({
        question: `${cardName}正位出現時該怎麼做？`,
        answer: `當${cardName}正位出現在牌陣中，建議順應牌面的正向能量，把握當前的機遇與指引。`,
      })
      break
    case "reversed-meanings":
      faqs.push({
        question: `${cardName}逆位代表什麼意義？`,
        answer: detailText.substring(0, 200) + "...",
      })
      faqs.push({
        question: `${cardName}逆位出現時該如何調整？`,
        answer: `當${cardName}逆位出現，提醒你留意能量的失衡或阻塞，反思當前的狀態並做出適當的調整。`,
      })
      break
    case "love-readings": {
      const loveUpright = extractSegment(detailText, "正位愛情")
      if (loveUpright)
        faqs.push({
          question: `${cardName}在愛情中正位代表什麼？`,
          answer: loveUpright,
        })
      const loveReversed = extractSegment(detailText, "逆位愛情")
      if (loveReversed)
        faqs.push({
          question: `${cardName}在愛情中逆位代表什麼？`,
          answer: loveReversed,
        })
      const single = extractSegment(detailText, "單身者")
      if (single)
        faqs.push({
          question: `${cardName}對單身者有什麼建議？`,
          answer: single,
        })
      break
    }
    case "career-readings": {
      const careerUpright = extractSegment(detailText, "正位事業")
      if (careerUpright)
        faqs.push({
          question: `${cardName}在事業中正位代表什麼？`,
          answer: careerUpright,
        })
      const careerReversed = extractSegment(detailText, "逆位事業")
      if (careerReversed)
        faqs.push({
          question: `${cardName}在事業中逆位代表什麼？`,
          answer: careerReversed,
        })
      break
    }
    case "health-readings": {
      const body = extractSegment(detailText, "身體")
      if (body)
        faqs.push({
          question: `${cardName}在身體健康方面代表什麼？`,
          answer: body,
        })
      const mental = extractSegment(detailText, "心理")
      if (mental)
        faqs.push({
          question: `${cardName}在心理健康方面代表什麼？`,
          answer: mental,
        })
      break
    }
  }

  return faqs
}

function extractSegment(text: string, marker: string): string {
  const regex = new RegExp(`【${marker}】([^【]*)`)
  const match = text.match(regex)
  return match ? match[1].trim() : ""
}
