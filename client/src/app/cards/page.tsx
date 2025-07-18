"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getTarotCardsBySuit, TarotCard } from "@/data/tarotCards";
import CardModal from "../../components/CardModal";

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
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const handleCardClick = (card: TarotCard) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          塔羅牌圖鑑
        </h1>

        <div className="space-y-12">
          {suitOrder.map((suit) => {
            const cards = getTarotCardsBySuit(suit);
            return (
              <div
                key={suit}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                  {suitNames[suit]}
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="bg-white/20 backdrop-blur-sm rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="aspect-[3/5] relative mb-3">
                        <Image
                          src={card.imageUrl}
                          alt={card.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-white mb-1">
                          {card.name}
                        </h3>
                        <p className="text-xs text-gray-300">{card.nameEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

      {selectedCard && <CardModal card={selectedCard} onClose={closeModal} />}
    </div>
  );
}
