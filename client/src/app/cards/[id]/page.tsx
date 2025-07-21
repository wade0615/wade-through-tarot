"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getTarotCardById, TarotCard } from "@/data/tarotCards";
import Link from "next/link";

interface CardPageProps {
  params: {
    id: string;
  };
}

export default function CardPage({ params }: CardPageProps) {
  const router = useRouter();
  const [card, setCard] = useState<TarotCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCard = getTarotCardById(params.id);
    if (foundCard) {
      setCard(foundCard);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">載入中...</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl mb-4">找不到這張牌</h1>
          <Link href="/cards" className="text-blue-300 hover:text-blue-100">
            返回塔羅牌圖鑑
          </Link>
        </div>
      </div>
    );
  }

  const suitNames = {
    major: "大阿爾克納",
    cups: "聖杯",
    pentacles: "金幣",
    swords: "寶劍",
    wands: "權杖",
  };

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
            {suitNames[card.suit]} • {card.number !== undefined ? `編號 ${card.number}` : ""}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{card.name}</h1>
          <p className="text-xl text-blue-200 mb-2">{card.nameEn}</p>
          <div className="flex justify-center gap-4 text-sm text-gray-300">
            <span>{suitNames[card.suit]}</span>
            {card.number !== undefined && <span>• 編號 {card.number}</span>}
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md relative aspect-[3/5]">
              <Image
                src={card.imageUrl}
                alt={card.name}
                fill
                className="rounded-lg shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* Card Details */}
          <div className="space-y-8">
            {/* Description */}
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">牌面描述</h2>
              <p className="text-gray-200 leading-relaxed text-lg">
                {card.description}
              </p>
            </section>

            {/* Keywords */}
            <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">關鍵詞</h2>
              <div className="flex flex-wrap gap-3">
                {card.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium backdrop-blur-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>

            {/* Meanings */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Upright Meaning */}
              <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">正位含義</h2>
                <ul className="space-y-2">
                  {card.meaning.upright.map((meaning, index) => (
                    <li key={index} className="text-gray-200 flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      {meaning}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Reversed Meaning */}
              <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">逆位含義</h2>
                <ul className="space-y-2">
                  {card.meaning.reversed.map((meaning, index) => (
                    <li key={index} className="text-gray-200 flex items-start">
                      <span className="text-red-400 mr-2">⚠</span>
                      {meaning}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Deep Analysis Content */}
            {card.deepAnalysis && (
              <div className="space-y-6">
                {/* Symbolism */}
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">象徵意義</h2>
                  <p className="text-gray-200 leading-relaxed">
                    {card.deepAnalysis.symbolism}
                  </p>
                </section>

                {/* Numerology */}
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">數字學含義</h2>
                  <p className="text-gray-200 leading-relaxed">
                    {card.deepAnalysis.numerology}
                  </p>
                </section>

                {/* Astrology */}
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">占星學關聯</h2>
                  <p className="text-gray-200 leading-relaxed">
                    {card.deepAnalysis.astrology}
                  </p>
                </section>

                {/* Mythology */}
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">神話背景</h2>
                  <p className="text-gray-200 leading-relaxed">
                    {card.deepAnalysis.mythology}
                  </p>
                </section>

                {/* Practical Advice */}
                <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">實用建議</h2>
                  <p className="text-gray-200 leading-relaxed">
                    {card.deepAnalysis.practicalAdvice}
                  </p>
                </section>

                {/* Specific Readings */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Love Reading */}
                  <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">愛情解讀</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {card.deepAnalysis.loveReading}
                    </p>
                  </section>

                  {/* Career Reading */}
                  <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">事業解讀</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {card.deepAnalysis.careerReading}
                    </p>
                  </section>

                  {/* Health Reading */}
                  <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">健康解讀</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {card.deepAnalysis.healthReading}
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* Fallback Content for cards without deep analysis */}
            {!card.deepAnalysis && (
              <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">深度解析</h2>
                <div className="text-gray-200 space-y-4">
                  <p>
                    {card.name}在塔羅牌中代表著重要的象徵意義。這張牌提醒我們要關注內在的智慧，
                    並在人生的旅程中找到正確的方向。
                  </p>
                  <p>
                    當{card.name}出現在占卜中時，它往往暗示著一個重要的轉折點或人生課題。
                    無論是正位還是逆位，這張牌都為我們提供了寶貴的指引。
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Related Cards */}
        <section className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            相關塔羅牌
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* You can add related cards here */}
            <div className="text-center text-gray-300">
              <p>相關牌面將在這裡顯示</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 