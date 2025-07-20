"use client";

import { useRouter } from "next/navigation";
import { useTarotStore } from "@/store/tarotStore";
import { cn } from "@/utils/helpers";
import { ResponsiveAd } from "@/components/GoogleAds";
import { getAdSlot } from "@/config/ads";

interface SetupViewProps {
  onQuestionSubmit: () => void;
}

/**
 * 設置頁面組件 - 用於選擇牌陣和輸入問題
 * 深色主題版本
 */
export function SetupView({ onQuestionSubmit }: SetupViewProps) {
  const router = useRouter();
  const { currentQuestion, setQuestion, spreadType, setSpreadType } =
    useTarotStore();

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
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          Wade Through Tarot
        </h1>
        <p className="text-lg text-blue-200">讓牌面指引找到內心的答案</p>
        <p className="text-sm text-gray-300">
          免費線上塔羅占卜，提供專業的塔羅牌解析和靈性指引
        </p>
      </header>

      {/* 功能特色 */}
      <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-100 mb-4">平台特色</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">✓</span>
            <span>78張偉特塔羅牌完整解析</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">✓</span>
            <span>三種專業牌陣選擇</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">✓</span>
            <span>正逆位詳細解釋</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">✓</span>
            <span>AI 智能抽牌系統</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">✓</span>
            <span>完全免費使用</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">✓</span>
            <span>離線也能使用</span>
          </div>
        </div>
      </section>

      {/* 牌陣選擇 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-100">選擇牌陣</h2>
        <p className="text-sm text-gray-300 mb-4">
          根據您的問題複雜程度選擇合適的牌陣
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              type: "single" as const,
              name: "單張牌",
              desc: "簡單問題或每日指引",
              cards: 1,
              bestFor: "日常問題、快速指引",
            },
            {
              type: "three-card" as const,
              name: "三張牌",
              desc: "過去現在未來",
              cards: 3,
              bestFor: "時間軸分析、發展趨勢",
            },
            {
              type: "celtic-cross" as const,
              name: "凱爾特十字",
              desc: "複雜問題深度分析",
              cards: 10,
              bestFor: "複雜問題、深度解析",
            },
          ].map((spread) => (
            <article
              key={spread.type}
              className={cn(
                "p-4 rounded-lg border-2 transition-all",
                "hover:shadow-md bg-slate-800/50 backdrop-blur-sm",
                spreadType === spread.type
                  ? "border-blue-400 bg-blue-900/30 text-blue-200"
                  : "border-slate-600 hover:border-blue-500 text-slate-200"
              )}
            >
              <button
                onClick={() => setSpreadType(spread.type)}
                className="w-full text-left"
              >
                <h3 className="font-medium text-lg">{spread.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{spread.desc}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {spread.cards} 張牌
                </p>
                <p className="text-xs text-blue-300 mt-2">
                  適合：{spread.bestFor}
                </p>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* 問題輸入 */}
      <section>
        <form onSubmit={handleQuestionSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              想問什麼？（可選）
            </label>
            <textarea
              value={currentQuestion}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我該如何面對目前的挑戰？我的感情發展如何？事業上需要注意什麼？"
              className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-slate-400 backdrop-blur-sm"
              rows={3}
              aria-describedby="question-help"
            />
            <p id="question-help" className="text-xs text-gray-400 mt-1">
              輸入您的問題可以幫助您更好地理解牌面的含義
            </p>
          </div>

          {/* Google Ads 廣告位置 */}
          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          <button
            type="submit"
            className="w-full py-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            開始占卜
          </button>
        </form>
      </section>

      {/* 額外功能 */}
      <section className="space-y-4">
        <button
          type="button"
          onClick={() => router.push("/cards")}
          className="w-full py-3 bg-purple-300 text-purple-900 rounded-lg font-medium hover:bg-purple-400 transition-colors shadow-lg"
        >
          查看所有牌面
        </button>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            開始您的塔羅占卜之旅，探索內心的智慧與指引
          </p>
        </div>
      </section>
    </div>
  );
}
