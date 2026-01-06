# UI/UX 改善實作計劃

> 本文件基於 [UI/UX 審查報告](./ui-ux-audit-report.md) 制定詳細的實作步驟

## 📋 目錄

- [階段劃分](#階段劃分)
- [Phase 1: 高優先級改善](#phase-1-高優先級改善-2-3-小時)
- [Phase 2: 中優先級改善](#phase-2-中優先級改善-2-3-小時)
- [Phase 3: 低優先級改善](#phase-3-低優先級改善-1-2-小時)
- [實作順序建議](#實作順序建議)
- [測試檢查清單](#測試檢查清單)

---

## 階段劃分

### Phase 1: 高優先級改善 (2-3 小時)
**目標**: 修復嚴重影響使用者體驗的關鍵問題

- ✅ 建立 Toast 通知系統
- ✅ 建立 Skeleton 載入元件
- ✅ 修復按鈕尺寸 (5 處)
- ✅ 修復色彩對比度 (3 處)
- ✅ 建立全域 Error Boundary
- ✅ 改善 Celtic Cross 響應式佈局

### Phase 2: 中優先級改善 (2-3 小時)
**目標**: 提升整體使用者體驗與專業度

- ⏳ 新增進度指示器
- ⏳ 優化載入狀態
- ⏳ 增強表單驗證
- ⏳ 改善無障礙標籤
- ⏳ 優化錯誤處理

### Phase 3: 低優先級改善 (1-2 小時)
**目標**: 提升質感與完成度

- ⏳ 建立設計系統
- ⏳ 新增微動畫
- ⏳ 改善 Onboarding
- ⏳ 優化效能

---

## Phase 1: 高優先級改善 (2-3 小時)

### 步驟 1: 建立 Toast 通知系統 (30 分鐘)

#### 1.1 建立 Toast 元件

**檔案**: `/client/src/components/ui/Toast.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  type: ToastType
  message: string
  duration?: number
  onClose: (id: string) => void
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-900 border-green-600 text-green-50',
  error: 'bg-red-900 border-red-600 text-red-50',
  warning: 'bg-yellow-900 border-yellow-600 text-yellow-50',
  info: 'bg-blue-900 border-blue-600 text-blue-50',
}

const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

export function Toast({ id, type, message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        flex items-center gap-3 min-w-[320px] max-w-md p-4 rounded-lg border-2
        shadow-lg animate-slide-in-right
        ${toastStyles[type]}
      `}
    >
      <span className="text-xl flex-shrink-0" aria-hidden="true">
        {toastIcons[type]}
      </span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors min-w-[24px] min-h-[24px]"
        aria-label="關閉通知"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
```

**Tailwind 動畫設定**: 在 `/client/tailwind.config.ts` 新增

```typescript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      },
    },
  },
}
```

#### 1.2 建立 Toast Hook

**檔案**: `/client/src/hooks/useToast.ts`

```typescript
'use client'

import { create } from 'zustand'
import { ToastType } from '@/components/ui/Toast'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearAll: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now().toString() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearAll: () => set({ toasts: [] }),
}))

export function useToast() {
  const { addToast, removeToast } = useToastStore()

  return {
    success: (message: string, duration?: number) =>
      addToast({ type: 'success', message, duration }),
    error: (message: string, duration?: number) =>
      addToast({ type: 'error', message, duration }),
    warning: (message: string, duration?: number) =>
      addToast({ type: 'warning', message, duration }),
    info: (message: string, duration?: number) =>
      addToast({ type: 'info', message, duration }),
    close: removeToast,
  }
}
```

#### 1.3 整合 Toast 到 RootLayout

**檔案**: `/client/src/app/layout.tsx`

在現有的 RootLayout 中新增 ToastContainer：

```typescript
import { ToastContainer } from '@/components/ui/Toast'
import { useToastStore } from '@/hooks/useToast'

