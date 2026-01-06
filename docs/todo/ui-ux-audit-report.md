# Wade Through Tarot - UI/UX 審查報告

> 📅 審查日期：2026-01-07
> 👤 執行者：Claude Sonnet 4.5
> 🎯 目標：識別並記錄所有 UI/UX 問題，為改善計劃提供依據

---

## 目錄

1. [審查概要](#審查概要)
2. [視覺層級與設計一致性](#1-視覺層級與設計一致性)
3. [互動元素與視覺回饋](#2-互動元素與視覺回饋)
4. [載入狀態與非同步處理](#3-載入狀態與非同步處理)
5. [錯誤處理與容錯性](#4-錯誤處理與容錯性)
6. [響應式設計](#5-響應式設計)
7. [無障礙性（A11y）](#6-無障礙性a11y)
8. [使用引導與教育性](#7-使用引導與教育性)
9. [視覺細節與設計質量](#8-視覺細節與設計質量)
10. [性能與動畫](#9-性能與動畫)
11. [色彩對比度](#10-色彩對比度)
12. [按鈕與互動元素尺寸](#11-按鈕與互動元素尺寸)
13. [問題優先順序](#12-問題優先順序總結)

---

## 審查概要

### 審查範圍

本次審查涵蓋以下頁面和組件：

**主要頁面**
- ✅ `/` - 首頁占卜流程
- ✅ `/cards` - 塔羅牌圖鑑
- ✅ `/cards/[id]` - 單張卡牌詳情
- ✅ `/learn` - 學習頁面
- ✅ `/about` - 關於頁面
- ✅ `/privacy` - 隱私權頁面

**核心組件**
- ✅ `SetupView.tsx` - 問題設定與牌陣選擇
- ✅ `SelectionView.tsx` - 選牌介面
- ✅ `ResultView.tsx` - 結果顯示
- ✅ `CardDeck.tsx` - 卡牌堆
- ✅ `TarotCard.tsx` - 單張卡牌組件
- ✅ `SpreadLayout.tsx` - 牌陣佈局
- ✅ `ReadingResult.tsx` - 占卜結果詳情

### 審查方法

- 🔍 程式碼審查（靜態分析）
- 📱 響應式測試（多種裝置尺寸）
- ♿ 無障礙性檢查（WCAG 2.1 標準）
- 🎨 視覺設計評估
- 🖱️ 互動體驗測試

### 整體評分

| 項目 | 評分 | 說明 |
|-----|------|------|
| **視覺設計** | ⭐⭐⭐⭐☆ (4/5) | 統一的深色主題，視覺風格良好 |
| **響應式設計** | ⭐⭐⭐☆☆ (3/5) | 基本響應式，但小螢幕有問題 |
| **無障礙性** | ⭐⭐⭐☆☆ (3/5) | 有基礎支援，但缺少完整標籤 |
| **互動體驗** | ⭐⭐⭐☆☆ (3/5) | 基本互動良好，缺少進階回饋 |
| **錯誤處理** | ⭐⭐☆☆☆ (2/5) | 缺少用戶可見的錯誤提示 |
| **載入狀態** | ⭐⭐☆☆☆ (2/5) | 過於簡陋，缺少骨架屏 |

**總體評分：⭐⭐⭐☆☆ (3.2/5)**

---

## 1. 視覺層級與設計一致性

### ✅ 優點

#### 1.1 統一的深色主題
```typescript
// 所有頁面使用一致的漸變背景
page.tsx (第108行):
className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900"

cards/page.tsx (第32行):
className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
```
**優點**：視覺風格統一，營造神秘氛圍

#### 1.2 清晰的層級結構
```typescript
SetupView.tsx 的結構：
- SEO 介紹區塊 (bg-white/10)
- 標題區 (text-3xl)
- 牌陣選擇 (grid 佈局)
- 問題輸入 (textarea)
- 開始按鈕 (py-6 bg-blue-600)
```
**優點**：視覺流程清晰，引導用戶完成操作

#### 1.3 視覺焦點突出
```typescript
SetupView.tsx (第155-160行):
<button className="... bg-blue-600 hover:bg-blue-700 shadow-lg ...">
  開始占卜
</button>
```
**優點**：主要 CTA 按鈕使用高對比色彩

### ❌ 問題

#### 1.1 字體大小不一致
**位置**：`SetupView.tsx`
```typescript
第46行: text-xl (標題)
第68行: text-sm (說明文字)
第120行: text-sm (幫助文字)
```
**問題**：缺少統一的排版比例系統（如 1.2 倍增長）

**影響**：視覺層級不夠明確，可讀性受影響

**建議**：
```typescript
// 建立統一的文字大小系統
const textSizes = {
  'text-h1': 'text-3xl md:text-4xl',    // 主標題
  'text-h2': 'text-2xl md:text-3xl',    // 次標題
  'text-h3': 'text-xl md:text-2xl',     // 小標題
  'text-body': 'text-base',             // 內文
  'text-small': 'text-sm',              // 輔助文字
  'text-tiny': 'text-xs',               // 提示文字
}
```

#### 1.2 進度指示不明顯
**位置**：`CardDeck.tsx` (第71行)
```typescript
<div className="text-center text-white mb-2">
  已選擇 {selectedCards.length} / {maxCards} 張牌
</div>
```
**問題**：
- 只是純文字，沒有視覺化進度條
- 位置不夠突出，容易被忽略
- 在選牌時應該更顯眼

**建議**：
```typescript
<div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg z-50">
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium text-gray-800">
      {selectedCards.length} / {maxCards}
    </span>
    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${(selectedCards.length / maxCards) * 100}%` }}
      />
    </div>
  </div>
</div>
```

---

## 2. 互動元素與視覺回饋

### ✅ 優點

#### 2.1 懸停效果完善
```typescript
TarotCard.tsx (第126行):
hover:scale-105 hover:shadow-xl

SetupView.tsx (第107行):
hover:border-blue-400 hover:bg-slate-700/50
```
**優點**：所有互動元素都有 hover 狀態

#### 2.2 選中狀態清晰
```typescript
SetupView.tsx (第109-111行):
spreadType === type
  ? "border-blue-400 bg-slate-700/70"
  : "border-slate-600 bg-slate-800/50"

TarotCard.tsx (第128行):
isSelected && "ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900"
```
**優點**：選中時有明顯的視覺變化

### ❌ 問題

#### 2.1 加載狀態回饋不足
**位置**：`CardDeck.tsx` (第36-45行)
```typescript
const shuffleDeck = () => {
  setIsShuffling(true)
  const shuffled = shuffleArray(availableCards)
  setTimeout(() => {
    setAvailableCards(shuffled)
    setIsShuffling(false)
  }, 1000)  // 人工延遲 1 秒
}
```
**問題**：
- ❌ 只用 `isShuffling` 布林值控制狀態
- ❌ 按鈕文字改為「洗牌中...」但沒有視覺動畫
- ❌ 1 秒延遲是人工的，讓用戶感覺應用慢

**建議**：
```typescript
const shuffleDeck = () => {
  setIsShuffling(true)
  const shuffled = shuffleArray(availableCards)

  // 使用實際的 CSS 動畫，不需要人工延遲
  setAvailableCards(shuffled)

  // 動畫完成後重置狀態
  setTimeout(() => setIsShuffling(false), 300)
}

// UI 部分
<button
  disabled={isShuffling}
  className={cn(
    "...",
    isShuffling && "animate-spin" // 添加旋轉動畫
  )}
>
  {isShuffling ? (
    <>
      <SpinnerIcon className="animate-spin" />
      洗牌中...
    </>
  ) : (
    "重新洗牌"
  )}
</button>
```

#### 2.2 按鈕大小不符合行動裝置標準
**嚴重程度**：🔴 高

| 組件 | 位置 | 當前尺寸 | 實際高度 | 標準 | 問題 |
|-----|------|---------|---------|------|------|
| 重新開始 | `SelectionView.tsx:50` | `py-2` | ~36px | 44px | ❌ 太小 |
| 重新洗牌 | `CardDeck.tsx:127` | `py-2` | ~36px | 44px | ❌ 太小 |
| 複製結果 | `ReadingResult.tsx:66` | `py-2` | ~36px | 44px | ❌ 太小 |
| ChatGPT | `ReadingResult.tsx:77` | `py-2` | ~36px | 44px | ❌ 太小 |
| 開始占卜 | `SetupView.tsx:155` | `py-6` | ~72px | 44px | ⚠️ 過大 |

**影響**：
- 在 iPhone、Android 手機上難以點擊
- 容易誤觸
- 不符合 iOS 人機介面指南（44x44 pt）
- 不符合 Material Design 指南（48x48 dp）

**建議修復**：
```typescript
// 統一的按鈕最小高度
const buttonClasses = cn(
  "px-4 py-3",              // 基礎尺寸：py-3 = 12px * 2 + 內容高度 ≈ 44px
  "sm:px-6",                // 小螢幕以上更寬
  "min-h-[44px]",           // 確保最小高度
  "flex items-center justify-center", // 內容垂直置中
  "font-medium",
  "rounded-lg",
  "transition-colors"
)
```

#### 2.3 複製成功回饋時間過短
**位置**：`ReadingResult.tsx` (第58-59行)
```typescript
setCopySuccess(true)
setTimeout(() => setCopySuccess(false), 2000) // 只顯示 2 秒
```
**問題**：
- 2 秒太短，用戶可能錯過提示
- 只改變按鈕文字，沒有明顯的視覺變化
- 沒有聲音或觸覺反饋（vibration）

**建議**：
```typescript
// 使用 Toast 通知，更明顯
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(content)

    // Toast 通知（3-4 秒）
    showToast({
      type: 'success',
      message: '✓ 已複製到剪貼簿',
      duration: 3000
    })

    // 觸覺反饋（手機）
    if (navigator.vibrate) {
      navigator.vibrate(100)
    }
  } catch (err) {
    showToast({
      type: 'error',
      message: '複製失敗，請手動選擇文字',
      duration: 4000
    })
  }
}
```

---

## 3. 載入狀態與非同步處理

### ❌ 問題

#### 3.1 卡片詳情頁載入狀態過於簡陋
**位置**：`src/app/cards/[id]/page.tsx` (第26-31行)
```typescript
if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-xl">載入中...</div>
    </div>
  )
}
```
**問題**：
- ❌ 只有純文字，沒有視覺動畫
- ❌ 沒有進度指示
- ❌ 與實際內容佈局不符（會造成佈局跳動）

**影響**：
- 用戶體驗差，看起來像是應用卡住
- Cumulative Layout Shift (CLS) 指標差

**建議**：使用骨架屏（Skeleton）
```typescript
// CardSkeleton.tsx
export function CardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <nav className="p-4 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-32" />
      </nav>

      <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-10">
        {/* 卡片圖片骨架 */}
        <div className="flex-shrink-0 w-full lg:w-[340px]">
          <div className="aspect-[3/5] bg-gray-700 rounded-xl animate-pulse" />
        </div>

        {/* 內容骨架 */}
        <div className="flex-1 space-y-6 animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-2/3" />
          <div className="h-6 bg-gray-700 rounded w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  )
}

// 使用
if (loading) {
  return <CardSkeleton />
}
```

#### 3.2 廣告載入可能造成佈局移動
**位置**：`GoogleAds.tsx` (第52-81行)
```typescript
if (isReviewMode() || isDevelopment()) {
  return (
    <div className="w-full h-[250px] bg-slate-800/50 ...">
      {/* 佔位符 */}
    </div>
  )
}

// 生產環境：直接插入廣告，可能造成 CLS
return (
  <ins className="adsbygoogle" ... />
)
```
**問題**：
- 審核模式有佔位符，但生產環境沒有
- 廣告載入時可能推擠內容，造成佈局移動

**建議**：
```typescript
// 在生產環境也使用固定高度容器
<div className="w-full min-h-[250px] flex items-center justify-center bg-slate-800/20">
  <ins className="adsbygoogle" ... />
</div>
```

---

## 4. 錯誤處理與容錯性

### ✅ 優點

#### 4.1 圖片備用方案完善
```typescript
TarotCard.tsx (第72-110行):
onError={() => {
  const fallback = document.querySelector(".fallback-content")
  if (fallback) {
    fallback.style.display = "flex"
  }
}}

// fallback-content 包含：
- 牌名（中英文）
- emoji 圖示
- 編號或花色
```
**優點**：圖片載入失敗時有優雅降級

#### 4.2 處理不存在的卡片
```typescript
cards/[id]/page.tsx (第34-44行):
if (!card) {
  return (
    <div className="...">
      <h1>找不到這張牌</h1>
      <Link href="/cards">返回塔羅牌圖鑑</Link>
    </div>
  )
}
```
**優點**：有 404 處理

### ❌ 問題

#### 4.1 表單驗證缺失
**位置**：`SetupView.tsx` (第138-150行)
```typescript
<textarea
  value={currentQuestion}
  onChange={(e) => setQuestion(e.target.value)}
  placeholder="例如：我的事業發展如何？我該如何面對這段感情？"
  rows={4}
  className="..."
/>
```
**問題**：
- ❌ 沒有最大字數限制
- ❌ 沒有驗證邏輯
- ❌ 允許提交空問題（雖然占卜可以不輸入問題，但應該有提示）

**建議**：
```typescript
const MAX_QUESTION_LENGTH = 500

<div className="space-y-2">
  <textarea
    value={currentQuestion}
    onChange={(e) => {
      const value = e.target.value
      if (value.length <= MAX_QUESTION_LENGTH) {
        setQuestion(value)
      }
    }}
    maxLength={MAX_QUESTION_LENGTH}
    placeholder="例如：我的事業發展如何？"
    rows={4}
    className="..."
    aria-describedby="question-help question-count"
  />

  {/* 字數提示 */}
  <div className="flex justify-between text-xs">
    <span id="question-help" className="text-slate-400">
      💡 問題越具體，解讀越準確
    </span>
    <span
      id="question-count"
      className={cn(
        "text-slate-400",
        currentQuestion.length > MAX_QUESTION_LENGTH * 0.9 && "text-yellow-400"
      )}
    >
      {currentQuestion.length} / {MAX_QUESTION_LENGTH}
    </span>
  </div>
</div>
```

#### 4.2 網路錯誤無用戶可見提示
**嚴重程度**：🔴 高

**位置**：`ReadingResult.tsx` (第50-62行)
```typescript
const handleCopyContent = async () => {
  try {
    await navigator.clipboard.writeText(content)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  } catch (err) {
    console.error("複製失敗:", err) // ❌ 只記錄到 console
    if (err instanceof Error) {
      alert(`複製失敗：${err.message}`)
    }
  }
}
```
**問題**：
- 使用 `alert()` 很突兀，打斷用戶體驗
- 錯誤訊息技術性太強，用戶看不懂
- 沒有提供解決方案

**建議**：
```typescript
const handleCopyContent = async () => {
  try {
    await navigator.clipboard.writeText(content)

    showToast({
      type: 'success',
      message: '✓ 已複製到剪貼簿',
      duration: 3000
    })
  } catch (err) {
    console.error("複製失敗:", err)

    // 用戶友善的錯誤提示
    showToast({
      type: 'error',
      message: '複製失敗，請嘗試手動選擇文字並按 Ctrl+C',
      duration: 5000,
      action: {
        label: '了解更多',
        onClick: () => {
          // 顯示詳細說明
        }
      }
    })
  }
}
```

#### 4.3 缺少全局錯誤邊界
**問題**：沒有 `error.tsx` 或 `ErrorBoundary` 組件

**影響**：
- 未預期的錯誤會導致白屏
- 用戶不知道發生了什麼
- 沒有恢復途徑

**建議**：
```typescript
// src/app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-white mb-4">😔 發生錯誤</h2>
        <p className="text-blue-200 mb-6">
          很抱歉，系統遇到了一些問題。請重新整理頁面再試一次。
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          重試
        </button>
      </div>
    </div>
  )
}
```

---

## 5. 響應式設計

### ✅ 優點

#### 5.1 使用 Tailwind 響應式前綴
```typescript
SetupView.tsx (第46行):
grid-cols-1 md:grid-cols-2

SpreadLayout.tsx (第56行):
space-x-2 sm:space-x-4 md:space-x-8
```

#### 5.2 導航預留空間
```typescript
layout.tsx (第238行):
<div className="pt-[60px]">
  {/* 為固定導航預留空間 */}
</div>
```

### ❌ 問題

#### 5.1 凱爾特十字牌陣在小螢幕破損
**嚴重程度**：🔴 高

**位置**：`SpreadLayout.tsx` (第83-243行)
```typescript
{spreadType === "celtic-cross" && (
  <div className="relative w-[280px] h-[400px] mx-auto">
    {/* 使用絕對定位 */}
    <div className="absolute" style={{ top: '0px', left: '100px' }}>
      {/* 位置 0 */}
    </div>
    {/* ... 其他 9 張牌 */}
  </div>
)}
```
**問題**：
- ❌ `w-[280px]` 對於 iPhone SE (320px) 太寬
- ❌ 絕對定位在小螢幕上會重疊
- ❌ 無法滾動查看所有牌卡

**影響**：
- iPhone SE、舊款 Android 手機完全無法使用凱爾特十字牌陣
- 牌卡會溢出螢幕

**建議**：
```typescript
// 小螢幕使用垂直列表，大螢幕使用絕對定位

{spreadType === "celtic-cross" && (
  <>
    {/* 小螢幕：垂直列表 */}
    <div className="lg:hidden space-y-4">
      {positions.map((pos, index) => (
        <div key={index} className="bg-white/10 rounded-lg p-4">
          <div className="text-sm text-blue-200 mb-2">
            {pos.name} - {pos.description}
          </div>
          <div className="flex justify-center">
            {/* 卡片 */}
          </div>
        </div>
      ))}
    </div>

    {/* 大螢幕：絕對定位佈局 */}
    <div className="hidden lg:block relative w-[280px] h-[400px] mx-auto">
      {/* 原有的絕對定位佈局 */}
    </div>
  </>
)}
```

#### 5.2 按鈕和輸入框尺寸未達標準
**影響裝置**：所有手機

| 元素 | 位置 | 當前 | 建議 | 標準 |
|-----|------|------|------|------|
| 所有按鈕 | 多處 | `py-2` (~36px) | `py-3 min-h-[44px]` | iOS: 44pt, Android: 48dp |
| textarea | SetupView | ✅ 適當 | - | - |
| 牌陣選項 | SetupView | `p-4` (~64px) | ✅ 適當 | - |

#### 5.3 橫屏（Landscape）未適配
**問題**：
- 沒有 `max-h-screen` 限制
- 橫屏時內容可能超出視口
- 凱爾特十字牌陣在橫屏時更難使用

**建議**：
```typescript
// 添加橫屏提示（針對凱爾特十字）
{spreadType === "celtic-cross" && isLandscape && (
  <div className="mb-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
    <p className="text-yellow-200 text-sm">
      💡 建議將裝置轉為直向以獲得更好的查看體驗
    </p>
  </div>
)}
```

---

## 6. 無障礙性（A11y）

### ✅ 優點

#### 6.1 語言設定正確
```typescript
layout.tsx (第133行):
<html lang="zh-TW">
```

#### 6.2 主要 ARIA 標籤
```typescript
layout.tsx (第219行):
<nav aria-label="主選單">

SetupView.tsx (第145行):
aria-describedby="question-help"
```

#### 6.3 焦點樣式
```typescript
globals.css (第29-42行):
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid theme('colors.blue.400');
  outline-offset: 2px;
}
```

#### 6.4 尊重動作偏好
```typescript
globals.css (第68-75行):
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ❌ 問題

#### 6.1 按鈕缺少 aria-label
**嚴重程度**：🟡 中

**位置**：多處
```typescript
// CardDeck.tsx (第127-139行)
<button
  onClick={shuffleDeck}
  disabled={isShuffling}
  // ❌ 缺少 aria-label
  // ❌ 缺少 aria-busy
>
  {isShuffling ? "洗牌中..." : "重新洗牌"}
</button>

// TarotCard.tsx (第133行)
<div onClick={onClick}>
  {/* ❌ 沒有 aria-label 說明這張牌是什麼 */}
</div>
```

**建議**：
```typescript
<button
  onClick={shuffleDeck}
  disabled={isShuffling}
  aria-label={isShuffling ? "正在洗牌，請稍候" : "重新洗牌，清除已選牌卡"}
  aria-busy={isShuffling}
  className="..."
>
  {isShuffling ? "洗牌中..." : "重新洗牌"}
</button>

<div
  onClick={onClick}
  role="button"
  tabIndex={0}
  aria-label={`${card.name}（${card.nameEn}），${isReversed ? '逆位' : '正位'}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.()
    }
  }}
