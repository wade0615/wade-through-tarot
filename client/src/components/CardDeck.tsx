"use client";

import { useState, useEffect, useCallback } from "react";
import { TarotCard, allTarotCards } from "@/data/tarotCards";
import { TarotCardComponent } from "./TarotCard";
import { useTarotStore } from "@/store/tarotStore";
import { shuffleArray, getRandomReversed, cn } from "@/utils/helpers";

interface CardDeckProps {
  onCardSelect?: (card: TarotCard, isReversed: boolean) => void;
  maxSelection?: number;
  className?: string;
}

/**
 * 牌堆組件 - 開扇撲牌展示與選牌
 * PC: 上下佈局（上方開扇，下方已選牌）
 * Mobile: 左右佈局（左側開扇，右側已選牌）
 */
export function CardDeck({
  onCardSelect,
  maxSelection = 3,
  className,
}: CardDeckProps) {
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [slidingCardIds, setSlidingCardIds] = useState<Set<string>>(new Set());
  const { selectedCards, canAddCard, clearSelection } = useTarotStore();

  /**
   * 洗牌功能 - 清空已選擇的牌並重新洗牌
   */
  const shuffleDeck = useCallback(() => {
    setIsShuffling(true);
    setTimeout(() => {
      clearSelection();
      setShuffledCards(shuffleArray(allTarotCards));
      setSlidingCardIds(new Set());
      setIsShuffling(false);
    }, 1000);
  }, [clearSelection]);

  // 組件初始化時洗牌
  useEffect(() => {
    shuffleDeck();
  }, [shuffleDeck]);

  /**
   * 處理牌卡點擊事件
   * @param card - 被點擊的牌卡
   */
  const handleCardClick = (card: TarotCard) => {
    if (!canAddCard() || slidingCardIds.has(card.id)) return;

    // 標記為正在滑出
    setSlidingCardIds((prev) => new Set(prev).add(card.id));

    // 等待滑出動畫完成後，觸發選牌回調並從牌堆移除
    setTimeout(() => {
      const isReversed = getRandomReversed();
      onCardSelect?.(card, isReversed);
      setShuffledCards((prev) => prev.filter((c) => c.id !== card.id));
      setSlidingCardIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(card.id);
        return newSet;
      });
    }, 500); // 0.5s 動畫時間
  };

  /**
   * 計算 PC 版開扇卡片樣式（水平重疊展開）
   */
  const getPCFanCardStyle = (index: number) => {
    const cardWidth = 70; // 完整卡片寬度（px）
    const visibleWidth = 12; // 每張牌露出的寬度（px）
    const totalCards = shuffledCards.length;
    const containerWidth = 1000; // 容器寬度（px）
    const totalFanWidth =
      totalCards * visibleWidth + cardWidth - visibleWidth;
    const startX = (containerWidth - totalFanWidth) / 2;

    return {
      transform: `translateX(${startX + index * visibleWidth}px)`,
      width: `${cardWidth}px`,
      height: "105px",
    };
  };

  /**
   * 計算手機版開扇卡片樣式（垂直扇形展開）
   */
  const getMobileFanCardStyle = (index: number) => {
    const totalCards = shuffledCards.length;
    const fanSpreadAngle = 30; // 總扇形角度（-15° 到 +15°）
    const cardOffset = 3; // 垂直間距（px）

    const angle = ((index - totalCards / 2) * fanSpreadAngle) / totalCards;
    const translateY = index * cardOffset;

    return {
      transform: `translateY(${translateY}px) rotate(${angle}deg)`,
      transformOrigin: "bottom center",
    };
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* PC 版：上下佈局 */}
      <div className="hidden lg:flex lg:flex-col lg:h-[calc(100vh-200px)] lg:gap-4">
        {/* 上方：開扇牌堆區域（60%） */}
        <div className="flex-[6] flex items-center justify-center overflow-hidden">
          <div className="relative" style={{ width: "1000px", height: "120px" }}>
            {shuffledCards.map((card, index) => (
              <div
                key={card.id}
                className={cn(
                  "absolute top-0 transition-all duration-200",
                  slidingCardIds.has(card.id)
                    ? "animate-slide-down-pc"
                    : "hover:scale-110 hover:z-[999] hover:shadow-glow cursor-pointer"
                )}
                style={{
                  ...getPCFanCardStyle(index),
                  zIndex: slidingCardIds.has(card.id) ? 1000 : index,
                }}
                onClick={() => handleCardClick(card)}
              >
                <TarotCardComponent
                  showBack
                  size="md"
                  className="pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 下方：已選牌區域（40%） */}
        <div className="flex-[4] flex items-start justify-center gap-4 p-4">
          <div className="text-blue-200 text-sm">
            已選擇 {selectedCards.length} / {maxSelection} 張牌
          </div>
          <div className="flex gap-4">
            {selectedCards.map((sc) => (
              <TarotCardComponent
                key={sc.card.id}
                showBack
                size="md"
                className="animate-fade-in"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 手機版：左右佈局 */}
      <div className="lg:hidden flex h-[calc(100vh-200px)] gap-4">
        {/* 左側：開扇牌堆區域（60-70%） */}
        <div className="flex-[7] flex items-center justify-center overflow-hidden">
          <div className="relative" style={{ width: "200px", height: "600px" }}>
            {shuffledCards.map((card, index) => (
              <div
                key={card.id}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 transition-all duration-200",
                  slidingCardIds.has(card.id)
                    ? "animate-slide-right-mobile"
                    : "cursor-pointer"
                )}
                style={{
                  ...getMobileFanCardStyle(index),
                  zIndex: slidingCardIds.has(card.id) ? 1000 : index,
                }}
                onClick={() => handleCardClick(card)}
              >
                <TarotCardComponent
                  showBack
                  size="sm"
                  className="pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 右側：已選牌區域（30-40%） */}
        <div className="flex-[3] flex flex-col items-center gap-2 p-2 overflow-y-auto">
          <div className="text-blue-200 text-xs text-center">
            已選擇
            <br />
            {selectedCards.length} / {maxSelection}
          </div>
          {selectedCards.map((sc) => (
            <TarotCardComponent
              key={sc.card.id}
              showBack
              size="sm"
              className="animate-fade-in"
            />
          ))}
        </div>
      </div>

      {/* 控制按鈕 */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={shuffleDeck}
          disabled={isShuffling}
          className={cn(
            "px-6 py-3 min-h-[44px] rounded-lg font-medium transition-all shadow-lg",
            "bg-blue-600 text-white hover:bg-blue-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isShuffling && "animate-pulse"
          )}
          aria-label={isShuffling ? "洗牌中" : "重新洗牌"}
          aria-busy={isShuffling}
        >
          {isShuffling ? "洗牌中..." : "重新洗牌"}
        </button>
      </div>
    </div>
  );
}
