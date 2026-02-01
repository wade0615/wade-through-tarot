"use client"

import Image from "next/image"
import Link from "next/link"
import { TarotCard } from "@/data/tarotCards"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ResponsiveAd } from "@/components/GoogleAds"
import { getAdSlot } from "@/config/ads"

interface Props {
  card: TarotCard
  relatedCards: TarotCard[]
}

function formatReadingText(text: string) {
  const segments = text.split(/(?=【)/).filter(Boolean)
  if (segments.length <= 1) {
    return <p className="text-slate-300 leading-relaxed">{text}</p>
  }
  return (
    <div className="space-y-3">
      {segments.map((segment, index) => (
        <p key={index} className="text-slate-300 leading-relaxed">
          <span className="text-purple-300 font-medium">
            {segment.match(/^【[^】]+】/)?.[0]}
          </span>
          {segment.replace(/^【[^】]+】/, "")}
        </p>
      ))}
    </div>
  )
}

export default function CardDetailClient({ card, relatedCards }: Props) {
  const suitNames = {
    major: "大阿爾克納",
    cups: "聖杯",
    pentacles: "金幣",
    swords: "寶劍",
    wands: "權杖",
  }

  return (
    <div className="min-h-screen bg-[#0F0F23]">
      {/* 背景裝飾 */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="p-4 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/cards"
            className="text-purple-300 hover:text-amber-300 transition-colors duration-200"
          >
            ← 返回塔羅牌圖鑑
          </Link>
          <div className="text-slate-400 text-sm">
            <span className="text-purple-300">{suitNames[card.suit]}</span>
            {card.number !== undefined && <span> • 編號 <span className="text-amber-400">{card.number}</span></span>}
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb
          items={[
            { label: "塔羅牌圖鑑", href: "/cards" },
            { label: suitNames[card.suit], href: `/cards#${card.suit}` },
            { label: card.name, href: `/cards/${card.id}` },
          ]}
        />
      </div>

      <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-10 items-start relative z-10">
        {/* Card Image 區塊 */}
        <div className="flex-shrink-0 w-full lg:w-[340px] flex justify-center">
          <div className="relative aspect-[3/5] w-[260px] sm:w-[300px] lg:w-[320px] bg-white/95 rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-400/30 flex items-center justify-center">
            <Image
              src={card.imageUrl}
              alt={card.name}
              fill
              sizes="(max-width: 768px) 90vw, 320px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Card Details 內容區塊 */}
        <div className="flex-1 space-y-6">
          {/* 標題與分類 */}
          <header className="mb-2">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-amber-200 mb-1">
              {card.name}
            </h1>
            <div className="text-lg text-purple-300/80 mb-1">{card.nameEn}</div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-400">
              <span className="text-purple-300">{suitNames[card.suit]}</span>
              {card.number !== undefined && <span>• 編號 <span className="text-amber-400">{card.number}</span></span>}
            </div>
          </header>

          {/* 牌面描述 */}
          <section className="glass-card p-5">
            <h2 className="text-xl font-semibold text-purple-200 mb-2">牌面描述</h2>
            <p className="text-slate-300 leading-relaxed text-base">
              {card.description}
            </p>
          </section>

          {/* 關鍵詞 */}
          <section className="glass-card p-5">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">關鍵詞</h2>
            <div className="flex flex-wrap gap-2">
              {card.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-200 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          {/* 正逆位含義 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 正位含義 */}
            <section className="glass-card-subtle p-5">
              <h2 className="text-lg font-semibold text-purple-200 mb-3">
                正位含義
              </h2>
              <ul className="space-y-2">
                {card.meaning.upright.map((meaning, index) => (
                  <li key={index} className="text-emerald-200/90 flex items-start text-sm">
                    <span className="text-emerald-400 mr-2">✓</span>
                    {meaning}
                  </li>
                ))}
              </ul>
            </section>
            {/* 逆位含義 */}
            <section className="glass-card-subtle p-5">
              <h2 className="text-lg font-semibold text-purple-200 mb-3">
                逆位含義
              </h2>
              <ul className="space-y-2">
                {card.meaning.reversed.map((meaning, index) => (
                  <li key={index} className="text-red-200/90 flex items-start text-sm">
                    <span className="text-red-400 mr-2">⚠</span>
                    {meaning}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 深度解析區塊（象徵意義、數字學、占星學、神話、建議、愛情/事業/健康） */}
          {card.deepAnalysis && (
            <div className="space-y-4">
              {card.deepAnalysis.symbolism && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    象徵意義
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {card.deepAnalysis.symbolism}
                  </p>
                </section>
              )}
              {card.deepAnalysis.loveReading && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    愛情解讀
                  </h2>
                  {formatReadingText(card.deepAnalysis.loveReading)}
                </section>
              )}
              {card.deepAnalysis.careerReading && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    事業解讀
                  </h2>
                  {formatReadingText(card.deepAnalysis.careerReading)}
                </section>
              )}
              {card.deepAnalysis.healthReading && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    健康解讀
                  </h2>
                  {formatReadingText(card.deepAnalysis.healthReading)}
                </section>
              )}
              {card.deepAnalysis.practicalAdvice && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    實用建議
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {card.deepAnalysis.practicalAdvice}
                  </p>
                </section>
              )}
              {card.deepAnalysis.numerology && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    數字學含義
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {card.deepAnalysis.numerology}
                  </p>
                </section>
              )}
              {card.deepAnalysis.astrology && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    占星學關聯
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {card.deepAnalysis.astrology}
                  </p>
                </section>
              )}
              {card.deepAnalysis.mythology && (
                <section className="glass-card p-5">
                  <h2 className="text-lg font-semibold text-purple-200 mb-2">
                    神話背景
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {card.deepAnalysis.mythology}
                  </p>
                </section>
              )}
            </div>
          )}

          {/* Fallback Content for cards without deep analysis */}
          {!card.deepAnalysis && (
            <section className="glass-card p-5">
              <h2 className="text-lg font-semibold text-purple-200 mb-2">
                深度解析
              </h2>
              <div className="text-slate-300 space-y-2">
                <p>
                  {card.name}{" "}
                  在塔羅牌中代表著重要的象徵意義。這張牌提醒我們要關注內在的智慧，並在人生的旅程中找到正確的方向。
                </p>
                <p>
                  當{card.name}
                  出現在占卜中時，它往往暗示著一個重要的轉折點或人生課題。無論是正位還是逆位，這張牌都為我們提供了寶貴的指引。
                </p>
              </div>
            </section>
          )}

          {/* 廣告 */}
          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          {/* 相關卡牌推薦 */}
          {relatedCards.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-purple-200 mb-6">相關卡牌</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedCards.map((relatedCard) => (
                  <Link
                    key={relatedCard.id}
                    href={`/cards/${relatedCard.id}`}
                    className="block glass-card-subtle p-4
                      hover:bg-purple-500/15 hover:border-purple-400/40
                      hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)]
                      transition-all duration-300"
                  >
                    <div className="aspect-[3/5] relative mb-2">
                      <Image
                        src={relatedCard.imageUrl}
                        alt={relatedCard.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-purple-100 text-sm font-medium text-center">
                      {relatedCard.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
