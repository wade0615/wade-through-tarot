"use client";

import Image from "next/image";
import { TarotCard } from "@/data/tarotCards";
import { cn } from "@/utils/helpers";

interface TarotCardComponentProps {
  card?: TarotCard;
  isReversed?: boolean;
  isSelected?: boolean;
  isFlipped?: boolean;
  showBack?: boolean;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * 塔羅牌組件 - 顯示單張塔羅牌
 * 支援牌面/牌背顯示、正逆位、不同尺寸和互動效果
 */
export function TarotCardComponent({
  card,
  isReversed = false,
  isSelected = false,
  isFlipped = false,
  showBack = false,
  onClick,
  className,
  size = "md",
}: TarotCardComponentProps) {
  const sizeClasses = {
    sm: "w-16 h-24",
    md: "w-24 h-36",
    lg: "w-32 h-48",
  };

  const cardContent =
    showBack || !card ? (
      // 牌背
      <div
        className={cn(
          "w-full h-full rounded-lg border-2 border-blue-400",
          "bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900",
          "flex items-center justify-center",
          "shadow-lg relative overflow-hidden"
        )}
      >
        <div className="absolute inset-2 border border-blue-400 rounded opacity-50" />
        <div className="absolute inset-4 border border-blue-400 rounded opacity-30" />
        <div className="text-blue-200 text-center">
          <div className="text-xs opacity-60">TAROT</div>
          <div className="text-2xl">✨</div>
        </div>
      </div>
    ) : (
      // 牌面 - 使用圖片
      <div
        className={cn(
          "w-full h-full rounded-lg border-2 border-gray-300",
          "shadow-lg relative overflow-hidden",
          isReversed && "rotate-180"
        )}
      >
        {/* 塔羅牌圖片 */}
        <Image
          src={card.imageUrl}
          alt={`${card.name} (${card.nameEn})`}
          fill
          className="object-cover"
          onError={() => {
            // 如果圖片載入失敗，顯示備用的 emoji 版本
            const fallback = document.querySelector(
              ".fallback-content"
            ) as HTMLElement;
            if (fallback) {
              fallback.style.display = "flex";
            }
          }}
        />

        {/* 備用內容 - 當圖片載入失敗時顯示 */}
        <div className="fallback-content hidden absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-between p-2">
          {/* 牌名 */}
          <div className="text-center">
            <div className="text-xs font-bold text-gray-800 leading-tight">
              {card.name}
            </div>
            <div className="text-xs text-gray-600 leading-tight">
              {card.nameEn}
            </div>
          </div>

          {/* 牌面圖案 - 使用 emoji 作為備用 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-3xl">
              {card.suit === "major" && getEmojiBySuit(card.name)}
              {card.suit === "cups" && "🏆"}
              {card.suit === "pentacles" && "🪙"}
              {card.suit === "swords" && "⚔️"}
              {card.suit === "wands" && "🪄"}
            </div>
          </div>

          {/* 牌號或花色 */}
          <div className="text-xs text-gray-600">
            {card.number !== undefined ? card.number : card.suit}
          </div>
        </div>

        {/* 逆位指示器 */}
        {isReversed && (
          <div className="absolute top-1 right-1 text-red-500 text-xs bg-white bg-opacity-80 px-1 rounded">
            ↻
          </div>
        )}
      </div>
    );

  return (
    <div
      className={cn(
        sizeClasses[size],
        "cursor-pointer transition-all duration-300 transform mx-auto",
        "hover:scale-105 hover:shadow-xl",
        isSelected &&
          "ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900 scale-105",
        isFlipped && "animate-pulse",
        onClick && "hover:brightness-110",
        className
      )}
      onClick={onClick}
    >
      {cardContent}
    </div>
  );
}

/**
 * 根據大阿爾卡納牌名返回對應的 emoji
 * @param cardName - 牌卡名稱
 * @returns 對應的 emoji 符號
 */
function getEmojiBySuit(cardName: string): string {
  const emojiMap: { [key: string]: string } = {
    愚者: "🃏",
    魔術師: "🎩",
    女祭司: "🌙",
    皇后: "👑",
    皇帝: "🏛️",
    教皇: "🔔",
    戀人: "💕",
    戰車: "🏇",
    力量: "🦁",
    隱者: "🕯️",
    命運之輪: "🎡",
    正義: "⚖️",
    倒吊人: "🙃",
    死神: "💀",
    節制: "🍷",
    惡魔: "😈",
    塔: "🗼",
    星星: "⭐",
    月亮: "🌙",
    太陽: "☀️",
    審判: "📯",
    世界: "🌍",
  };

  return emojiMap[cardName] || "✨";
}
