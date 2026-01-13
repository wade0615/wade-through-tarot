"use client"

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/helpers'

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'privacy'>('about')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* 導航 */}
        <nav className="mb-8">
          <Link
            href="/"
            className="text-blue-300 hover:text-blue-100 transition-colors"
          >
            ← 返回首頁
          </Link>
        </nav>

        {/* Tab 切換 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('about')}
              className={cn(
                "flex-1 px-6 py-4 min-h-[48px] text-lg font-medium transition-colors",
                activeTab === 'about'
                  ? 'bg-white/20 text-white'
                  : 'text-blue-200 hover:bg-white/10'
              )}
              aria-label="切換到關於我們"
            >
              關於我們
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={cn(
                "flex-1 px-6 py-4 min-h-[48px] text-lg font-medium transition-colors",
                activeTab === 'privacy'
                  ? 'bg-white/20 text-white'
                  : 'text-blue-200 hover:bg-white/10'
              )}
              aria-label="切換到隱私權政策"
            >
              隱私權政策
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'about' && (
              <section>
                <h1 className="text-3xl font-bold text-white mb-6">
                  關於 Wade Through Tarot
                </h1>

                <div className="space-y-4 text-blue-100 leading-relaxed">
                  <p>
                    Wade Through Tarot 是一個致力於推廣塔羅文化與自我探索的線上平台。
                    我們結合 AI 技術與經典塔羅智慧，讓每個人都能隨時隨地獲得專業的塔羅指引。
                  </p>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    我們的使命
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>讓塔羅占卜變得更容易親近</li>
                    <li>提供準確、專業的牌義解讀</li>
                    <li>協助使用者自我探索與成長</li>
                    <li>保護使用者隱私與資料安全</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    我們的特色
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>78 張完整偉特塔羅牌</li>
                    <li>多種牌陣選擇（單張牌、三張牌、塞爾特十字）</li>
                    <li>詳細的正逆位解析</li>
                    <li>完全免費使用</li>
                    <li>響應式設計，支援各種裝置</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    聯絡我們
                  </h2>
                  <p>
                    如有任何問題或建議，歡迎透過 GitHub Issues 與我們聯繫。
                  </p>
                </div>
              </section>
            )}

            {activeTab === 'privacy' && (
              <section>
                <h1 className="text-3xl font-bold text-white mb-6">
                  隱私權政策
                </h1>

                <div className="space-y-4 text-blue-100 leading-relaxed">
                  <p className="text-sm text-slate-300">
                    最後更新日期：2026-01-07
                  </p>

                  <p>
                    我們重視您的隱私。本隱私權政策說明 Wade Through Tarot
                    如何收集、使用和保護您的資訊。
                  </p>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    資料收集與使用
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>占卜資料</strong>：您的占卜問題與結果僅儲存在您的瀏覽器本地端（LocalStorage），
                      不會上傳至伺服器或用於任何商業用途
                    </li>
                    <li>
                      <strong>分析數據</strong>：網站使用 Google Analytics
                      收集匿名的流量數據，用於了解使用者行為和改善服務
                    </li>
                    <li>
                      <strong>廣告服務</strong>：網站使用 Google AdSense
                      顯示廣告，Google 可能會使用 cookies 追蹤您的瀏覽行為
                    </li>
                  </ul>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    我們不會收集的資料
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>個人身份資訊（姓名、電話、地址等）</li>
                    <li>信用卡或付款資訊</li>
                    <li>您的具體占卜問題內容</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    Cookies 使用
                  </h2>
                  <p>
                    本網站使用 cookies 來提供更好的使用體驗。您可以透過瀏覽器設定
                    拒絕或刪除 cookies，但這可能會影響部分功能的正常運作。
                  </p>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    資料安全
                  </h2>
                  <p>
                    我們採取合理的技術與管理措施來保護您的資料安全。然而，
                    請注意沒有任何網路傳輸或電子儲存方式是 100% 安全的。
                  </p>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    第三方服務
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Google Analytics</strong>：{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-100 underline"
                      >
                        Google 隱私權政策
                      </a>
                    </li>
                    <li>
                      <strong>Google AdSense</strong>：{' '}
                      <a
                        href="https://policies.google.com/technologies/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-100 underline"
                      >
                        Google 廣告政策
                      </a>
                    </li>
                  </ul>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    政策變更
                  </h2>
                  <p>
                    我們可能會不定期更新本隱私權政策。任何重大變更都會在本頁面公告。
                    建議您定期查看本政策以了解最新資訊。
                  </p>

                  <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                    聯絡我們
                  </h2>
                  <p>
                    如對本隱私權政策有任何疑問，請透過 GitHub Issues 與我們聯繫。
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
