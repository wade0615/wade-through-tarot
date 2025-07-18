"use client";

import { useEffect } from "react";
import Image from "next/image";
import { TarotCard } from "@/data/tarotCards";

interface CardModalProps {
  card: TarotCard;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: CardModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {card.name}
              </h2>
              <p className="text-lg text-gray-600 mb-1">{card.nameEn}</p>
              {card.number !== undefined && (
                <p className="text-sm text-gray-500">編號: {card.number}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm relative aspect-[3/5]">
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  fill
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  牌面描述
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Keywords */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  關鍵詞
                </h3>
                <div className="flex flex-wrap gap-2">
                  {card.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meanings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Upright */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    正位含義
                  </h3>
                  <ul className="space-y-2">
                    {card.meaning.upright.map((meaning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reversed */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    逆位含義
                  </h3>
                  <ul className="space-y-2">
                    {card.meaning.reversed.map((meaning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