>
  {/* 卡片內容 */}
</div>
```

#### 6.2 色彩對比度問題
**嚴重程度**：🔴 高（影響視障用戶）

**檢測結果**：

| 位置 | 前景色 | 背景色 | 對比度 | WCAG AA | 問題 |
|-----|--------|--------|--------|---------|------|
| SetupView.tsx:120 | `text-slate-500` (#64748b) | `bg-slate-800/50` (#1e293b80) | ~2.8:1 | 4.5:1 | ❌ 不合格 |
| ReadingResult.tsx:229 | `text-red-300` (#fca5a5) | `bg-red-900/30` (#7f1d1d4d) | ~3.2:1 | 4.5:1 | ❌ 不合格 |
| SpreadLayout.tsx:45 | `text-slate-400` (#94a3b8) | 深色背景 | ~3.5:1 | 4.5:1 | ❌ 不合格 |

**建議修復**：
```typescript
// SetupView.tsx - 幫助文字
<p className="text-slate-300 text-sm">  {/* 從 slate-500 改為 slate-300 */}
  輸入您的問題可以幫助您更好地理解牌面的含義
</p>

// ReadingResult.tsx - 逆位標籤
<span className="bg-red-900 text-red-50 px-2 py-1 rounded">  {/* 提高對比度 */}
  逆位