function ToastProvider() {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  return (
    <ToastContainer
      toasts={toasts.map((toast) => ({
        ...toast,
        onClose: removeToast,
      }))}
    />
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
```

#### 1.4 測試 Toast 系統

**測試檔案**: `/client/src/components/ui/__tests__/Toast.test.tsx`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import { Toast, ToastContainer } from '../Toast'
import { act } from 'react'

describe('Toast', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render toast with message', () => {
    render(
      <Toast
        id="test-1"
        type="success"
        message="操作成功"
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('操作成功')).toBeInTheDocument()
  })

  it('should auto-close after duration', async () => {
    render(
      <Toast
        id="test-1"
        type="success"
        message="測試"
        duration={3000}
        onClose={mockOnClose}
      />
    )

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledWith('test-1')
    })
  })

  it('should close when close button clicked', () => {
    render(
      <Toast
        id="test-1"
        type="error"
        message="錯誤"
        onClose={mockOnClose}
      />
    )

    const closeButton = screen.getByLabelText('關閉通知')
    closeButton.click()

    expect(mockOnClose).toHaveBeenCalledWith('test-1')
  })

  it('should render different toast types with correct styles', () => {
    const types: Array<'success' | 'error' | 'warning' | 'info'> = [
      'success',
      'error',
      'warning',
      'info',
    ]

    types.forEach((type) => {
      const { container } = render(
        <Toast id={type} type={type} message="測試" onClose={mockOnClose} />
      )

      const toast = container.firstChild as HTMLElement
      expect(toast).toHaveClass(`bg-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'blue'}-900`)
    })
  })
})
```

**測試 Hook**: `/client/src/hooks/__tests__/useToast.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast, useToastStore } from '../useToast'

describe('useToast', () => {
  beforeEach(() => {
    useToastStore.getState().clearAll()
  })

  it('should add success toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('成功訊息')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('success')
    expect(toasts[0].message).toBe('成功訊息')
  })

  it('should add error toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.error('錯誤訊息')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts[0].type).toBe('error')
  })

  it('should remove toast by id', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('測試')
    })

    const toastId = useToastStore.getState().toasts[0].id

    act(() => {
      result.current.close(toastId)
    })

    expect(useToastStore.getState().toasts).toHaveLength(0)
  })
})
```

---

### 步驟 2: 建立 Skeleton 載入元件 (20 分鐘)

#### 2.1 建立基礎 Skeleton 元件

**檔案**: `/client/src/components/ui/Skeleton.tsx`

```typescript
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-slate-700/50'

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded',
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && 'w-3/4' // 最後一行較短
            )}
            style={{ width, height }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
      aria-busy="true"
      aria-live="polite"
    />
  )
}

// 便利元件
export function SkeletonCard() {
  return (
    <div className="w-24 h-36 rounded-lg animate-pulse bg-slate-700/50 border border-slate-600" />
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return <Skeleton variant="text" lines={lines} />
}

export function SkeletonAvatar() {
  return <Skeleton variant="circular" width={40} height={40} />
}
```

**Utility 函數** (如果尚未建立): `/client/src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

需要安裝依賴：
```bash
npm install clsx tailwind-merge
```

#### 2.2 建立卡牌詳細頁 Skeleton

**檔案**: `/client/src/components/ui/CardDetailSkeleton.tsx`

```typescript
import { Skeleton, SkeletonCard, SkeletonText } from './Skeleton'

export function CardDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 麵包屑 */}
      <Skeleton className="w-32 h-4 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 卡牌圖片 */}
        <div className="flex justify-center">
          <SkeletonCard />
        </div>

        {/* 卡牌資訊 */}
        <div className="space-y-6">
          {/* 標題 */}
          <div>
            <Skeleton className="w-48 h-8 mb-2" />
            <Skeleton className="w-32 h-6" />
          </div>

          {/* 正位 */}
          <div>
            <Skeleton className="w-20 h-6 mb-2" />
            <SkeletonText lines={4} />
          </div>

          {/* 逆位 */}
          <div>
            <Skeleton className="w-20 h-6 mb-2" />
            <SkeletonText lines={4} />
          </div>

          {/* 按鈕 */}
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
```

#### 2.3 整合到卡牌詳細頁

**修改檔案**: `/client/src/app/cards/[id]/page.tsx`

```typescript
import { Suspense } from 'react'
import { CardDetailSkeleton } from '@/components/ui/CardDetailSkeleton'
// ... 其他 imports

export default function CardDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<CardDetailSkeleton />}>
      <CardDetail id={params.id} />
    </Suspense>
  )
}

async function CardDetail({ id }: { id: string }) {
  // 原有的載入邏輯
  // ...
}
```

#### 2.4 測試 Skeleton 元件

**測試檔案**: `/client/src/components/ui/__tests__/Skeleton.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils'
import { Skeleton, SkeletonCard, SkeletonText } from '../Skeleton'

describe('Skeleton', () => {
  it('should render basic skeleton', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('bg-slate-700/50')
  })

  it('should render text variant with multiple lines', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />)
    const skeletons = container.querySelectorAll('.animate-pulse')

    expect(skeletons).toHaveLength(3)
  })

  it('should render circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('rounded-full')
  })

  it('should render card skeleton', () => {
    const { container } = render(<SkeletonCard />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('w-24')
    expect(skeleton).toHaveClass('h-36')
  })
})
```

---

### 步驟 3: 修復按鈕尺寸 (30 分鐘)

#### 3.1 SelectionView.tsx - "重新開始" 按鈕

**檔案位置**: `/client/src/components/SelectionView.tsx:50`

**修改前**:
```typescript
<button
  onClick={onRestart}
  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
>
  重新開始
</button>
```

**修改後**:
```typescript
<button
  onClick={onRestart}
  className="px-6 py-3 min-h-[44px] bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
  aria-label="重新開始占卜"
>
  重新開始
</button>
```

#### 3.2 CardDeck.tsx - "重新洗牌" 按鈕

**檔案位置**: `/client/src/components/CardDeck.tsx:127`

**修改前**:
```typescript
<button
  onClick={handleShuffle}
  disabled={isShuffling}
  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-all"
>
  {isShuffling ? '洗牌中...' : '重新洗牌'}
</button>
```

**修改後**:
```typescript
<button
  onClick={handleShuffle}
  disabled={isShuffling}
  className="px-6 py-3 min-h-[44px] bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-all"
  aria-label={isShuffling ? '洗牌中' : '重新洗牌'}
  aria-busy={isShuffling}
>
  {isShuffling ? '洗牌中...' : '重新洗牌'}
</button>
```

#### 3.3 ReadingResult.tsx - "複製結果" 和 "使用 ChatGPT 分析" 按鈕

**檔案位置**: `/client/src/components/ReadingResult.tsx:66,77`

**修改前**:
```typescript
<button
  onClick={handleCopy}
  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
>
  <Copy className="w-4 h-4" />
  {copied ? '已複製！' : '複製結果'}
