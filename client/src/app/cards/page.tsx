"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getTarotCardsBySuit, TarotCard } from "@/data/tarotCards";
import Link from "next/link";

const suitNames = {
  major: "大阿爾克納",
  cups: "聖杯",
  pentacles: "金幣",
  swords: "寶劍",
  wands: "權杖",
};

const suitOrder: TarotCard["suit"][] = [
  "major",
  "cups",
  "pentacles",
  "swords",
  "wands",
];

export default function CardsPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* SEO 塔羅牌圖鑑說明 */}
        <section
          className="bg-white/10 rounded-lg p-6 my-8"
          aria-label="塔羅牌介紹"
        >
          <h2 className="text-xl font-bold text-blue-200 mb-2">
            什麼是塔羅牌？
          </h2>
          <p className="text-blue-100 mb-2">
            塔羅牌是一套源自歐洲的神秘工具，包含22張大阿爾卡納與56張小阿爾卡納，象徵人生各種階段與課題。每張牌都有獨特的圖像與深刻的象徵意義，能協助我們自我探索、預測未來、獲得指引。
          </p>
          <h3 className="text-lg font-semibold text-blue-100 mt-4">
            塔羅牌的分類
          </h3>
          <ul className="list-disc list-inside text-blue-100">
            <li>大阿爾卡納（Major Arcana）：代表人生重大轉折與靈性課題</li>
            <li>
              小阿爾卡納（Minor
              Arcana）：細分為聖杯、權杖、寶劍、金幣四組，象徵日常生活的各種面向
            </li>
          </ul>
        </section>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">塔羅牌圖鑑</h1>
          <p className="text-lg text-blue-200 mb-2">78張偉特塔羅牌完整解析</p>
          <p className="text-sm text-gray-300">
            包含大阿爾卡納22張和小阿爾卡納56張，每張牌都有詳細的正逆位解釋
          </p>
        </header>

        <nav className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {suitOrder.map((suit) => (
              <a
                key={suit}
                href={`#${suit}`}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                {suitNames[suit]}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-12">
          {suitOrder.map((suit) => {
            const cards = getTarotCardsBySuit(suit);
            return (
              <section
                key={suit}
                id={suit}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                  {suitNames[suit]}
                </h2>
                <p className="text-center text-gray-300 mb-6">
                  {suit === "major"
                    ? "22張大阿爾卡納牌，代表人生的重要階段和精神旅程"
                    : `${cards.length}張${suitNames[suit]}牌，代表${
                        suit === "cups"
                          ? "情感和愛情"
                          : suit === "pentacles"
                          ? "物質和金錢"
                          : suit === "swords"
                          ? "思維和挑戰"
                          : "行動和創造"
                      }`}
                </p>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {cards.map((card) => (
                    <Link
                      key={card.id}
                      href={`/cards/${card.id}`}
                      className="block"
                    >
                      <article
                        id={card.id}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-lg"
                      >
                        <div className="aspect-[3/5] relative mb-3">
                          <Image
                            src={card.imageUrl}
                            alt={card.name}
                            fill
                            sizes="(max-width: 768px) 40vw, 180px"
                            className="object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="text-sm font-medium text-white mb-1">
                            {card.name}
                          </h3>
                          <p className="text-xs text-gray-300">{card.nameEn}</p>
                          {card.number !== undefined && (
                            <p className="text-xs text-gray-400 mt-1">
                              {card.number === 0 ? "0" : card.number}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 返回按鈕 */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleGoBack}
          className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 shadow-lg"
        >
          返回上一頁
        </button>
      </div>
    </div>
  );
}