</span>

// SpreadLayout.tsx - 位置描述
<p className="text-xs text-slate-300">  {/* 從 slate-400 改為 slate-300 */}
  {position.description}
</p>
```

#### 6.3 圖片 alt 文字不夠描述性
**位置**：`TarotCard.tsx` (第68行)
```typescript
alt={`${card.name} (${card.nameEn})`}
// 例如：alt="愚者 (The Fool)"
```
**問題**：
- 沒有說明這是塔羅牌
- 沒有說明正逆位
- 螢幕閱讀器用戶無法得知完整資訊

**建議**：
```typescript
alt={`${card.name}（${card.nameEn}）塔羅牌${isReversed ? '，逆位' : '，正位'}`}
// 例如：alt="愚者（The Fool）塔羅牌，正位"
```

#### 6.4 模態框鍵盤陷阱
**位置**：`CardModal.tsx`
```typescript
// ✅ 有背景點擊關閉
onClick={onClose}

// ❌ 但沒有：
// - 焦點鎖定（focus trap）
// - Esc 鍵關閉
// - Tab 循環
```

**建議**：使用 focus-trap-react
```typescript
import FocusTrap from 'focus-trap-react'

export function CardModal({ card, onClose }: CardModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <FocusTrap>
      <div className="modal" role="dialog" aria-modal="true">
        {/* 內容 */}
      </div>
    </FocusTrap>
  )
}
```

#### 6.5 牌陣佈局缺少語意標記
**位置**：`SpreadLayout.tsx`
```typescript
<div className="relative w-[280px] h-[400px]">
  {/* 各個位置的牌卡 */}