</button>

<button
  onClick={handleChatGPT}
  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center gap-2"
>
  <MessageSquare className="w-4 h-4" />
  使用 ChatGPT 分析
</button>
```

**修改後** (同時整合 Toast):
```typescript
import { useToast } from '@/hooks/useToast'

// 在元件內部
const toast = useToast()

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(resultText)
    toast.success('已成功複製到剪貼簿！', 3000)
  } catch (error) {
    console.error('複製失敗:', error)
    toast.error('複製失敗，請手動選取複製', 4000)
  }
}

// JSX
<button
  onClick={handleCopy}
  className="flex-1 px-4 py-3 min-h-[44px] bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
  aria-label="複製占卜結果到剪貼簿"
>
  <Copy className="w-4 h-4" aria-hidden="true" />
  複製結果
</button>

<button
  onClick={handleChatGPT}
  className="flex-1 px-4 py-3 min-h-[44px] bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center gap-2"
  aria-label="開啟 ChatGPT 進行深度分析"
>
  <MessageSquare className="w-4 h-4" aria-hidden="true" />
  使用 ChatGPT 分析
</button>
```

#### 3.4 SetupView.tsx - "開始占卜" 按鈕

**檔案位置**: `/client/src/components/SetupView.tsx:155`

**修改前**:
```typescript
<button
  onClick={handleStart}
  disabled={!question.trim() || !spreadType}
  className="w-full px-6 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-bold text-xl transition-all"
>
  開始占卜
</button>
```

**修改後**:
```typescript
<button
  onClick={handleStart}
  disabled={!question.trim() || !spreadType}
  className="w-full px-6 py-4 min-h-[48px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-bold text-xl transition-all"
  aria-label="開始塔羅占卜"
>
  開始占卜
</button>
```

#### 3.5 測試按鈕尺寸

**測試檔案**: `/client/src/components/__tests__/ButtonSizes.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils'
import { SelectionView } from '../SelectionView'
import { CardDeck } from '../CardDeck'
import { ReadingResult } from '../ReadingResult'
import { SetupView } from '../SetupView'

describe('Button Sizes - Accessibility', () => {
  it('SelectionView restart button should meet 44px minimum', () => {
    const { container } = render(
      <SelectionView
        selectedCards={[]}
        maxCards={3}
        onRestart={() => {}}
        onComplete={() => {}}
      />
    )

    const button = container.querySelector('button') as HTMLButtonElement
    expect(button.className).toContain('min-h-[44px]')
  })

  it('CardDeck shuffle button should meet 44px minimum', () => {
    const { container } = render(
      <CardDeck onCardSelected={() => {}} maxSelections={3} />
    )

    const shuffleButton = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.includes('洗牌')
    )

    expect(shuffleButton?.className).toContain('min-h-[44px]')
  })

  it('ReadingResult action buttons should meet 44px minimum', () => {
    const mockReading = {
      id: 'test',
      question: '測試',
      spreadType: 'three-card',
      selectedCards: [],
      timestamp: Date.now(),
    }

    const { container } = render(<ReadingResult reading={mockReading} />)

    const buttons = container.querySelectorAll('button')
    buttons.forEach((button) => {
      if (button.textContent?.includes('複製') || button.textContent?.includes('ChatGPT')) {
        expect(button.className).toContain('min-h-[44px]')
      }
    })
  })

  it('SetupView start button should meet 48px minimum (prominent action)', () => {
    const { container } = render(<SetupView onStart={() => {}} />)

    const startButton = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.includes('開始占卜')
    )

    expect(startButton?.className).toContain('min-h-[48px]')
  })
})
```

---

### 步驟 4: 修復色彩對比度 (15 分鐘)

#### 4.1 SetupView.tsx - 說明文字

**檔案位置**: `/client/src/components/SetupView.tsx:120`

**修改前**:
```typescript
<p className="text-sm text-slate-500 mt-1">
  請輸入你想要占卜的問題或主題
</p>
```

**修改後**:
```typescript
<p className="text-sm text-slate-300 mt-1">
  請輸入你想要占卜的問題或主題
</p>
```

#### 4.2 ReadingResult.tsx - 逆位標籤

**檔案位置**: `/client/src/components/ReadingResult.tsx:229`

**修改前**:
```typescript
<span className="inline-block px-2 py-1 text-xs bg-red-900/30 text-red-300 rounded">
  逆位
</span>
```

**修改後**:
```typescript
<span className="inline-block px-2 py-1 text-xs bg-red-900 text-red-50 border border-red-600 rounded">
  逆位
</span>
```

#### 4.3 SpreadLayout.tsx - 牌位說明文字

**檔案位置**: `/client/src/components/SpreadLayout.tsx:45`

**修改前**:
```typescript
<p className="text-sm text-slate-400 mt-1">
  {position.description}
</p>
```

**修改後**:
```typescript
<p className="text-sm text-slate-300 mt-1">
  {position.description}
</p>
```

#### 4.4 測試色彩對比度

**測試檔案**: `/client/src/components/__tests__/ColorContrast.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils'
import { SetupView } from '../SetupView'
import { ReadingResult } from '../ReadingResult'
import { SpreadLayout } from '../SpreadLayout'

