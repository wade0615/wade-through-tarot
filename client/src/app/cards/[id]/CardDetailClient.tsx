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

export default function CardDetailClient({ card, relatedCards }: Props) {
  const suitNames = {
    major: "大阿爾克納",
    cups: "聖杯",
    pentacles: "金幣",
    swords: "寶劍",
    wands: "權杖",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/cards"
            className="text-white hover:text-blue-300 transition-colors"
          >
            ← 返回塔羅牌圖鑑
          </Link>
          <div className="text-white text-sm">
            {suitNames[card.suit]} •{" "}
            {card.number !== undefined ? `編號 ${card.number}` : ""}
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

      <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-10 items-start">
        {/* Card Image 區塊 */}
        <div className="flex-shrink-0 w-full lg:w-[340px] flex justify-center">
          <div className="relative aspect-[3/5] w-[260px] sm:w-[300px] lg:w-[320px] bg-white rounded-xl shadow-2xl border-4 border-white flex items-center justify-center">
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
            <h1 className="text-3xl font-bold text-white mb-1">{card.name}</h1>
            <div className="text-lg text-blue-200 mb-1">{card.nameEn}</div>
            <div className="flex flex-wrap gap-2 text-sm text-blue-100">
              <span>{suitNames[card.suit]}</span>
              {card.number !== undefined && <span>• 編號 {card.number}</span>}
            </div>
          </header>

          {/* 牌面描述 */}
          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
            <h2 className="text-xl font-semibold text-white mb-2">牌面描述</h2>
            <p className="text-blue-100 leading-relaxed text-base">
              {card.description}
            </p>
          </section>

          {/* 關鍵詞 */}
          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
            <h2 className="text-xl font-semibold text-white mb-2">關鍵詞</h2>
            <div className="flex flex-wrap gap-2">
              {card.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/30 text-purple-100 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          {/* 正逆位含義 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 正位含義 */}
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <h2 className="text-lg font-semibold text-white mb-2">
                正位含義
              </h2>
              <ul className="space-y-1">
                {card.meaning.upright.map((meaning, index) => (
                  <li key={index} className="text-green-200 flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    {meaning}
                  </li>
                ))}
              </ul>
            </section>
            {/* 逆位含義 */}
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <h2 className="text-lg font-semibold text-white mb-2">
                逆位含義
              </h2>
              <ul className="space-y-1">
                {card.meaning.reversed.map((meaning, index) => (
                  <li key={index} className="text-red-200 flex items-start">
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
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    象徵意義
                  </h2>
                  <p className="text-blue-100 leading-relaxed">
                    {card.deepAnalysis.symbolism}
                  </p>
                </section>
              )}
              {card.deepAnalysis.numerology && (
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    數字學含義
                  </h2>
                  <p className="text-blue-100 leading-relaxed">
                    {card.deepAnalysis.numerology}
                  </p>
                </section>
              )}
              {card.deepAnalysis.astrology && (
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    占星學關聯
                  </h2>
                  <p className="text-blue-100 leading-relaxed">
                    {card.deepAnalysis.astrology}
                  </p>
                </section>
              )}
              {card.deepAnalysis.mythology && (
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    神話背景
                  </h2>
                  <p className="text-blue-100 leading-relaxed">
                    {card.deepAnalysis.mythology}
                  </p>
                </section>
              )}
              {card.deepAnalysis.practicalAdvice && (
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    實用建議
                  </h2>
                  <p className="text-blue-100 leading-relaxed">
                    {card.deepAnalysis.practicalAdvice}
                  </p>
                </section>
              )}
              <div className="grid md:grid-cols-3 gap-4">
                {card.deepAnalysis.loveReading && (
                  <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                    <h3 className="text-base font-semibold text-white mb-2">
                      愛情解讀
                    </h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {card.deepAnalysis.loveReading}
                    </p>
                  </section>
                )}
                {card.deepAnalysis.careerReading && (
                  <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                    <h3 className="text-base font-semibold text-white mb-2">
                      事業解讀
                    </h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {card.deepAnalysis.careerReading}
                    </p>
                  </section>
                )}
                {card.deepAnalysis.healthReading && (
                  <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                    <h3 className="text-base font-semibold text-white mb-2">
                      健康解讀
                    </h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {card.deepAnalysis.healthReading}
                    </p>
                  </section>
                )}
              </div>
            </div>
          )}

          {/* Fallback Content for cards without deep analysis */}
          {!card.deepAnalysis && (
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <h2 className="text-lg font-semibold text-white mb-2">
                深度解析
              </h2>
              <div className="text-blue-100 space-y-2">
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
              <h2 className="text-2xl font-bold text-white mb-6">相關卡牌</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedCards.map((relatedCard) => (
                  <Link
                    key={relatedCard.id}
                    href={`/cards/${relatedCard.id}`}
                    className="block bg-white/10 backdrop-blur-sm rounded-lg p-4
                             hover:bg-white/20 transition-colors"
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
                    <h3 className="text-white text-sm font-medium text-center">
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