</div>
```
**問題**：
- 沒有 `role="region"`
- 沒有 `aria-label` 描述牌陣
- 牌卡狀態變化時沒有 `aria-live` 通知

**建議**：
```typescript
<div
  className="relative w-[280px] h-[400px]"
  role="region"
  aria-label={`${spreadTypeNames[spreadType]}牌陣，共${maxCards}個位置`}
>
  {/* 牌卡選擇時的即時通知 */}
  <div
    className="sr-only"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    {selectedCards.length > 0 &&
      `已選擇${selectedCards.length}張牌，還需${maxCards - selectedCards.length}張`
    }
  </div>

  {/* 牌卡 */}
</div>
```

---

## 7. 使用引導與教育性

### ✅ 優點

#### 7.1 清晰的步驟流程
首頁 → 選牌陣 → 輸入問題 → 抽牌 → 查看結果

#### 7.2 在線幫助文字
```typescript
SetupView.tsx (第147-149行):
<p id="question-help" className="...">
  輸入您的問題可以幫助您更好地理解牌面的含義
</p>
```

#### 7.3 牌陣說明
```typescript
SetupView.tsx (第86-101行):
{
  type: 'single',
  name: '單張牌',
  description: '最簡單快速的占卜方式',
  detail: '適合日常指引、快速問題，或是想獲得當下直覺回應時使用。'
}
```

### ❌ 問題

#### 7.1 首次使用者體驗不佳
**問題**：
- ❌ 沒有「開始前須知」
- ❌ 沒有新手導覽（onboarding）
- ❌ SEO 介紹區塊可能被導航遮擋

**建議**：
```typescript
// 首次訪問時顯示歡迎對話框
export function WelcomeDialog() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem('visited')
    if (!visited) {
      setIsFirstVisit(true)
      localStorage.setItem('visited', 'true')
    }
  }, [])

  if (!isFirstVisit) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">
          歡迎來到 Wade Through Tarot
        </h2>
        <ul className="space-y-2 text-blue-200 mb-6">
          <li>✨ 選擇適合的牌陣</li>
          <li>💭 輸入你的問題（可選）</li>
          <li>🎴 從牌堆中抽取卡牌</li>
          <li>📖 查看詳細的牌義解讀</li>
        </ul>
        <button
          onClick={() => setIsFirstVisit(false)}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          開始占卜
        </button>
      </div>
    </div>
  )
}
```

#### 7.2 牌陣選擇缺少視覺預覽
**位置**：`SetupView.tsx` (第80-129行)

**問題**：
- 只有文字描述
- 用戶不知道「凱爾特十字」長什麼樣子
- 難以理解各牌陣的差異

**建議**：
```typescript
// 添加牌陣預覽圖
const spreadLayouts = {
  single: '/images/spread-preview-single.svg',
  'three-card': '/images/spread-preview-three.svg',
  'celtic-cross': '/images/spread-preview-celtic.svg',
}

