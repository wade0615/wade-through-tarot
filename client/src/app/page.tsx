"use client";

import { useState, useEffect } from "react";
import { useTarotStore } from "@/store/tarotStore";
import { TarotCard } from "@/data/tarotCards";
import { SetupView } from "@/components/SetupView";
import { SelectionView } from "@/components/SelectionView";
import { ResultView } from "@/components/ResultView";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import OfflineIndicator from "@/components/OfflineIndicator";
import { BannerAd, RectangleAd } from "@/components/GoogleAds";
import { getAdSlot } from "@/config/ads";
import {
  trackReadingStart,
  trackCardSelection,
  trackReadingComplete,
  trackPageView,
} from "@/components/GoogleAnalytics";

type ViewState = "setup" | "selection" | "result";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>("setup");
  const [readingStartTime, setReadingStartTime] = useState<number>(0);
  const {
    currentQuestion,
    spreadType,
    selectedCards,
    selectCard,
    clearSelection,
    getMaxCards,
  } = useTarotStore();

  // 追蹤頁面瀏覽
  useEffect(() => {
    trackPageView("首頁");
  }, []);

  /**
   * 處理牌卡選擇事件
   * @param card - 被選中的塔羅牌
   * @param isReversed - 是否為逆位
   */
  const handleCardSelect = (card: TarotCard, isReversed: boolean) => {
    const nextPosition = selectedCards.length;
    selectCard(card, nextPosition, isReversed);

    // 追蹤牌卡選擇事件
    trackCardSelection(card.name, nextPosition, isReversed);

    // 如果達到最大牌數，自動切換到結果頁
    if (selectedCards.length + 1 >= getMaxCards()) {
      setTimeout(() => {
        setCurrentView("result");

        // 追蹤占卜完成事件
        const readingDuration = Date.now() - readingStartTime;
        trackReadingComplete(spreadType, getMaxCards(), readingDuration);
      }, 500);
    }
  };

  /**
   * 開始新的占卜，清空當前選擇並回到設置頁面
   */
  const handleNewReading = () => {
    clearSelection();
    setCurrentView("setup");
    setReadingStartTime(0);
  };

  /**
   * 處理問題提交，從設置頁面切換到選牌頁面
   */
  const handleQuestionSubmit = () => {
    // 追蹤占卜開始事件
    trackReadingStart(spreadType, currentQuestion);
    setReadingStartTime(Date.now());
    setCurrentView("selection");
  };

  /**
   * 從選牌頁面返回設置頁面
   */
  const handleBackToSetup = () => {
    setCurrentView("setup");
    setReadingStartTime(0);
  };

  /**
   * 從選牌頁面切換到結果頁面
   */
  const handleViewResult = () => {
    setCurrentView("result");

    // 追蹤占卜完成事件
    const readingDuration = Date.now() - readingStartTime;
    trackReadingComplete(spreadType, selectedCards.length, readingDuration);
  };

  /**
   * 處理保存占卜結果
   */
  const handleSaveReading = () => {
    // 可以添加保存成功的提示
    alert("占卜結果已保存！");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900">
      {/* 頂部廣告 */}
      <div className="w-full">
        <BannerAd adSlot={getAdSlot("HOME_TOP_BANNER")} />
      </div>

      <div className="container mx-auto px-4 py-8">
        {currentView === "setup" && (
          <SetupView onQuestionSubmit={handleQuestionSubmit} />
        )}
        {currentView === "selection" && (
          <SelectionView
            onCardSelect={handleCardSelect}
            onBackToSetup={handleBackToSetup}
            onViewResult={handleViewResult}
          />
        )}
        {currentView === "result" && (
          <div className="space-y-8">
            {/* 結果頁面頂部廣告 */}
            <RectangleAd adSlot={getAdSlot("RESULT_PAGE_RECTANGLE")} />

            <ResultView
              onNewReading={handleNewReading}
              onSaveReading={handleSaveReading}
            />
          </div>
        )}
      </div>

      {/* 底部廣告 */}
      <div className="w-full">
        <BannerAd adSlot={getAdSlot("HOME_BOTTOM_BANNER")} />
      </div>

      <PWAInstallPrompt />
      <OfflineIndicator />
    </main>
  );
}
