import Link from "next/link"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ResponsiveAd } from "@/components/GoogleAds"
import { getAdSlot } from "@/config/ads"

const baseUrl = "https://wade-through-tarot.vercel.app"

const guides = [
  {
    title: "正位意義大全",
    description:
      "完整收錄 78 張塔羅牌的正位意義，涵蓋大阿爾克納與四大牌組，每張牌附關鍵詞與解析。",
    href: "/guides/upright-meanings",
  },
  {
    title: "逆位意義大全",
    description:
      "深入了解 78 張塔羅牌的逆位含義，掌握逆位的能量轉變、內化與提醒，提升解牌深度。",
    href: "/guides/reversed-meanings",
  },
  {
    title: "愛情塔羅指南",
    description:
      "探索塔羅牌在愛情領域的解讀方式，了解每張牌對感情關係、單身求愛的指引。",
    href: "/guides/love-readings",
  },
  {
    title: "事業塔羅指南",
    description:
      "解析塔羅牌在事業與財務方面的意義，掌握職涯決策、工作挑戰的塔羅智慧。",
    href: "/guides/career-readings",
  },
  {
    title: "健康塔羅指南",
    description:
      "了解塔羅牌在身心健康方面的提示，包含身體健康、心理狀態與生活習慣的指引。",
    href: "/guides/health-readings",
  },
]

export default function GuidesPage() {
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
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-[100dvh] bg-[#0F0F23]">
        <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto py-8 px-4 relative z-10">
          <Breadcrumb items={[{ label: "塔羅牌指南", href: "/guides" }]} />

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-2">
            塔羅牌指南
          </h1>
          <p className="text-purple-200/80 mb-8">
            深入探索塔羅牌的各種主題，從正位逆位意義到愛情、事業、健康的專題解析。
          </p>

          <div className="space-y-4">
            {guides.map((guide) => (
              <Link key={guide.title} href={guide.href} className="block">
                <div className="glass-card p-6 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-purple-100 mb-2">
                        {guide.title}
                      </h2>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {guide.description}
                      </p>
                    </div>
                    <span className="text-amber-400/70 text-sm flex-shrink-0">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />
          </div>
        </div>
      </main>
    </>
  )
}
