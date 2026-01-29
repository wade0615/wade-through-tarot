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
      {/* <header className="space-y-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          Wade Through Tarot
        </h1>
        <p className="text-lg text-blue-200">讓牌面指引找到內心的答案</p>
        <p className="text-sm text-gray-300">
          免費線上塔羅占卜，提供專業的塔羅牌解析和靈性指引
        </p>
      </header> */}

      {/* 功能特色 - 毛玻璃卡片 */}
      <section className="glass-card p-6 hover-lift">
        <h2 className="text-xl font-semibold text-purple-200 mb-4">平台特色</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="flex items-center space-x-3">
            <span className="text-amber-400">✦</span>
            <span>78張偉特塔羅牌完整解析</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-amber-400">✦</span>
            <span>三種專業牌陣選擇</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-amber-400">✦</span>
            <span>正逆位詳細解釋</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-amber-400">✦</span>
            <span>AI 智能抽牌系統</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-amber-400">✦</span>
            <span>完全免費使用</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-amber-400">✦</span>
            <span>離線也能使用</span>
          </div>
        </div>
      </section>

      {/* 牌陣選擇 */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-purple-200">選擇牌陣</h2>
          <p className="text-sm text-slate-400 mt-2">
            根據您的問題複雜程度選擇合適的牌陣
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                "p-5 rounded-xl border transition-all duration-300 cursor-pointer",
                "backdrop-blur-md hover:-translate-y-1",
                spreadType === spread.type
                  ? "bg-purple-500/15 border-purple-400/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                  : "bg-white/5 border-white/10 hover:bg-purple-500/10 hover:border-purple-400/30 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]"
              )}
            >
              <button
                onClick={() => setSpreadType(spread.type)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn(
                    "font-medium text-lg",
                    spreadType === spread.type ? "text-purple-200" : "text-slate-200"
                  )}>{spread.name}</h3>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    spreadType === spread.type
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-slate-700/50 text-slate-400"
                  )}>
                    {spread.cards} 張
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">{spread.desc}</p>
                <p className={cn(
                  "text-xs mt-3 pt-3 border-t",
                  spreadType === spread.type
                    ? "border-purple-500/30 text-purple-300"
                    : "border-white/10 text-slate-500"
                )}>
                  適合：{spread.bestFor}
                </p>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* 問題輸入 */}
      <section>
        <form onSubmit={handleQuestionSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-3">
              想問什麼？（可選）
            </label>
            <textarea
              value={currentQuestion}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我該如何面對目前的挑戰？我的感情發展如何？事業上需要注意什麼？"
              className="w-full p-4 bg-white/5 border border-purple-500/20 rounded-xl
                focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50
                focus:bg-purple-500/5 resize-none text-white placeholder-slate-500
                backdrop-blur-md transition-all duration-300"
              rows={3}
              aria-describedby="question-help"
            />
            <p id="question-help" className="text-xs text-slate-500 mt-2">
              輸入您的問題可以幫助您更好地理解牌面的含義
            </p>
          </div>

          {/* Google Ads 廣告位置 */}
          <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

          <button
            type="submit"
            className="w-full py-4 min-h-[48px] bg-gradient-to-r from-amber-600 to-amber-500
              text-slate-900 rounded-xl font-semibold
              hover:from-amber-500 hover:to-amber-400
              hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]
              transition-all duration-300 shadow-lg"
            aria-label="開始塔羅占卜"
          >
            開始占卜
          </button>
        </form>
      </section>

      {/* 額外功能 */}
      <section className="space-y-5 mb-12">
        <button
          type="button"
          onClick={() => router.push("/cards")}
          className="w-full py-3 min-h-[44px] bg-purple-500/20 text-purple-200
            border border-purple-400/30 rounded-xl font-medium
            hover:bg-purple-500/30 hover:border-purple-400/50
            hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]
            transition-all duration-300"
          aria-label="查看全部78張塔羅牌面"
        >
          查看所有牌面
        </button>

        <div className="text-center pt-4">
          <p className="text-xs text-slate-500">
            開始您的塔羅占卜之旅，探索內心的智慧與指引
          </p>
        </div>
      </section>
    </div>
  );
}