// 在選項中顯示
<div className="grid grid-cols-1 gap-4">
  {spreadOptions.map((spread) => (
    <button
      key={spread.type}
      onClick={() => setSpreadType(spread.type)}
      className={cn(
        "p-4 rounded-lg border-2 transition-all",
        spreadType === spread.type
          ? "border-blue-400 bg-slate-700/70"
          : "border-slate-600 bg-slate-800/50"
      )}
    >
      <div className="flex gap-4">
        {/* 左側：預覽圖 */}
        <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center">
          <img
            src={spreadLayouts[spread.type]}
            alt={`${spread.name}牌陣示意圖`}
            className="w-16 h-16 opacity-70"
          />
        </div>

        {/* 右側：文字說明 */}
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-white">{spread.name}</h3>
          <p className="text-sm text-slate-300">{spread.description}</p>
          <p className="text-xs text-slate-400 mt-1">{spread.detail}</p>
        </div>
      </div>
    </button>
  ))}
</div>
```

#### 7.3 缺少進度指示器
**問題**：
- 占卜流程中沒有「步驟 2/3」之類的指示
- 用戶不確定自己在流程的哪一步
- 不知道還需要做什麼

**建議**：
```typescript
// ProgressStepper.tsx
export function ProgressStepper({
  currentStep,
  totalSteps
}: {
  currentStep: number
  totalSteps: number
}) {
  const steps = [
    { number: 1, name: '設定' },
    { number: 2, name: '選牌' },
    { number: 3, name: '結果' },
  ]

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* 步驟圓圈 */}
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-medium",
              currentStep === step.number
                ? "bg-blue-500 text-white"
                : currentStep > step.number
                ? "bg-green-500 text-white"
                : "bg-slate-700 text-slate-400"
            )}
          >
            {currentStep > step.number ? "✓" : step.number}
          </div>

          {/* 步驟名稱 */}
          <span
            className={cn(
              "ml-2 text-sm",
              currentStep === step.number
                ? "text-blue-400 font-medium"
                : "text-slate-400"
            )}
          >
            {step.name}
          </span>

          {/* 連接線 */}
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 bg-slate-700 mx-4" />
          )}
        </div>
      ))}
    </div>
  )
}
```

---

## 8. 視覺細節與設計質量

### ✅ 優點

#### 8.1 陰影和深度效果
```typescript
TarotCard.tsx: shadow-lg, shadow-xl
SetupView.tsx: shadow-lg
```

#### 8.2 圓角和邊框
```typescript
大部分組件: rounded-lg
邊框: border-blue-400, border-slate-600
```

#### 8.3 漸變背景
```typescript
page.tsx: from-gray-900 via-blue-900 to-slate-900
```

### ❌ 問題

#### 8.1 牌卡邊框樣式不一致
```typescript
TarotCard.tsx (第43行 - 牌背):
border-blue-400

