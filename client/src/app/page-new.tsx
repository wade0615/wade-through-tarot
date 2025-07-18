'use client';

import { useState } from 'react';
import { useTarotStore } from '@/store/tarotStore';
import { SetupViewNew } from '@/components/SetupViewNew';
import { SelectionViewNew } from '@/components/SelectionViewNew';
import { ResultViewNew } from '@/components/ResultViewNew';

type ViewState = 'setup' | 'selection' | 'result';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('setup');
  const {
    // currentQuestion,
    // setQuestion,
    // spreadType,
    // setSpreadType,
    selectedCards,
    selectCard,
    clearSelection,
    // isReadingComplete,
    getMaxCards
  } = useTarotStore();

  /**
   * 處理牌卡選擇事件
   * @param card - 被選中的塔羅牌
   * @param isReversed - 是否為逆位
   */
  const handleCardSelect = (card: any, isReversed: boolean) => {
    const nextPosition = selectedCards.length;
    selectCard(card, nextPosition, isReversed);
    
    // 如果達到最大牌數，自動切換到結果頁
    if (selectedCards.length + 1 >= getMaxCards()) {
      setTimeout(() => {
        setCurrentView('result');
      }, 500);
    }
  };

  /**
   * 開始新的占卜，清空當前選擇並回到設置頁面
   */
  const handleNewReading = () => {
    clearSelection();
    setCurrentView('setup');
  };

  /**
   * 處理問題提交，從設置頁面切換到選牌頁面
   */
  const handleQuestionSubmit = () => {
    setCurrentView('selection');
  };

  /**
   * 從選牌頁面返回設置頁面
   */
  const handleBackToSetup = () => {
    setCurrentView('setup');
  };

  /**
   * 從選牌頁面切換到結果頁面
   */
  const handleViewResult = () => {
    setCurrentView('result');
  };

  /**
   * 處理保存占卜結果
   */
  const handleSaveReading = () => {
    // 可以添加保存成功的提示
    alert('占卜結果已保存！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'setup' && (
          <SetupViewNew onQuestionSubmit={handleQuestionSubmit} />
        )}
        {currentView === 'selection' && (
          <SelectionViewNew 
            onCardSelect={handleCardSelect}
            onBackToSetup={handleBackToSetup}
            onViewResult={handleViewResult}
          />
        )}
        {currentView === 'result' && (
          <ResultViewNew 
            onNewReading={handleNewReading}
            onSaveReading={handleSaveReading}
          />
        )}
      </div>
    </div>
  );
}
