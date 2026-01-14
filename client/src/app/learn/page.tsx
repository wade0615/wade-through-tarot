"use client";

import { ResponsiveAd } from "@/components/GoogleAds";
import { getAdSlot } from "@/config/ads";

export default function LearnPage() {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4 min-h-[100dvh]">
      <h1 className="text-3xl font-bold text-blue-200 mb-4">塔羅牌新手教學</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-100 mb-2">
          塔羅占卜是什麼？
        </h2>
        <p className="text-blue-100">
          塔羅占卜是一種結合心理學、象徵學與直覺的自我探索工具。透過抽牌與解讀牌義，幫助你釐清現況、預見未來、獲得建議。
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-100 mb-2">
          如何開始塔羅占卜？
        </h2>
        <ol className="list-decimal list-inside text-blue-100 space-y-1">
          <li>靜下心來，專注於你想詢問的問題</li>
          <li>選擇適合的牌陣（單張牌、三張牌、凱爾特十字等）</li>
          <li>依序抽出牌卡，並記錄正逆位</li>
          <li>根據每張牌的牌義與位置，綜合解讀</li>
        </ol>
      </section>
      {/* 廣告 */}
      <ResponsiveAd adSlot={getAdSlot("RESPONSIVE_GENERAL")} />

      <section>
        <h2 className="text-xl font-semibold text-blue-100 mb-2">常見問題</h2>
        <ul className="list-disc list-inside text-blue-100">
          <li>
            Q: 塔羅牌可以預測未來嗎？
            <br />
            A: 塔羅牌更像是「指引」而非「預言」，協助你看清現況與潛在可能性。
          </li>
          <li>
            Q: 線上抽牌準嗎？
            <br />
            A: 只要你專注於問題，線上抽牌與實體抽牌一樣有效。
          </li>
          <li>
            Q: 什麼時候適合占卜？
            <br />
            A: 當你對某件事感到迷惘、需要建議時，都可以使用塔羅占卜。
          </li>
        </ul>
      </section>
    </main>
  );
}
