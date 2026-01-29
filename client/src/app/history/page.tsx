"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { storageService } from "@/services/storage"
import { StoredReading } from "@/types/storage"
import { getTarotCardById } from "@/data/tarotCards"
import { Trash2, Calendar, HelpCircle } from "lucide-react"

export default function HistoryPage() {
  const [readings, setReadings] = useState<StoredReading[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadReadings()
  }, [])

  const loadReadings = () => {
    try {
      const storedReadings = storageService.getAllReadings()
      setReadings(storedReadings)
    } catch (error) {
      console.error("Failed to load readings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    if (!confirm("確定要刪除這筆占卜記錄嗎？")) {
      return
    }

    try {
      storageService.deleteReading(id)
      loadReadings()
    } catch (error) {
      console.error("Failed to delete reading:", error)
      alert("刪除失敗，請稍後再試")
    }
  }

  const handleClearAll = () => {
    if (!confirm("確定要清空所有占卜記錄嗎？此操作無法復原！")) {
      return
    }

    try {
      storageService.clearAllReadings()
      loadReadings()
    } catch (error) {
      console.error("Failed to clear readings:", error)
      alert("清空失敗，請稍後再試")
    }
  }

  const getSpreadTypeName = (type: string) => {
    switch (type) {
      case "single":
        return "單張牌"
      case "three-card":
        return "三張牌"
      case "celtic-cross":
        return "塞爾特十字"
      default:
        return type
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F23] flex items-center justify-center">
        <div className="text-purple-200 text-xl animate-pulse">載入中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F23]">
      {/* 背景裝飾 */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto py-8 px-4 relative z-10">
        {/* 導航 */}
        <nav className="mb-8">
          <Link
            href="/"
            className="text-purple-300 hover:text-amber-300 transition-colors duration-200"
          >
            ← 返回首頁
          </Link>
        </nav>

        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-amber-200 mb-4">
            占卜記錄
          </h1>
          <p className="text-slate-400">
            最多保存 10 筆記錄，舊記錄會自動刪除
          </p>
        </div>

        {/* 清空按鈕 */}
        {readings.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-300
                hover:bg-red-500/30 hover:border-red-400/50
                rounded-xl transition-all duration-200 flex items-center gap-2"
              aria-label="清空所有記錄"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              清空所有記錄
            </button>
          </div>
        )}

        {/* 記錄列表 */}
        {readings.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="text-purple-200 text-lg mb-4">尚無占卜記錄</div>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500
                text-slate-900 font-semibold rounded-xl
                hover:from-amber-500 hover:to-amber-400
                hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]
                transition-all duration-300"
            >
              開始占卜
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {readings.map((reading) => (
              <div
                key={reading.id}
                className="glass-card-subtle p-6 hover:bg-purple-500/10 transition-all duration-200"
              >
                {/* 標題列 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {/* 日期 */}
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span>{formatDate(reading.timestamp)}</span>
                    </div>

                    {/* 問題 */}
                    <div className="flex items-start gap-2 mb-2">
                      <HelpCircle
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="text-purple-100 text-lg font-medium">
                        {reading.question || "未記錄問題"}
                      </div>
                    </div>

                    {/* 牌陣類型 */}
                    <div className="text-slate-400 text-sm">
                      牌陣：<span className="text-amber-400">{getSpreadTypeName(reading.spreadType)}</span>
                    </div>
                  </div>

                  {/* 刪除按鈕 */}
                  <button
                    onClick={() => handleDelete(reading.id)}
                    className="p-2 text-red-400/70 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    aria-label="刪除此記錄"
                  >
                    <Trash2 className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                {/* 卡牌列表 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {reading.cards.map((cardData, index) => {
                    const card = getTarotCardById(cardData.cardId)
                    if (!card) return null

                    return (
                      <div
                        key={`${reading.id}-${index}`}
                        className="text-center"
                      >
                        <div className="relative mb-2">
                          <div
                            className={`bg-white/90 rounded-lg p-2 shadow-lg ${
                              cardData.isReversed ? "rotate-180" : ""
                            }`}
                          >
                            <Image
                              src={card.imageUrl}
                              alt={card.name}
                              width={200}
                              height={350}
                              className="w-full h-auto"
                            />
                          </div>
                          {cardData.isReversed && (
                            <span className="absolute top-1 right-1 bg-red-500/80 text-white text-xs px-2 py-1 rounded-full">
                              逆位
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400 text-sm">
                          位置 {cardData.position + 1}
                        </div>
                        <div className="text-purple-200 text-xs">{card.name}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
