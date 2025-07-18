'use client';

import { useState, useEffect } from 'react';
import { TarotCard, allTarotCards } from '@/data/tarotCards';
import { TarotCardComponent } from './TarotCard';
import { useTarotStore } from '@/store/tarotStore';
import { shuffleArray, getRandomReversed, cn } from '@/utils/helpers';

interface CardDeckProps {
  onCardSelect?: (card: TarotCard, isReversed: boolean) => void;
  maxSelection?: number;
  className?: string;
}

/**
 * 牌堆組件 - 顯示可選擇的塔羅牌堆
 * 提供洗牌和選牌功能
 */
export function CardDeck({ 
  onCardSelect, 
  maxSelection = 3,
  className 
}: CardDeckProps) {
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const { selectedCards, canAddCard, clearSelection } = useTarotStore();

  // 組件初始化時洗牌
  useEffect(() => {
    shuffleDeck();
  }, []);

  /**
   * 洗牌功能 - 清空已選擇的牌並重新洗牌
   */
  const shuffleDeck = () => {
    setIsShuffling(true);
    setTimeout(() => {
      // 清空已選擇的牌
      clearSelection();
      // 重新洗牌，包含所有牌
      setShuffledCards(shuffleArray(allTarotCards));
      setIsShuffling(false);
    }, 1000);
  };

  /**
   * 處理牌卡點擊事件
   * @param card - 被點擊的牌卡
   */
  const handleCardClick = (card: TarotCard) => {
    if (!canAddCard()) return;
    const isReversed = getRandomReversed();
    onCardSelect?.(card, isReversed);
    // 從牌堆中移除已抽出的牌
    setShuffledCards(prev => prev.filter(c => c.id !== card.id));
  };

  /**
   * 檢查牌卡是否已被選擇
   * @param cardId - 牌卡ID
   * @returns 是否已被選擇
   */
  const isCardSelected = (cardId: string) => {
    return selectedCards.some(sc => sc.card.id === cardId);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* 牌組展示 */}
      <div className="text-center text-blue-200 mb-[64]">
        已選擇 {selectedCards.length} / {maxSelection} 張牌
      </div>

      {/* 牌堆 - 展示為重疊的牌背 */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full h-[220px]">
          {/* 創建堆疊效果 */}
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={cn(
                'absolute transition-all duration-300',
                isShuffling && 'animate-bounce'
              )}
              style={{
                transform: `translate(calc(-50% + ${index * 2}px), ${index * -2}px)`,
                zIndex: 5 - index,
                left: '50%',
              }}
            >
              <TarotCardComponent
                showBack
                size="lg"
                className={cn(
                  index === 0 && canAddCard() && 'hover:scale-110 cursor-pointer',
                  index !== 0 && 'pointer-events-none'
                )}
                onClick={index === 0 && canAddCard() ? () => {
                  if (shuffledCards.length > 0) {
                    handleCardClick(shuffledCards[0]);
                  }
                } : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 控制按鈕 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={shuffleDeck}
          disabled={isShuffling}
          className={cn(
            'px-6 py-2 rounded-lg font-medium transition-all shadow-lg',
            'bg-blue-600 text-white hover:bg-blue-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isShuffling && 'animate-pulse'
          )}
        >
          {isShuffling ? '洗牌中...' : '重新洗牌'}
        </button>
      </div>

      {/* 抽牌說明 */}
      <div className="text-center text-blue-200 max-w-md mx-auto">
        <p className="text-sm">
          {canAddCard() 
            ? '點擊牌堆抽取一張牌' 
            : '已達到最大選牌數量'
          }
        </p>
      </div>
    </div>
  );
}