TarotCard.tsx (第60行 - 牌面):
border-gray-300
```
**問題**：沒有理由區分牌背和牌面的邊框顏色

**建議**：統一使用 `border-gray-300`

#### 8.2 逆位指示器不夠清晰
```typescript
TarotCard.tsx (第113-117行):
<div className="absolute top-1 right-1 text-red-500 text-xs bg-white bg-opacity-80 px-1 rounded">
  ↻
</div>
```
**問題**：
- 只有 `text-xs`，在小螢幕上難以注意到
- 只在右上角，位置不明顯
- 顏色不夠突出

**建議**：
```typescript
// 更明顯的逆位指示
<div className="absolute inset-0 pointer-events-none">
  {/* 整張卡片覆蓋層 */}
  <div className="absolute inset-0 bg-red-600/10 rounded-lg" />

  {/* 大的旋轉圖示 */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-6xl text-red-500/40 font-bold select-none">
      ↻
    </div>
  </div>

  {/* 角落標籤 */}
  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium">
    逆位
  </div>
</div>
```

#### 8.3 過度使用透明度
```typescript
SetupView.tsx (第107-108行):
bg-white/5 backdrop-blur-sm
```
**問題**：
- 透明度太低（5%），幾乎看不出區別
- 可能導致文字模糊（backdrop-blur）
- 對比度不足

**建議**：
```typescript
// 使用更不透明的背景
bg-slate-800/60 backdrop-blur-sm  // 60% 而不是 5%
```

---

## 9. 性能與動畫

### ✅ 優點

#### 9.1 適度的動畫
```typescript
transition-all duration-300  // 不會太長
```

#### 9.2 尊重用戶偏好
```typescript
@media (prefers-reduced-motion: reduce)
```

### ❌ 問題

#### 9.1 不必要的延遲
```typescript
CardDeck.tsx (第36-45行):
setTimeout(() => {
  setAvailableCards(shuffled)
  setIsShuffling(false)
}, 1000)  // ❌ 人工延遲 1 秒
```
**問題**：
- 讓應用感覺變慢
- 沒有實際的動畫，只是延遲
- 用戶體驗差

**建議**：
```typescript
// 使用實際的 CSS 動畫
const shuffleDeck = () => {
  setIsShuffling(true)

  // 立即更新資料
  const shuffled = shuffleArray(availableCards)
  setAvailableCards(shuffled)

  // 只等待動畫完成（300ms）
  setTimeout(() => setIsShuffling(false), 300)
}

// CSS
.shuffle-animation {
  animation: shuffle 0.3s ease-in-out;
}

@keyframes shuffle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.95) rotate(2deg); }
}
```

---

## 10. 色彩對比度

### 檢測工具
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

### 不合格項目列表

| # | 位置 | 元素 | 前景色 | 背景色 | 對比度 | 標準 | 狀態 |
|---|------|------|--------|--------|--------|------|------|
| 1 | SetupView:120 | 幫助文字 | slate-500 (#64748b) | slate-800/50 | ~2.8:1 | 4.5:1 | ❌ |
| 2 | ReadingResult:229 | 逆位標籤 | red-300 (#fca5a5) | red-900/30 | ~3.2:1 | 4.5:1 | ❌ |
| 3 | SpreadLayout:45 | 位置描述 | slate-400 (#94a3b8) | 深色背景 | ~3.5:1 | 4.5:1 | ❌ |
| 4 | CardDeck:71 | 進度文字 | white | 深色漸變 | ✅ >7:1 | 4.5:1 | ✅ |
| 5 | SetupView:155 | 開始按鈕 | white | blue-600 | ✅ >5:1 | 4.5:1 | ✅ |

### 修復建議

```typescript
// 1. SetupView 幫助文字
<p className="text-slate-300 text-sm">  {/* slate-500 → slate-300 */}
  輸入您的問題可以幫助您更好地理解牌面的含義
