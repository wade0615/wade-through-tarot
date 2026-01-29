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
    const totalFanWidth = totalCards * visibleWidth + cardWidth - visibleWidth;
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
    const minAngle = 75; // 最小角度（度）
    const maxAngle = 105; // 最大角度（度）
    const cardOffset = 6; // 垂直間距（px）
    const maxTranslateX = 10; // 最大水平偏移（px）

    const angle = minAngle + (index / (totalCards - 1)) * (maxAngle - minAngle);
    const translateY = index * cardOffset - 30;

    // 計算拋物線效果：中間卡片偏移最大（5px），兩端為 0
    const normalizedIndex = index / (totalCards - 1); // 0 到 1
    const translateX = maxTranslateX * Math.sin(normalizedIndex * Math.PI) - 50;

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${angle}deg)`,
      transformOrigin: "bottom center",
    };
  };

  const getMobilePickCardStyle = (index: number) => {
    const visibleHeight = 20; // 每張牌露出的高度（px）

    return {
      position: "absolute" as const,
      top: `${index * visibleHeight}px`,
      left: "50%",
      transform: "translateX(-50%)",
      width: `60px`,
      height: `90px`,
    };
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* PC 版：上下佈局 */}
      <div className="hidden lg:flex lg:flex-col lg:h-[calc(100vh-200px)] lg:gap-4">
        {/* 上方：開扇牌堆區域（60%） */}
        <div className="flex-[6] flex items-center justify-center overflow-hidden">
          <div
            className="relative"
            style={{ width: "1000px", height: "120px" }}
          >
            {shuffledCards.map((card, index) => (
              <div
                key={card.id}
                className={cn(
                  "absolute top-0 transition-all duration-200",
                  slidingCardIds.has(card.id)
                    ? "animate-slide-down-pc"
                    : "hover:translate-y-[10px] hover:z-[999] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer"
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
          <div className="text-purple-300/80 text-sm">
            已選擇 <span className="text-amber-400">{selectedCards.length}</span> / {maxSelection} 張牌
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
      <div className="lg:hidden flex h-[90dvh)] gap-4">
        {/* 左側：開扇牌堆區域（60-70%） */}
        <div className="flex-[7] flex items-center justify-center overflow-hidden">
          <div className="relative" style={{ width: "200px", height: "90dvh" }}>
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
        <div className="flex-[3] flex flex-col items-center p-2 overflow-y-auto">
          <div className="text-purple-300/80 text-xs text-center mb-4">
            已選擇
            <br />
            <span className="text-amber-400">{selectedCards.length}</span> / {maxSelection}
          </div>
          <div
            className="relative w-full flex-1"
            style={{
              minHeight:
                selectedCards.length > 0
                  ? `${90 + (selectedCards.length - 1) * 20}px`
                  : "0px",
            }}
          >
            {selectedCards.map((sc, index) => (
              <div
                key={sc.card.id}
                style={{
                  ...getMobilePickCardStyle(index),
                  zIndex: index,
                }}
              >
                <TarotCardComponent
                  showBack
                  size="sm"
                  className="animate-fade-in"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 控制按鈕 */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={shuffleDeck}
          disabled={isShuffling}
          className={cn(
            "px-6 py-3 min-h-[44px] rounded-xl font-medium transition-all duration-300",
            "bg-purple-500/20 border border-purple-400/30 text-purple-200",
            "hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isShuffling && "animate-mystic-pulse"
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
