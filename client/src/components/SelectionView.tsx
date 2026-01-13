"use client";

import { CardDeck } from "./CardDeck";
import { useTarotStore } from "@/store/tarotStore";
import { TarotCard } from "@/data/tarotCards";
import { ResponsiveAd } from "@/components/GoogleAds";
import { getAdSlot } from "@/config/ads";

interface SelectionViewProps {
  onCardSelect: (card: TarotCard, isReversed: boolean) => void;
  onBackToSetup: () => void;
  onViewResult: () => void;
}

/**
 * 選牌頁面組件 - 用於從牌堆中選擇牌卡
 * 深色主題版本
 */
export function SelectionView({
  onCardSelect,
  onBackToSetup,
  onViewResult,
}: SelectionViewProps) {
  const { currentQuestion, isReadingComplete, getMaxCards } = useTarotStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">選擇您的牌卡</h2>
        {currentQuestion && (
          <p className="text-blue-200 italic mb-4">「{currentQuestion}」</p>
        )}
        <p className="text-sm text-slate-400">
          請選擇 {getMaxCards()} 張牌來完成占卜
        </p>
      </div>

      {/* Google Ads 廣告位置 */}
      <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

      {/* 選牌區域 */}
      {!isReadingComplete() && (
        <CardDeck onCardSelect={onCardSelect} maxSelection={getMaxCards()} />
      )}

      {/* 操作按鈕 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onBackToSetup}
          className="px-6 py-3 min-h-[44px] bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          aria-label="重新開始占卜"
        >
          重新開始
        </button>
        {isReadingComplete() && (
          <button
            onClick={onViewResult}
            className="px-6 py-3 min-h-[44px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="查看占卜結果"
          >
            查看結果
          </button>
        )}
      </div>
    </div>
  );
}