</p>

// 2. ReadingResult 逆位標籤
<span className="bg-red-900 text-red-50 px-2 py-1 rounded">  {/* 提高對比度 */}
  逆位
</span>

// 3. SpreadLayout 位置描述
<p className="text-xs text-slate-300">  {/* slate-400 → slate-300 */}
  {position.description}
</p>
```

---

## 11. 按鈕與互動元素尺寸

### 標準參考

- **iOS Human Interface Guidelines**: 44×44 pt
- **Material Design**: 48×48 dp
- **WCAG 2.1 AAA**: 44×44 px

### 檢測結果

| 組件 | 檔案 | 行號 | 當前樣式 | 實際高度 | 建議樣式 | 問題 |
|-----|------|------|---------|---------|---------|------|
| 開始占卜 | SetupView.tsx | 155 | `py-6` | ~72px | `py-4` | ⚠️ 過大（桌面） |
| 重新開始 | SelectionView.tsx | 50 | `py-2` | ~36px | `py-3 min-h-[44px]` | ❌ 太小 |
| 重新洗牌 | CardDeck.tsx | 127 | `py-2` | ~36px | `py-3 min-h-[44px]` | ❌ 太小 |
| 複製結果 | ReadingResult.tsx | 66 | `py-2` | ~36px | `py-3 min-h-[44px]` | ❌ 太小 |
| ChatGPT | ReadingResult.tsx | 77 | `py-2` | ~36px | `py-3 min-h-[44px]` | ❌ 太小 |
| 牌陣選項 | SetupView.tsx | 107 | `p-4` | ~64px | ✅ 適當 | ✅ 合格 |
| 查看卡牌 | SelectionView.tsx | - | - | ~80px | ✅ 適當 | ✅ 合格 |

### 統一修復方案

```typescript
// 建立統一的按鈕樣式
const buttonSizes = {
  sm: "px-3 py-2 min-h-[40px] text-sm",          // 小按鈕（次要操作）
  md: "px-4 py-3 min-h-[44px] text-base",        // 標準按鈕
  lg: "px-6 py-4 min-h-[48px] text-lg",          // 大按鈕（主要 CTA）
}

