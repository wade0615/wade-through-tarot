"use client";
export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto py-8 px-4 min-h-[100dvh]">
      <h1 className="text-3xl font-bold text-blue-200 mb-4">隱私權政策</h1>
      <p className="text-blue-100 mb-4">
        我們重視您的隱私。所有占卜問題與結果僅用於個人參考，不會被儲存或用於任何商業用途。網站使用
        Google Analytics 與 Google AdSense 追蹤與廣告服務，僅收集匿名流量數據。
      </p>
      <h2 className="text-xl font-semibold text-blue-100 mt-6 mb-2">
        資料收集與使用
      </h2>
      <ul className="list-disc list-inside text-blue-100 mb-4">
        <li>不會儲存您的占卜問題內容</li>
        <li>不會主動收集個人身份資訊</li>
        <li>僅用於網站流量分析與廣告投放</li>
      </ul>
    </main>
  );
}
