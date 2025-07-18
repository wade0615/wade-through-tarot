"use client";

import { useRouter } from "next/navigation";
import { useTarotStore } from "@/store/tarotStore";
import { cn } from "@/utils/helpers";

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
            {
              type: "single" as const,
              name: "單張牌",
              desc: "簡單問題或每日指引",
              cards: 1,
            },
            {
              type: "three-card" as const,
              name: "三張牌",
              desc: "過去現在未來",
              cards: 3,
            },
            {
              type: "celtic-cross" as const,
              name: "凱爾特十字",
              desc: "複雜問題深度分析",
              cards: 10,
            },
          ].map((spread) => (
            <button
              key={spread.type}
              onClick={() => setSpreadType(spread.type)}
              className={cn(
                "p-4 rounded-lg border-2 transition-all",
                "hover:shadow-md bg-slate-800/50 backdrop-blur-sm",
                spreadType === spread.type
                  ? "border-blue-400 bg-blue-900/30 text-blue-200"
                  : "border-slate-600 hover:border-blue-500 text-slate-200"
              )}
            >
              <div className="font-medium">{spread.name}</div>
              <div className="text-sm text-slate-400 mt-1">{spread.desc}</div>
              <div className="text-xs text-slate-500 mt-1">
                {spread.cards} 張牌
              </div>
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
          className="w-full py-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          開始占卜
        </button>
        <button
          type="button"
          onClick={() => router.push("/cards")}
          className="w-full py-3 bg-purple-300 text-purple-900 rounded-lg font-medium hover:bg-purple-400 transition-colors shadow-lg"
        >
          查看所有牌面
        </button>
      </form>
    </div>
  );
}
