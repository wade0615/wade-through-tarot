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
      // 牌背 - 神秘紫金主題
      <div
        className={cn(
          "w-full h-full rounded-lg border border-purple-500/50",
          "bg-gradient-to-br from-violet-950 via-purple-900 to-slate-900",
          "flex items-center justify-center",
          "shadow-lg relative overflow-hidden"
        )}
      >
        {/* 裝飾邊框 */}
        <div className="absolute inset-2 border border-purple-400/40 rounded-md" />
        <div className="absolute inset-4 border border-amber-500/30 rounded-sm" />

        {/* 角落裝飾 */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-400/50" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-400/50" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-400/50" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-400/50" />

        {/* 中心圖案 */}
        <div className="text-center z-10">
          <div className="text-purple-300/80 text-[8px] tracking-[0.2em] font-light">TAROT</div>
          <div className="text-amber-400/90 text-lg my-1">✦</div>
          <div className="text-purple-300/60 text-[6px] tracking-wider">WADE</div>
        </div>

        {/* 微光效果 */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent opacity-50" />
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
          sizes="(max-width: 768px) 30vw, 96px"
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
        "hover:scale-105 hover:-translate-y-1",
        "hover:shadow-[0_20px_40px_rgba(139,92,246,0.3)]",
        isSelected &&
          "ring-2 ring-purple-400 ring-offset-2 ring-offset-[#0F0F23] scale-105 shadow-[0_0_30px_rgba(139,92,246,0.4)]",
        isFlipped && "animate-mystic-pulse",
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