describe('Color Contrast - WCAG AA Compliance', () => {
  it('SetupView help text should have sufficient contrast', () => {
    const { container } = render(<SetupView onStart={() => {}} />)

    const helpText = Array.from(container.querySelectorAll('p')).find(
      (p) => p.textContent?.includes('請輸入你想要占卜的問題')
    )

    // text-slate-300 on dark background meets WCAG AA (4.5:1)
    expect(helpText?.className).toContain('text-slate-300')
    expect(helpText?.className).not.toContain('text-slate-500')
  })

  it('ReadingResult reversed badge should have high contrast', () => {
    const mockReading = {
      id: 'test',
      question: '測試',
      spreadType: 'three-card',
      selectedCards: [
        {
          card: { id: 1, name: '愚者', nameEn: 'The Fool' },
          isReversed: true,
          position: 1,
        },
      ],
      timestamp: Date.now(),
    }

    const { container } = render(<ReadingResult reading={mockReading} />)

    const badge = container.querySelector('span')
    if (badge?.textContent === '逆位') {
      expect(badge.className).toContain('bg-red-900')
      expect(badge.className).toContain('text-red-50')
    }
  })

  it('SpreadLayout position descriptions should have sufficient contrast', () => {
    const { container } = render(
      <SpreadLayout
        spreadType="three-card"
        selectedCards={[]}
        onPositionClick={() => {}}
      />
    )

    const descriptions = container.querySelectorAll('.text-sm')
    descriptions.forEach((desc) => {
      if (desc.textContent && desc.textContent.length > 0) {
        expect(desc.className).toContain('text-slate-300')
        expect(desc.className).not.toContain('text-slate-400')
      }
    })
  })
})
```

---

### 步驟 5: 建立全域 Error Boundary (20 分鐘)

#### 5.1 建立 Error Boundary

**檔案**: `/client/src/app/error.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 記錄錯誤到監控服務 (未來可整合 Sentry)
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 text-center">
        <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          發生了一些問題
        </h1>

        <p className="text-slate-300 mb-6">
          我們遇到了一個意外的錯誤。請嘗試重新載入，或返回首頁。
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300 mb-2">
              顯示錯誤詳情 (開發模式)
            </summary>
            <pre className="text-xs text-red-300 bg-slate-900/50 p-4 rounded overflow-auto max-h-40">
              {error.message}
              {error.digest && `\n\nError Digest: ${error.digest}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 px-4 py-3 min-h-[44px] bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            aria-label="重新嘗試"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            重新嘗試
          </button>

          <Link
            href="/"
            className="flex-1 px-4 py-3 min-h-[44px] bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2"
            aria-label="返回首頁"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
```

#### 5.2 建立 Global Error Handler

**檔案**: `/client/src/app/global-error.tsx`

```typescript
'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return (
    <html lang="zh-TW">
      <body>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              應用程式錯誤
            </h1>
            <p className="text-slate-300 mb-6">
              發生了嚴重錯誤，請重新載入頁面。
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 min-h-[44px] bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              重新載入
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
```

#### 5.3 建立 Not Found 頁面

**檔案**: `/client/src/app/not-found.tsx`

```typescript
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-8xl font-bold text-purple-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">找不到頁面</h2>
        <p className="text-slate-300 mb-8">
          您要找的頁面似乎不存在，或可能已被移除。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 min-h-[44px] bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            返回首頁
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 min-h-[44px] bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            返回上一頁
          </button>
        </div>
      </div>
    </div>
  )
}
```

#### 5.4 測試 Error Boundary

**測試檔案**: `/client/src/app/__tests__/error.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import Error from '../error'

describe('Error Boundary', () => {
  const mockError = new Error('Test error')
  const mockReset = vi.fn()

  it('should render error message', () => {
    render(<Error error={mockError} reset={mockReset} />)

    expect(screen.getByText('發生了一些問題')).toBeInTheDocument()
  })

  it('should call reset when retry button clicked', () => {
    render(<Error error={mockError} reset={mockReset} />)

    const retryButton = screen.getByLabelText('重新嘗試')
    retryButton.click()

    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('should have link to home page', () => {
    render(<Error error={mockError} reset={mockReset} />)

    const homeLink = screen.getByLabelText('返回首頁')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(<Error error={mockError} reset={mockReset} />)

    expect(screen.getByText(/顯示錯誤詳情/)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})
```

---

### 步驟 6: 改善 Celtic Cross 響應式佈局 (30 分鐘)

#### 6.1 修改 SpreadLayout.tsx - Celtic Cross 佈局

**檔案位置**: `/client/src/components/SpreadLayout.tsx:83-243`

**修改策略**:
1. 在小螢幕 (< 640px) 改用垂直堆疊佈局
2. 在中等螢幕 (640px - 1024px) 使用簡化的網格佈局
3. 在大螢幕 (>= 1024px) 使用原有的絕對定位佈局

**修改後**:

```typescript
// Celtic Cross 佈局
if (spreadType === 'celtic-cross') {
  return (
    <>
      {/* 大螢幕：原有佈局 */}
      <div className="hidden lg:block relative w-[280px] h-[520px] mx-auto">
        {/* 原有的絕對定位佈局 */}
        {/* 位置 1-10 的絕對定位 */}
        {/* ... */}
      </div>

      {/* 中等螢幕：簡化網格佈局 */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 max-w-md mx-auto">
        <div className="col-span-2">
          {renderPosition(0, '現況', '你目前所處的狀態與環境')}
        </div>
        <div>{renderPosition(1, '挑戰', '當前面臨的障礙或機會')}</div>
        <div>{renderPosition(2, '根源', '問題或情況的起源')}</div>
        <div>{renderPosition(3, '過去', '過去影響現在的事件')}</div>
        <div>{renderPosition(4, '可能', '可能發生的最好結果')}</div>
        <div>{renderPosition(5, '未來', '近期內可能的發展')}</div>
        <div>{renderPosition(6, '自身', '你的態度與看法')}</div>
        <div>{renderPosition(7, '環境', '外在影響與他人看法')}</div>
        <div>{renderPosition(8, '希望', '你的期望與恐懼')}</div>
        <div className="col-span-2">
          {renderPosition(9, '結果', '最終的結果與建議')}
        </div>
      </div>

      {/* 小螢幕：垂直堆疊 */}
      <div className="flex sm:hidden flex-col gap-4 max-w-xs mx-auto">
        {positions.map((position, index) => (
          <div key={index}>
            {renderPosition(
              index,
              position.name,
              position.description
            )}
          </div>
        ))}
      </div>
    </>
  )
}
```

**完整的響應式 Celtic Cross 實作**:

```typescript
// 在 SpreadLayout 元件中

const celticCrossPositions = [
  { name: '現況', description: '你目前所處的狀態與環境' },
  { name: '挑戰', description: '當前面臨的障礙或機會' },
  { name: '根源', description: '問題或情況的起源' },
  { name: '過去', description: '過去影響現在的事件' },
  { name: '可能', description: '可能發生的最好結果' },
  { name: '未來', description: '近期內可能的發展' },
  { name: '自身', description: '你的態度與看法' },
  { name: '環境', description: '外在影響與他人看法' },
  { name: '希望', description: '你的期望與恐懼' },
  { name: '結果', description: '最終的結果與建議' },
]

const renderCelticCross = () => {
  return (
    <div className="w-full">
      {/* 大螢幕佈局 (>= 1024px) */}
      <div className="hidden lg:block">
        <div className="relative w-[320px] h-[560px] mx-auto">
          {/* 中心十字 */}
          <div className="absolute top-[200px] left-[110px]">
            {renderPosition(0, celticCrossPositions[0])}
          </div>
          <div className="absolute top-[200px] left-[110px] rotate-90 origin-center">
            {renderPosition(1, celticCrossPositions[1])}
          </div>

          {/* 四周卡牌 */}
          <div className="absolute top-[60px] left-[110px]">
            {renderPosition(2, celticCrossPositions[2])}
          </div>
          <div className="absolute top-[340px] left-[110px]">
            {renderPosition(3, celticCrossPositions[3])}
          </div>
          <div className="absolute top-[200px] left-0">
            {renderPosition(4, celticCrossPositions[4])}
          </div>
          <div className="absolute top-[200px] left-[220px]">
            {renderPosition(5, celticCrossPositions[5])}
          </div>

          {/* 右側塔 */}
          <div className="absolute top-[420px] right-0">
            {renderPosition(6, celticCrossPositions[6])}
          </div>
          <div className="absolute top-[310px] right-0">
            {renderPosition(7, celticCrossPositions[7])}
          </div>
          <div className="absolute top-[200px] right-0">
            {renderPosition(8, celticCrossPositions[8])}
          </div>
          <div className="absolute top-[90px] right-0">
            {renderPosition(9, celticCrossPositions[9])}
          </div>
        </div>
      </div>

      {/* 中等螢幕佈局 (640px - 1023px) */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4 max-w-lg mx-auto">
        <div className="col-span-2">
          {renderPosition(0, celticCrossPositions[0])}
        </div>
        {celticCrossPositions.slice(1).map((position, index) => (
          <div key={index + 1} className={index === 8 ? 'col-span-2' : ''}>
            {renderPosition(index + 1, position)}
          </div>
        ))}
      </div>

      {/* 小螢幕佈局 (< 640px) */}
      <div className="flex sm:hidden flex-col gap-3 px-4">
        {celticCrossPositions.map((position, index) => (
          <div key={index}>
            {renderPosition(index, position)}
          </div>
        ))}
      </div>
    </div>
  )
}

const renderPosition = (
  index: number,
  position: { name: string; description: string }
) => {
  const selectedCard = selectedCards.find((c) => c.position === index)
  const isClickable = !selectedCard && onPositionClick

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-700 bg-slate-800/50',
        isClickable && 'cursor-pointer hover:bg-slate-700/50 transition-colors'
      )}
      onClick={() => isClickable && onPositionClick(index)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={`${position.name}：${position.description}`}
    >
      <div className="text-center min-w-0">
        <h3 className="font-semibold text-white text-sm">{position.name}</h3>
        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
          {position.description}
        </p>
      </div>

      {selectedCard ? (
        <TarotCardComponent
          card={selectedCard.card}
          isReversed={selectedCard.isReversed}
          size="sm"
        />
      ) : (
        <div className="w-16 h-24 border-2 border-dashed border-slate-600 rounded flex items-center justify-center">
          <span className="text-slate-500 text-xs">待選</span>
        </div>
      )}
    </div>
  )
}
```

#### 6.2 測試響應式佈局

**測試檔案**: `/client/src/components/__tests__/SpreadLayoutResponsive.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils'
import { SpreadLayout } from '../SpreadLayout'

describe('SpreadLayout - Responsive Celtic Cross', () => {
  const mockCards = []
  const mockOnClick = vi.fn()

  it('should render vertical layout on small screens', () => {
    // Mock window.matchMedia for small screen
    global.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 639px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))

    const { container } = render(
      <SpreadLayout
        spreadType="celtic-cross"
        selectedCards={mockCards}
        onPositionClick={mockOnClick}
      />
    )

    // 檢查是否有垂直佈局的類別
    const verticalLayout = container.querySelector('.flex.flex-col')
    expect(verticalLayout).toBeInTheDocument()
  })

  it('should render all 10 positions', () => {
    const { container } = render(
      <SpreadLayout
        spreadType="celtic-cross"
        selectedCards={mockCards}
        onPositionClick={mockOnClick}
      />
    )

    // 應該有 10 個牌位
    const positions = container.querySelectorAll('[role="button"]')
    expect(positions.length).toBeGreaterThanOrEqual(10)
  })

  it('should handle position click', () => {
    render(
      <SpreadLayout
        spreadType="celtic-cross"
        selectedCards={mockCards}
        onPositionClick={mockOnClick}
      />
    )

    const firstPosition = screen.getAllByRole('button')[0]
    firstPosition.click()

    expect(mockOnClick).toHaveBeenCalledWith(0)
  })
})
```

---

## Phase 1 完成檢查清單

### 功能檢查
- [ ] Toast 通知系統可正常顯示成功/錯誤/警告/資訊訊息
- [ ] Toast 可正確自動關閉或手動關閉
- [ ] Skeleton 在卡牌詳細頁正確顯示
- [ ] 所有 5 個按鈕尺寸符合 44px 最小標準
- [ ] 3 處色彩對比度問題已修復
- [ ] Error Boundary 可正確捕獲並顯示錯誤
- [ ] Celtic Cross 在所有螢幕尺寸正常顯示

### 測試檢查
- [ ] `npm test` 全部通過
- [ ] 新增的測試覆蓋率達標
- [ ] `npm run lint` 無錯誤
- [ ] `npm run build` 成功

### 裝置測試
- [ ] iPhone SE (320px) - Celtic Cross 垂直佈局
- [ ] iPhone 12 (390px) - 所有按鈕可正常點擊
- [ ] iPad (768px) - Celtic Cross 網格佈局
- [ ] Desktop (1920px) - Celtic Cross 原始佈局

### 無障礙檢查
- [ ] 所有互動元素有 aria-label
- [ ] Toast 有 role="alert" 和 aria-live
- [ ] 鍵盤可正常導航所有元素
- [ ] 螢幕閱讀器可正確讀取內容

---

## Phase 2: 中優先級改善 (2-3 小時)

### 步驟 7: 新增進度指示器 (30 分鐘)

#### 7.1 建立 ProgressSteps 元件

**檔案**: `/client/src/components/ui/ProgressSteps.tsx`

```typescript
interface Step {
  id: string
  label: string
  description?: string
}

interface ProgressStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  return (
    <div className={cn('w-full', className)} role="navigation" aria-label="占卜進度">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <li key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* 圓圈 */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-colors',
                    isCompleted && 'bg-purple-600 border-purple-600 text-white',
                    isCurrent && 'bg-purple-600 border-purple-600 text-white ring-4 ring-purple-600/30',
                    isUpcoming && 'bg-slate-800 border-slate-600 text-slate-400'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                {/* 標籤 */}
                <div className="text-center mt-2">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      (isCompleted || isCurrent) && 'text-white',
                      isUpcoming && 'text-slate-400'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                  )}
                </div>
              </div>

              {/* 連接線 */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-[2px] flex-1 mx-2 transition-colors',
                    isCompleted ? 'bg-purple-600' : 'bg-slate-700'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
```

#### 7.2 整合到主頁面

**修改檔案**: `/client/src/app/page.tsx`

```typescript
import { ProgressSteps } from '@/components/ui/ProgressSteps'

const steps = [
  { id: 'setup', label: '設定', description: '輸入問題' },
  { id: 'select', label: '選牌', description: '抽取塔羅牌' },
  { id: 'result', label: '結果', description: '查看解讀' },
]

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'setup' | 'selection' | 'result'>('setup')

  const currentStepIndex =
    currentView === 'setup' ? 0 :
    currentView === 'selection' ? 1 : 2

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* 進度指示器 */}
        <ProgressSteps steps={steps} currentStep={currentStepIndex} className="mb-8" />

        {/* 原有的視圖切換邏輯 */}
        {currentView === 'setup' && <SetupView onStart={handleStart} />}
        {currentView === 'selection' && <SelectionView ... />}
        {currentView === 'result' && <ReadingResult ... />}
      </div>
    </main>
  )
}
```

### 步驟 8: 優化載入狀態 (30 分鐘)

#### 8.1 建立統一的 Loading 元件

**檔案**: `/client/src/components/ui/Loading.tsx`

```typescript
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullscreen?: boolean
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
}

export function Loading({ size = 'md', text, fullscreen = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'border-4 border-slate-700 border-t-purple-600 rounded-full animate-spin',
          sizeClasses[size]
        )}
        role="status"
        aria-label="載入中"
      />
      {text && (
        <p className="text-slate-300 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
      <span className="sr-only">載入中，請稍候</span>
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}
```

#### 8.2 改善 CardDeck 洗牌載入狀態

**修改檔案**: `/client/src/components/CardDeck.tsx`

```typescript
import { Loading } from '@/components/ui/Loading'

const handleShuffle = async () => {
  setIsShuffling(true)

  // 移除人工延遲，使用實際的洗牌動畫
  await new Promise(resolve => setTimeout(resolve, 500)) // 僅保留動畫時間

  const shuffled = [...cards].sort(() => Math.random() - 0.5)
  setCards(shuffled)
  setIsShuffling(false)
}

return (
  <div className="relative">
    {isShuffling && (
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
        <Loading size="lg" text="洗牌中..." />
      </div>
    )}

    {/* 原有的卡牌網格 */}
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <TarotCardComponent key={card.id} card={card} />
      ))}
    </div>
  </div>
)
```

### 步驟 9: 增強表單驗證 (40 分鐘)

#### 9.1 新增即時表單驗證到 SetupView

**修改檔案**: `/client/src/components/SetupView.tsx`

```typescript
import { useToast } from '@/hooks/useToast'

const MAX_QUESTION_LENGTH = 200
const MIN_QUESTION_LENGTH = 5

export function SetupView({ onStart }: SetupViewProps) {
  const [question, setQuestion] = useState('')
  const [spreadType, setSpreadType] = useState<SpreadType | null>(null)
  const [errors, setErrors] = useState<{ question?: string; spread?: string }>({})
  const toast = useToast()

  const validateQuestion = (value: string): string | undefined => {
    if (value.trim().length === 0) {
      return undefined // 空白時不顯示錯誤
    }
    if (value.trim().length < MIN_QUESTION_LENGTH) {
      return `問題至少需要 ${MIN_QUESTION_LENGTH} 個字元`
    }
    if (value.length > MAX_QUESTION_LENGTH) {
      return `問題不可超過 ${MAX_QUESTION_LENGTH} 個字元`
    }
    return undefined
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setQuestion(value)

    const error = validateQuestion(value)
    setErrors((prev) => ({ ...prev, question: error }))
  }

  const handleStart = () => {
    // 最終驗證
    const questionError = validateQuestion(question)
    const spreadError = !spreadType ? '請選擇一種牌陣' : undefined

    if (questionError || spreadError) {
      setErrors({ question: questionError, spread: spreadError })
      toast.error('請修正表單錯誤後再繼續', 4000)
      return
    }

    onStart(question, spreadType)
  }

  const isValid =
    question.trim().length >= MIN_QUESTION_LENGTH &&
    question.length <= MAX_QUESTION_LENGTH &&
    spreadType !== null

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* 問題輸入 */}
      <div>
        <label htmlFor="question" className="block text-lg font-semibold mb-3">
          你的問題
          <span className="text-red-400 ml-1" aria-label="必填">*</span>
        </label>

        <textarea
          id="question"
          value={question}
          onChange={handleQuestionChange}
          placeholder="例如：我該如何改善目前的工作狀況？"
          className={cn(
            'w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-slate-500',
            'focus:outline-none focus:ring-2 transition-all',
            errors.question
              ? 'border-red-600 focus:ring-red-600'
              : 'border-slate-600 focus:ring-purple-600'
          )}
          rows={4}
          maxLength={MAX_QUESTION_LENGTH}
          aria-invalid={!!errors.question}
          aria-describedby={errors.question ? 'question-error' : 'question-help'}
        />

        <div className="flex justify-between items-start mt-2">
          <div className="flex-1">
            {errors.question ? (
              <p id="question-error" className="text-sm text-red-400" role="alert">
                {errors.question}
              </p>
            ) : (
              <p id="question-help" className="text-sm text-slate-300">
                請輸入你想要占卜的問題或主題
              </p>
            )}
          </div>

          <p
            className={cn(
              'text-sm ml-4',
              question.length > MAX_QUESTION_LENGTH * 0.9
                ? 'text-red-400'
                : 'text-slate-400'
            )}
            aria-live="polite"
          >
            {question.length}/{MAX_QUESTION_LENGTH}
          </p>
        </div>
      </div>

      {/* 牌陣選擇 */}
      <div>
        <label className="block text-lg font-semibold mb-3">
          選擇牌陣
          <span className="text-red-400 ml-1" aria-label="必填">*</span>
        </label>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          role="radiogroup"
          aria-label="選擇占卜牌陣"
          aria-required="true"
        >
          {spreadOptions.map((option) => (
            <button
              key={option.type}
              type="button"
              role="radio"
              aria-checked={spreadType === option.type}
              onClick={() => {
                setSpreadType(option.type)
                setErrors((prev) => ({ ...prev, spread: undefined }))
              }}
              className={cn(
                'p-4 rounded-lg border-2 text-left transition-all',
                spreadType === option.type
                  ? 'border-purple-600 bg-purple-600/20'
                  : 'border-slate-600 hover:border-slate-500'
              )}
            >
              <h3 className="font-semibold text-white mb-1">{option.name}</h3>
              <p className="text-sm text-slate-300">{option.description}</p>
            </button>
          ))}
        </div>

        {errors.spread && (
          <p className="text-sm text-red-400 mt-2" role="alert">
            {errors.spread}
          </p>
        )}
      </div>

      {/* 開始按鈕 */}
      <button
        onClick={handleStart}
        disabled={!isValid}
        className="w-full px-6 py-4 min-h-[48px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-bold text-xl transition-all"
        aria-label="開始塔羅占卜"
      >
        開始占卜
      </button>
    </div>
  )
}
```

### 步驟 10: 改善無障礙標籤 (30 分鐘)

略（詳細步驟省略，主要是為各個互動元素添加適當的 ARIA 標籤）

### 步驟 11: 優化錯誤處理 (30 分鐘)

略（詳細步驟省略，主要是整合 Toast 到各個錯誤處理點）

---

## Phase 3: 低優先級改善 (1-2 小時)

此階段主要為質感提升，實作步驟較為簡略，可依實際需求調整優先順序。

### 步驟 12: 建立設計系統文件

建立 `/client/src/styles/design-system.md` 記錄：
- 色彩系統
- 間距系統
- 字型系統
- 元件規範

### 步驟 13: 新增微動畫

使用 Framer Motion 或 CSS animations 為以下元素新增動畫：
- 卡牌翻轉
- 抽卡動畫
- Toast 進入/離開
- 按鈕點擊回饋

### 步驟 14: 改善 Onboarding

為首次使用者新增：
- 功能導覽
- 牌陣說明彈窗
- 使用提示

### 步驟 15: 效能優化

- 使用 `next/image` 優化圖片
- 實作虛擬滾動 (如果卡牌列表很長)
- 使用 React.memo 減少不必要的重渲染
- Code splitting

---

## 實作順序建議

### 建議一：循序漸進
1. 完成 Phase 1 所有步驟
2. 測試並修復問題
3. 進入 Phase 2
4. 最後處理 Phase 3

### 建議二：按類型分組
1. 先完成所有元件建立 (Toast, Skeleton, Error)
2. 再完成所有修復 (按鈕、色彩、響應式)
3. 最後處理測試

### 建議三：先處理高影響項目
1. Toast 系統（影響所有錯誤處理）
2. 按鈕尺寸（影響所有使用者操作）
3. Error Boundary（提升系統穩定性）
4. 其他項目

---

## 測試檢查清單

### 單元測試
- [ ] Toast 元件測試
- [ ] Toast Hook 測試
- [ ] Skeleton 元件測試
- [ ] 按鈕尺寸測試
- [ ] 色彩對比度測試
- [ ] Error Boundary 測試
- [ ] 響應式佈局測試

### 整合測試
- [ ] 完整占卜流程（Setup → Selection → Result）
- [ ] Toast 在實際操作中正確顯示
- [ ] 錯誤處理流程
- [ ] 複製/分享功能

### E2E 測試
```typescript
// /client/e2e/ui-improvements.spec.ts

import { test, expect } from '@playwright/test'

test.describe('UI/UX Improvements', () => {
  test('should show toast on copy success', async ({ page }) => {
    await page.goto('/')
    // ... 完成占卜流程
    await page.click('text=複製結果')

    // 應該顯示成功 Toast
    await expect(page.locator('[role="alert"]')).toContainText('已成功複製')
  })

  test('buttons should meet 44px minimum', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const box = await button.boundingBox()
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44)
      }
    }
  })

  test('should handle errors gracefully', async ({ page }) => {
    await page.goto('/cards/invalid-id')

    // 應該顯示友善的錯誤頁面
    await expect(page.locator('text=發生了一些問題')).toBeVisible()
    await expect(page.locator('text=重新嘗試')).toBeVisible()
  })

  test('Celtic Cross should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // ... 選擇 Celtic Cross
    // 應該顯示垂直佈局
    const layout = page.locator('.flex.flex-col')
    await expect(layout).toBeVisible()
  })
})
```

### 手動測試

#### 裝置測試矩陣
| 裝置 | 解析度 | 測試項目 | 狀態 |
|------|--------|----------|------|
| iPhone SE | 320×568 | Celtic Cross 垂直佈局 | ⏳ |
| iPhone 12 | 390×844 | 按鈕點擊 | ⏳ |
| iPad | 768×1024 | Celtic Cross 網格 | ⏳ |
| Desktop | 1920×1080 | 完整佈局 | ⏳ |

#### 瀏覽器測試
- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] Edge (最新版)

