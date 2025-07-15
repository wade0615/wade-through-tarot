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

export function CardDeck({ 
  onCardSelect, 
  maxSelection = 3,
  className 
}: CardDeckProps) {
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const { selectedCards, canAddCard } = useTarotStore();

  useEffect(() => {
    shuffleDeck();
  }, []);

  const shuffleDeck = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setShuffledCards(shuffleArray(allTarotCards));
      setIsShuffling(false);
    }, 1000);
  };

  const handleCardClick = (card: TarotCard) => {
    if (!canAddCard()) return;
    
    const isReversed = getRandomReversed();
    onCardSelect?.(card, isReversed);
  };

  const isCardSelected = (cardId: string) => {
    return selectedCards.some(sc => sc.card.id === cardId);
  };

  return (
    <div className={cn('space-y-4', className)}>
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

      {/* 抽牌說明 */}
      <div className="text-center text-blue-200 max-w-md mx-auto">
        <p className="text-sm">
          {canAddCard() 
            ? '點擊牌堆抽取一張牌' 
            : '已達到最大選牌數量'
          }
        </p>
      </div>

      {/* 可選：顯示部分牌面供選擇 */}
      {/* <div className="mt-8">
        <div className="text-center text-blue-100 font-medium mb-4">
          或從下方選擇特定牌卡：
        </div>
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-64 overflow-y-auto p-4 border border-slate-600 rounded-lg bg-slate-800/30 backdrop-blur-sm">
          {shuffledCards.slice(0, 20).map((card) => (
            <TarotCardComponent
              key={card.id}
              card={card}
              size="sm"
              isSelected={isCardSelected(card.id)}
              onClick={() => canAddCard() && !isCardSelected(card.id) && handleCardClick(card)}
              className={cn(
                !canAddCard() && 'opacity-50 cursor-not-allowed',
                isCardSelected(card.id) && 'opacity-50 cursor-not-allowed'
              )}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