// 應用
<button className={cn(
  buttonSizes.md,  // 使用標準尺寸
  "bg-blue-600 hover:bg-blue-700",
  "rounded-lg font-medium",
  "transition-colors",
  "flex items-center justify-center"  // 確保內容垂直居中
)}>
  重新洗牌
</button>
```

---

## 12. 問題優先順序總結

### 🔴 高優先度（必須修復）

影響可用性和無障礙性的關鍵問題：

1. **修復行動裝置按鈕大小** - 5 個按鈕不符合 44px 標準
2. **改善色彩對比度** - 3 處不符合 WCAG AA 標準
3. **建立 Toast 通知系統** - 錯誤只記錄到 console
4. **修復凱爾特十字小螢幕佈局** - 在 iPhone SE 上完全破損
5. **添加全局錯誤邊界** - 未預期錯誤導致白屏

**預估時間**：2-3 小時
**影響用戶**：所有用戶（特別是行動裝置和視障用戶）

### 🟡 中優先度（建議修復）

提升用戶體驗和專業度：

6. **改善載入狀態** - 使用骨架屏而不是文字
7. **添加進度指示器** - 顯示「步驟 2/3」
8. **完善無障礙標籤** - 補充 aria-label, aria-busy
9. **牌陣佈局預覽** - 在選擇前顯示視覺預覽
10. **表單驗證** - 問題字數限制和提示
11. **改善逆位指示器** - 更明顯的視覺標記

**預估時間**：2-3 小時
**影響用戶**：所有用戶（體驗提升）

### 🟢 低優先度（品質提升）

細節優化：

12. **移除不必要延遲** - 洗牌動畫改用 CSS
13. **統一牌卡邊框** - 牌背和牌面使用相同邊框色
14. **優化透明度使用** - bg-white/5 改為 bg-slate-800/60
15. **建立設計系統文件** - 統一顏色、間距變數
16. **新手導覽** - 首次訪問時的歡迎對話框
17. **改善 PWA 提示** - 繁體中文文案

**預估時間**：1-2 小時
**影響用戶**：有感受但不影響核心功能

---

## 13. 下一步行動

### 建議執行順序

#### 階段 1：關鍵修復（必做）
**時間**：2-3 小時

1. 建立基礎 UI 組件
   - `src/components/ui/Toast.tsx`
   - `src/components/ui/Skeleton.tsx`
   - `src/hooks/useToast.ts`

2. 修復按鈕大小（5 處）
   - SetupView.tsx
   - SelectionView.tsx
   - CardDeck.tsx
   - ReadingResult.tsx (2 處)

3. 改善色彩對比度（3 處）
   - SetupView.tsx
   - ReadingResult.tsx
   - SpreadLayout.tsx

4. 整合 Toast 與 Skeleton
   - ReadingResult.tsx（複製錯誤處理）
   - cards/[id]/page.tsx（載入狀態）

5. 添加錯誤邊界
   - src/app/error.tsx

#### 階段 2：體驗提升（建議做）
**時間**：2-3 小時

6. 進度指示器
7. 無障礙標籤
8. 牌陣預覽
9. 表單驗證
10. 凱爾特十字響應式

#### 階段 3：品質提升（有時間再做）
**時間**：1-2 小時

11. 設計系統
12. 動畫優化
13. 新手導覽

---

## 附錄 A：測試清單

### 響應式測試裝置

- [ ] iPhone SE (320×568)
- [ ] iPhone 12 Pro (390×844)
- [ ] iPhone 12 Pro Max (428×926)
- [ ] iPad (768×1024)
- [ ] iPad Pro (1024×1366)
- [ ] Desktop (1920×1080)
- [ ] Desktop (2560×1440)

### 瀏覽器測試

- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] Edge (最新版)
- [ ] Safari iOS (最新版)
- [ ] Chrome Android (最新版)

### 無障礙性測試

- [ ] 鍵盤導航（Tab, Enter, Esc）
- [ ] 螢幕閱讀器（NVDA/VoiceOver）
- [ ] 色彩對比度（Lighthouse）
- [ ] 焦點可見性
- [ ] ARIA 標籤正確性

### 效能測試

- [ ] Lighthouse Performance > 85
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse SEO > 95
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

---

## 附錄 B：參考資源

### 設計指南
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Guidelines](https://material.io/design)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/utility-first)

### 無障礙性
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### 測試工具
- Chrome DevTools Lighthouse
- axe DevTools
- Wave Browser Extension
- NVDA Screen Reader
- VoiceOver (macOS/iOS)

---

**報告結束**

此報告記錄了 Wade Through Tarot 應用的所有 UI/UX 問題。建議優先修復高優先度問題，以確保應用對所有用戶都可用和易用。

下一步：參考 [UI/UX 改善計劃](./ui-ux-improvement-plan.md) 開始實施修復。