#### 無障礙測試
- [ ] 使用 VoiceOver (macOS)
- [ ] 使用 NVDA (Windows)
- [ ] 鍵盤導航
- [ ] Lighthouse Accessibility Score > 90

---

## 完成後的驗收標準

### Phase 1
- ✅ 所有按鈕尺寸符合 44px 標準
- ✅ 色彩對比度達到 WCAG AA 標準 (4.5:1)
- ✅ Toast 系統完整運作
- ✅ Skeleton 載入狀態優化
- ✅ Error Boundary 正確捕獲錯誤
- ✅ Celtic Cross 在所有裝置正常顯示
- ✅ 所有測試通過
- ✅ Lighthouse Performance > 80
- ✅ Lighthouse Accessibility > 90

### Phase 2
- ✅ 進度指示器清晰顯示
- ✅ 載入狀態專業化
- ✅ 表單驗證即時且友善
- ✅ 無障礙標籤完整
- ✅ 錯誤處理統一且使用者友善

### Phase 3
- ✅ 設計系統文件完整
- ✅ 動畫流暢不卡頓
- ✅ 首次使用體驗良好
- ✅ 效能指標達標

---

## 參考資源

### 設計標準
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Accessibility](https://material.io/design/usability/accessibility.html)

### 測試工具
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 相關文件
- [UI/UX 審查報告](./ui-ux-audit-report.md)
- [Mid-Priority 計劃](./mid-priority.md)

---

最後更新：2026-01-07
