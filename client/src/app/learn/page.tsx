"use client";

import { ResponsiveAd } from "@/components/GoogleAds";
import { getAdSlot } from "@/config/ads";

export default function LearnPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0F0F23]">
      {/* 背景裝飾 */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto py-8 px-4 relative z-10">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-6">
          塔羅牌新手教學
        </h1>

        <section className="glass-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-purple-200 mb-3">
            塔羅占卜是什麼？
          </h2>
          <p className="text-slate-300 leading-relaxed">
            塔羅占卜是一種結合心理學、象徵學與直覺的自我探索工具。透過抽牌與解讀牌義，幫助你釐清現況、預見未來、獲得建議。
          </p>
        </section>

        <section className="glass-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-purple-200 mb-3">
            如何開始塔羅占卜？
          </h2>
          <ol className="space-y-2 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-amber-400 font-semibold">1.</span>
              <span>靜下心來，專注於你想詢問的問題</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 font-semibold">2.</span>
              <span>選擇適合的牌陣（單張牌、三張牌、凱爾特十字等）</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 font-semibold">3.</span>
              <span>依序抽出牌卡，並記錄正逆位</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400 font-semibold">4.</span>
              <span>根據每張牌的牌義與位置，綜合解讀</span>
            </li>
          </ol>
        </section>

        {/* 廣告 */}
        <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

        <section className="glass-card p-6 mt-6">
          <h2 className="text-xl font-semibold text-purple-200 mb-4">常見問題</h2>
          <div className="space-y-4">
            <div className="border-b border-purple-500/20 pb-4">
              <p className="text-purple-300 font-medium mb-1">Q: 塔羅牌可以預測未來嗎？</p>
              <p className="text-slate-400 text-sm">
                A: 塔羅牌更像是「指引」而非「預言」，協助你看清現況與潛在可能性。
              </p>
            </div>
            <div className="border-b border-purple-500/20 pb-4">
              <p className="text-purple-300 font-medium mb-1">Q: 線上抽牌準嗎？</p>
              <p className="text-slate-400 text-sm">
                A: 只要你專注於問題，線上抽牌與實體抽牌一樣有效。
              </p>
            </div>
            <div>
              <p className="text-purple-300 font-medium mb-1">Q: 什麼時候適合占卜？</p>
              <p className="text-slate-400 text-sm">
                A: 當你對某件事感到迷惘、需要建議時，都可以使用塔羅占卜。
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
