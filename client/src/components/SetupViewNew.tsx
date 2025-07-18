'use client';

import { useTarotStore } from '@/store/tarotStore';
import { cn } from '@/utils/helpers';

interface SetupViewNewProps {
  onQuestionSubmit: () => void;
}

/**
 * 設置頁面組件 - 用於選擇牌陣和輸入問題
 * 淺色主題版本
 */
export function SetupViewNew({ onQuestionSubmit }: SetupViewNewProps) {
  const {
    currentQuestion,
    setQuestion,
    spreadType,
    setSpreadType
  } = useTarotStore();

  /**
   * 處理表單提交事件
   * @param e - 表單提交事件
   */
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuestionSubmit();
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Wade Through Tarot
        </h1>
        <p className="text-lg text-gray-600">
          歡迎來到塔羅占卜世界，讓直覺引導您找到答案
        </p>
      </div>

      {/* 牌陣選擇 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">選擇牌陣</h2>
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
                'hover:shadow-md',
                spreadType === spread.type
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300'
              )}
            >
              <div className="font-medium">{spread.name}</div>
              <div className="text-sm text-gray-500 mt-1">{spread.desc}</div>
              <div className="text-xs text-gray-400 mt-1">{spread.cards} 張牌</div>
            </button>
          ))}
        </div>
      </div>

      {/* 問題輸入 */}
      <form onSubmit={handleQuestionSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            您想要詢問的問題（可選）
          </label>
          <textarea
            value={currentQuestion}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例如：我在事業上應該做什麼選擇？"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          開始占卜
        </button>
      </form>
    </div>
  );
} 