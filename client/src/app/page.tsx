'use client';

import { useState } from 'react';
import { useTarotStore } from '@/store/tarotStore';
import { CardDeck } from '@/components/CardDeck';
import { SpreadLayout } from '@/components/SpreadLayout';
import { ReadingResult } from '@/components/ReadingResult';
import { cn } from '@/utils/helpers';

type ViewState = 'setup' | 'selection' | 'result';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('setup');
  const {
    currentQuestion,
    setQuestion,
    spreadType,
    setSpreadType,
    selectedCards,
    selectCard,
    clearSelection,
    isReadingComplete,
    getMaxCards
  } = useTarotStore();

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('selection');
  };

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

  const handleNewReading = () => {
    clearSelection();
    setCurrentView('setup');
  };

  const renderSetupView = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          Wade Through Tarot
        </h1>
        <p className="text-lg text-blue-200">
          說一就是一，說二還是一，讓直覺引導找到答案
        </p>
      </div>

      {/* 牌陣選擇 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-100">選擇牌陣</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: 'single' as const, name: '單張牌', desc: '簡單問題或每日指引', cards: 1 },
            { type: 'three-card' as const, name: '三張牌', desc: '過去現在未來', cards: 3 },
            { type: 'celtic-cross' as const, name: '凱爾特十字', desc: '複雜問題深度分析', cards: 10 }
          ].map((spread) => (
            <button
              key={spread.type}
              onClick={() => setSpreadType(spread.type)}
              className={cn(
                'p-4 rounded-lg border-2 transition-all',
                'hover:shadow-md bg-slate-800/50 backdrop-blur-sm',
                spreadType === spread.type
                  ? 'border-blue-400 bg-blue-900/30 text-blue-200'
                  : 'border-slate-600 hover:border-blue-500 text-slate-200'
              )}
            >
              <div className="font-medium">{spread.name}</div>
              <div className="text-sm text-slate-400 mt-1">{spread.desc}</div>
              <div className="text-xs text-slate-500 mt-1">{spread.cards} 張牌</div>
            </button>
          ))}
        </div>
      </div>

      {/* 問題輸入 */}
      <form onSubmit={handleQuestionSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-2">
            想問什麼廢話？（可選）
          </label>
          <textarea
            value={currentQuestion}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例如：哥布林跟女精靈是有未來的嗎？"
            className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-slate-400 backdrop-blur-sm"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          開始占卜
        </button>
      </form>
    </div>
  );

  const renderSelectionView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          選擇您的牌卡
        </h2>
        {currentQuestion && (
          <p className="text-blue-200 italic mb-4">
            「{currentQuestion}」
          </p>
        )}
        <p className="text-sm text-slate-400">
          請選擇 {getMaxCards()} 張牌來完成您的占卜
        </p>
      </div>

      {/* 牌陣佈局 */}
      <SpreadLayout />

      {/* 選牌區域 */}
      {!isReadingComplete() && (
        <CardDeck
          onCardSelect={handleCardSelect}
          maxSelection={getMaxCards()}
        />
      )}

      {/* 操作按鈕 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setCurrentView('setup')}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          重新設置
        </button>
        {isReadingComplete() && (
          <button
            onClick={() => setCurrentView('result')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看結果
          </button>
        )}
      </div>
    </div>
  );

  const renderResultView = () => (
    <ReadingResult
      onNewReading={handleNewReading}
      onSaveReading={() => {
        // 可以添加保存成功的提示
        alert('占卜結果已保存！');
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'setup' && renderSetupView()}
        {currentView === 'selection' && renderSelectionView()}
        {currentView === 'result' && renderResultView()}
      </div>
    </div>
  );
}
