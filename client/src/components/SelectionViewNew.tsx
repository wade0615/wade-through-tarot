'use client';

import { CardDeck } from './CardDeck';
import { useTarotStore } from '@/store/tarotStore';
import { TarotCard } from '@/data/tarotCards';

interface SelectionViewNewProps {
  onCardSelect: (card: TarotCard, isReversed: boolean) => void;
  onBackToSetup: () => void;
  onViewResult: () => void;
}

/**
 * 選牌頁面組件 - 用於從牌堆中選擇牌卡
 * 淺色主題版本
 */
export function SelectionViewNew({ 
  onCardSelect, 
  onBackToSetup, 
  onViewResult 
}: SelectionViewNewProps) {
  const {
    currentQuestion,
    isReadingComplete,
    getMaxCards
  } = useTarotStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          選擇您的牌卡
        </h2>
        {currentQuestion && (
          <p className="text-gray-600 italic mb-4">
            「{currentQuestion}」
          </p>
        )}
        <p className="text-sm text-gray-500">
          請選擇 {getMaxCards()} 張牌來完成您的占卜
        </p>
      </div>

      {/* 選牌區域 */}
      {!isReadingComplete() && (
        <CardDeck
          onCardSelect={onCardSelect}
          maxSelection={getMaxCards()}
        />
      )}

      {/* 操作按鈕 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onBackToSetup}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          重新設置
        </button>
        {isReadingComplete() && (
          <button
            onClick={onViewResult}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            查看結果
          </button>
        )}
      </div>
    </div>
  );
} 