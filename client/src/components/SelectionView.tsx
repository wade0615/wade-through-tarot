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
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100 mb-3">
          選擇您的牌卡
        </h2>
        {currentQuestion && (
          <p className="text-purple-300/80 italic mb-4">「{currentQuestion}」</p>
        )}
        <p className="text-sm text-slate-500">
          請選擇 <span className="text-amber-400">{getMaxCards()}</span> 張牌來完成占卜
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
          className="px-6 py-3 min-h-[44px] bg-white/5 border border-purple-500/30 text-purple-200
            rounded-xl hover:bg-purple-500/15 hover:border-purple-400/50
            transition-all duration-300"
          aria-label="重新開始占卜"
        >
          重新開始
        </button>
        {isReadingComplete() && (
          <button
            onClick={onViewResult}
            className="px-6 py-3 min-h-[44px] bg-gradient-to-r from-amber-600 to-amber-500
              text-slate-900 font-semibold rounded-xl
              hover:from-amber-500 hover:to-amber-400
              hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]
              transition-all duration-300"
            aria-label="查看占卜結果"
          >
            查看結果
          </button>
        )}
      </div>
    </div>
  );
}
