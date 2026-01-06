# 高優先級改善項目 - 詳細實作指南

> 最後更新：2026-01-06
> 預估總時間：20-24 小時

---

## 📋 項目總覽

| 項目 | 優先級 | 預估時間 | 難度 | 影響範圍 |
|------|--------|----------|------|----------|
| 1. 程式碼清理 | ⭐⭐⭐⭐⭐ | 1 小時 | 簡單 | 程式碼品質 |
| 2. 環境變數管理 | ⭐⭐⭐⭐⭐ | 2 小時 | 簡單 | 安全性/部署 |
| 3. 圖片優化 | ⭐⭐⭐⭐⭐ | 2 小時 | 簡單 | 效能 |
| 4. 測試覆蓋率 | ⭐⭐⭐⭐ | 16 小時 | 中等 | 程式碼品質 |

**建議順序**：1 → 2 → 3 → 4

---

## 項目 1：程式碼清理

### 📝 目標
- 刪除未使用的舊版檔案
- 清理重複程式碼
- 提升程式碼可維護性

### 🎯 成功標準
- [ ] 沒有 `-old`, `-new`, `backup` 檔案
- [ ] 沒有未使用的 imports
- [ ] 沒有註解掉的程式碼區塊

### 📋 實作步驟

#### Step 1.1：識別並刪除舊檔案

```bash
# 1. 切換到專案目錄
cd /Users/shu-weiwu/projects/wade-through-tarot/client

# 2. 搜尋舊版檔案
find src -name "*-old.*" -o -name "*-new.*" -o -name "*backup*" -o -name "*.bak"

# 3. 預期會找到：
# src/app/page-old.tsx
# src/app/page-new.tsx

# 4. 檢查這些檔案是否還在使用
grep -r "page-old" src/
grep -r "page-new" src/

# 5. 確認沒有引用後刪除
rm src/app/page-old.tsx
rm src/app/page-new.tsx
```

#### Step 1.2：檢查並合併重複的資料檔

```bash
# 檢查 tarotCards 相關檔案
ls -lh src/data/tarot*

# 預期檔案：
# - tarotCards.ts
# - tarotCardsExtended.ts
# - deepAnalysisData.ts
```

**決策點**：
- 如果 `tarotCardsExtended.ts` 包含完整資料，可考慮合併
- 如果是用於不同用途，保持分離

**檢查方式**：
```bash
# 比較兩個檔案的結構
head -50 src/data/tarotCards.ts
head -50 src/data/tarotCardsExtended.ts
```

#### Step 1.3：清理未使用的 imports

```bash
# 安裝檢查工具
npm install -D eslint-plugin-unused-imports

# 更新 .eslintrc.json
```

**新增到 ESLint 配置**：
```json
{
  "plugins": ["unused-imports"],
  "rules": {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ]
  }
}
```

**執行清理**：
```bash
npm run lint -- --fix
```

#### Step 1.4：檢查未使用的 exports

```bash
# 安裝工具
npm install -D ts-prune

# 執行檢查
npx ts-prune

# 手動檢查並移除未使用的 exports
```

#### Step 1.5：移除註解掉的程式碼

手動檢查以下檔案中的大段註解：
- `src/components/*.tsx`
- `src/app/page.tsx`
- `src/store/tarotStore.ts`

**原則**：
- 保留有價值的註解（解釋為什麼這樣做）
- 刪除註解掉的程式碼（git 歷史已保存）
- 刪除 TODO 註解（改用 GitHub Issues）

#### Step 1.6：Git 提交

```bash
# 查看變更
git status
git diff

# 提交變更
git add .
git commit -m "chore: remove unused files and clean up code

- Remove page-old.tsx and page-new.tsx
- Clean up unused imports
- Remove commented code blocks"
```

### ✅ 驗證清單
- [ ] 所有舊版檔案已刪除
- [ ] `npm run lint` 無錯誤
- [ ] `npm run build` 成功
- [ ] 應用程式正常運作

---

## 項目 2：環境變數管理

### 📝 目標
- 將硬編碼的設定移至環境變數
- 建立環境變數範例檔
- 新增環境變數驗證

### 🎯 成功標準
- [ ] `.env.example` 已建立
- [ ] 所有敏感資訊使用環境變數
- [ ] 開發者可輕鬆設定環境

### 📋 實作步驟

#### Step 2.1：識別需要移至環境變數的設定

```bash
# 搜尋硬編碼的 ID 和設定
cd /Users/shu-weiwu/projects/wade-through-tarot/client
grep -r "G-" src/
grep -r "ca-pub-" src/
grep -r "process.env" src/
```

**預期找到**：
- Google Analytics ID
- Google AdSense ID
- 其他 API keys 或設定

#### Step 2.2：建立 .env.example 檔案

```bash
# 在 client 目錄下建立檔案
cat > .env.example << 'EOF'
# ===========================================
# Wade Through Tarot - 環境變數設定範例
# ===========================================

# -----------------
# Google Analytics
# -----------------
# 在 https://analytics.google.com/ 取得
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# -----------------
# Google AdSense
# -----------------
# 在 https://www.google.com/adsense/ 取得
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# -----------------
# 網站設定
# -----------------
NEXT_PUBLIC_SITE_URL=https://wade-through-tarot.vercel.app
NEXT_PUBLIC_SITE_NAME=Wade Through Tarot

# -----------------
# 功能開關
# -----------------
# 開發模式（設為 'true' 關閉廣告）
NEXT_PUBLIC_DEV_MODE=false

# 啟用分析追蹤
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# -----------------
# 外部服務（可選）
# -----------------
# OpenAI API Key（未來 AI 功能使用）
# OPENAI_API_KEY=sk-...

# Sentry DSN（錯誤追蹤）
# NEXT_PUBLIC_SENTRY_DSN=https://...
EOF
```

#### Step 2.3：建立實際的 .env.local 檔案

```bash
# 複製範例檔案
cp .env.example .env.local

# 編輯填入實際值
# 使用你喜歡的編輯器（vim, nano, code, etc.）
```

**實際值範例**：
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-4201768192395434
NEXT_PUBLIC_SITE_URL=https://wade-through-tarot.vercel.app
NEXT_PUBLIC_SITE_NAME=Wade Through Tarot
NEXT_PUBLIC_DEV_MODE=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### Step 2.4：更新 .gitignore

```bash
# 確保 .env.local 不會被提交
cat >> .gitignore << 'EOF'

# 環境變數
.env.local
.env*.local
EOF
```

#### Step 2.5：更新 GoogleAnalytics 組件

**檔案**：`src/components/GoogleAnalytics.tsx`

**修改前**：
```typescript
const GA_MEASUREMENT_ID = 'G-HARDCODED-ID'
```

**修改後**：
```typescript
'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  // 檢查是否有設定 ID 且未在開發模式
  const isDev = process.env.NEXT_PUBLIC_DEV_MODE === 'true'
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'

  if (!GA_MEASUREMENT_ID || isDev || !isEnabled) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
```

#### Step 2.6：更新 GoogleAds 配置

**檔案**：`src/config/ads.ts`

**修改前**：
```typescript
export const ADSENSE_ID = 'ca-pub-4201768192395434'
```

**修改後**：
```typescript
// Google AdSense 配置
export const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || ''

// 檢查是否啟用廣告
export const isAdsEnabled = () => {
  const isDev = process.env.NEXT_PUBLIC_DEV_MODE === 'true'
  return !!ADSENSE_ID && !isDev
}

// 廣告單元配置
export const AD_SLOTS = {
  homepage_top: '1234567890',
  homepage_bottom: '0987654321',
  // ... 其他廣告位
} as const
```

#### Step 2.7：更新 GoogleAds 組件

**檔案**：`src/components/GoogleAds.tsx`

新增檢查邏輯：
```typescript
import { ADSENSE_ID, isAdsEnabled } from '@/config/ads'

export default function GoogleAds({ slot }: { slot: string }) {
  if (!isAdsEnabled()) {
    return null // 開發模式不顯示廣告
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
```

#### Step 2.8：（進階）新增環境變數驗證

```bash
# 安裝驗證工具
npm install -D @t3-oss/env-nextjs zod
```

**建立驗證檔案**：`src/env.ts`

```typescript
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * 客戶端環境變數（NEXT_PUBLIC_ 開頭）
   */
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_ADSENSE_ID: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_NAME: z.string().min(1),
    NEXT_PUBLIC_DEV_MODE: z.enum(['true', 'false']).default('false'),
    NEXT_PUBLIC_ENABLE_ANALYTICS: z.enum(['true', 'false']).default('true'),
  },

  /**
   * 伺服器端環境變數
   */
  server: {
    // 未來如果有伺服器端 API keys 可在此新增
    // OPENAI_API_KEY: z.string().min(1),
  },

  /**
   * 執行時期環境變數
   */
  runtimeEnv: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_DEV_MODE: process.env.NEXT_PUBLIC_DEV_MODE,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  },

  /**
   * 跳過驗證的條件（建置時）
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
```

**使用方式**：
```typescript
import { env } from '@/env'

// 取代 process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GA_ID = env.NEXT_PUBLIC_GA_MEASUREMENT_ID
```

#### Step 2.9：更新 Vercel 環境變數

登入 Vercel Dashboard：
1. 進入專案設定
2. 選擇「Environment Variables」
3. 新增以下變數：
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_ADSENSE_ID`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_DEV_MODE` (設為 `false`)
   - `NEXT_PUBLIC_ENABLE_ANALYTICS` (設為 `true`)

#### Step 2.10：測試與驗證

```bash
# 本地測試
npm run dev
# 檢查廣告是否顯示、Analytics 是否運作

# 建置測試
npm run build
npm start

# 環境變數驗證測試
NEXT_PUBLIC_SITE_URL=invalid npm run build
# 應該顯示驗證錯誤
```

#### Step 2.11：更新文件

**更新 README.md**：
```markdown
## 🚀 如何啟動

### 環境變數設定

1. 複製環境變數範例檔案：
   ```bash
   cp .env.example .env.local
   ```

2. 編輯 `.env.local` 填入實際值：
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: 從 Google Analytics 取得
   - `NEXT_PUBLIC_ADSENSE_ID`: 從 Google AdSense 取得

3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
```

#### Step 2.12：Git 提交

```bash
git add .
git commit -m "feat: implement environment variable management

- Create .env.example template
- Move hardcoded IDs to environment variables
- Add environment variable validation with zod
- Update GoogleAnalytics and GoogleAds components
- Update README with setup instructions"
```

### ✅ 驗證清單
- [ ] `.env.example` 已建立並包含所有必要變數
- [ ] `.env.local` 在 `.gitignore` 中
- [ ] 本地開發正常運作
- [ ] Vercel 環境變數已設定
- [ ] README 已更新說明

---

## 項目 3：圖片優化

### 📝 目標
- 將 78 張 JPEG 卡牌圖片轉換為 WebP 格式
- 減少圖片檔案大小 50-70%
- 提升頁面載入速度

### 🎯 成功標準
- [ ] 所有卡牌圖片轉換為 .webp
- [ ] 圖片品質不明顯下降
- [ ] Lighthouse Performance 分數提升

### 📋 實作步驟

#### Step 3.1：安裝圖片轉換工具

```bash
cd /Users/shu-weiwu/projects/wade-through-tarot/client

# 方案 A：使用 sharp-cli（推薦）
npm install -D sharp-cli

# 方案 B：使用 sharp 撰寫腳本
npm install -D sharp
```

#### Step 3.2：備份原始圖片

```bash
# 建立備份目錄
mkdir -p public/cards-backup

# 備份所有 JPEG 檔案
cp public/cards/*.jpeg public/cards-backup/

# 驗證備份
ls -lh public/cards-backup/ | wc -l
# 應該顯示 78 個檔案
```

#### Step 3.3：方案 A - 使用 sharp-cli 批次轉換

```bash
# 轉換所有 JPEG 為 WebP（品質 85）
npx sharp-cli \
  --input "public/cards/*.jpeg" \
  --output "public/cards/{name}.webp" \
  --webp '{"quality":85,"effort":6}'

# 檢查轉換結果
ls public/cards/*.webp | wc -l
# 應該顯示 78 個檔案
```

#### Step 3.4：方案 B - 使用腳本批次轉換（更多控制）

**建立轉換腳本**：`scripts/convert-images.js`

```javascript
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const cardsDir = path.join(__dirname, '../public/cards')
const files = fs.readdirSync(cardsDir).filter(f => f.endsWith('.jpeg'))

console.log(`🔄 開始轉換 ${files.length} 張圖片...`)

let converted = 0
let totalSaved = 0

Promise.all(
  files.map(async (file) => {
    const input = path.join(cardsDir, file)
    const output = path.join(cardsDir, file.replace('.jpeg', '.webp'))

    const inputStats = fs.statSync(input)
    const inputSize = inputStats.size

    await sharp(input)
      .webp({ quality: 85, effort: 6 })
      .toFile(output)

    const outputStats = fs.statSync(output)
    const outputSize = outputStats.size
    const saved = inputSize - outputSize
    const savedPercent = ((saved / inputSize) * 100).toFixed(1)

    totalSaved += saved
    converted++

    console.log(`✅ ${file} → ${savedPercent}% 縮小`)
  })
).then(() => {
  const totalSavedMB = (totalSaved / 1024 / 1024).toFixed(2)
  console.log(`\n🎉 完成！轉換 ${converted} 張圖片`)
  console.log(`💾 總共節省 ${totalSavedMB} MB`)
})
```

**執行腳本**：
```bash
node scripts/convert-images.js
```

#### Step 3.5：比較檔案大小

```bash
# 比較原始和轉換後的大小
echo "=== JPEG 總大小 ==="
du -sh public/cards-backup/

echo "=== WebP 總大小 ==="
du -sh public/cards/*.webp | awk '{sum+=$1} END {print sum}'

# 或使用更詳細的比較
ls -lh public/cards/*.jpeg | awk '{sum+=$5} END {print "JPEG Total:", sum}'
ls -lh public/cards/*.webp | awk '{sum+=$5} END {print "WebP Total:", sum}'
```

#### Step 3.6：更新程式碼中的圖片路徑

**檔案**：`src/data/tarotCards.ts`

使用搜尋取代：
```bash
# 方案 1：使用 sed（macOS）
sed -i '' 's/\.jpeg/\.webp/g' src/data/tarotCards.ts

# 方案 2：手動使用編輯器
# 搜尋：.jpeg
# 取代：.webp
```

**或者在程式碼中動態處理**：
```typescript
// src/utils/helpers.ts
export function getCardImageUrl(cardId: string): string {
  // 優先使用 WebP，降級到 JPEG
  const webpUrl = `/cards/${cardId}.webp`
  const jpegUrl = `/cards/${cardId}.jpeg`

  // 在客戶端可以檢查支援度
  return webpUrl // Next.js Image 會自動處理
}
```

#### Step 3.7：更新 tarotCardsExtended.ts（如果有）

```bash
sed -i '' 's/\.jpeg/\.webp/g' src/data/tarotCardsExtended.ts
```

#### Step 3.8：驗證圖片顯示正常

```bash
# 啟動開發伺服器
npm run dev

# 測試以下頁面：
# 1. 首頁 - 查看卡牌是否正常顯示
# 2. /cards - 查看圖鑑是否正常
# 3. 占卜流程 - 抽牌後是否正常
```

#### Step 3.9：（進階）新增圖片降級支援

使用 `<picture>` 標籤提供降級支援：

```typescript
// src/components/TarotCard.tsx
<picture>
  <source srcSet={`/cards/${card.id}.webp`} type="image/webp" />
  <source srcSet={`/cards/${card.id}.jpeg`} type="image/jpeg" />
  <img
    src={`/cards/${card.id}.webp`}
    alt={card.name}
    className="w-full h-full object-cover"
  />
</picture>
```

或使用 Next.js Image：
```typescript
import Image from 'next/image'

<Image
  src={`/cards/${card.id}.webp`}
  alt={card.name}
  width={300}
  height={500}
  quality={85}
  loading="lazy"
/>
```

#### Step 3.10：清理舊的 JPEG 檔案（可選）

```bash
# 確認 WebP 都正常運作後
# 刪除 public/cards/ 中的 JPEG 檔案
rm public/cards/*.jpeg

# 保留備份在 public/cards-backup/
```

#### Step 3.11：更新 .gitignore（保留備份在本地）

```bash
echo "public/cards-backup/" >> .gitignore
```

#### Step 3.12：效能測試

```bash
# 建置生產版本
npm run build

# 使用 Lighthouse 測試
# Chrome DevTools > Lighthouse > 跑分

# 比較指標：
# - Performance 分數
# - Largest Contentful Paint (LCP)
# - Total Blocking Time (TBT)
# - 總下載大小
```

#### Step 3.13：Git 提交

```bash
git add public/cards/*.webp
git add src/data/tarotCards.ts
git add src/data/tarotCardsExtended.ts
git add scripts/convert-images.js  # 如果使用腳本

git commit -m "perf: convert card images from JPEG to WebP

- Convert 78 tarot card images to WebP format
- Reduce image size by ~60% (X MB → Y MB)
- Update image references in tarotCards.ts
- Add image conversion script
- Improve page load performance"
```

### ✅ 驗證清單
- [ ] 78 張圖片成功轉換為 WebP
- [ ] 檔案大小減少 50% 以上
- [ ] 所有頁面圖片顯示正常
- [ ] Lighthouse Performance 分數提升
- [ ] 原始 JPEG 已備份

---

## 項目 4：測試覆蓋率

### 📝 目標
- 建立測試框架（Vitest + Testing Library）
- 為核心功能撰寫單元測試
- 新增 E2E 測試（Playwright）
- 達到 80% 測試覆蓋率

### 🎯 成功標準
- [ ] 測試框架設定完成
- [ ] 測試覆蓋率 > 80%
- [ ] CI/CD 整合測試
- [ ] 所有測試通過

### 📋 實作步驟

#### Step 4.1：安裝測試框架

```bash
cd /Users/shu-weiwu/projects/wade-through-tarot/client

# Vitest（單元測試）
npm install -D vitest @vitest/ui

# React Testing Library
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Playwright（E2E 測試）
npm install -D @playwright/test
npx playwright install
```

#### Step 4.2：設定 Vitest

**建立設定檔**：`vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.{js,ts}',
        '**/types.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

#### Step 4.3：建立測試設定檔

**建立檔案**：`src/test/setup.ts`

```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// 擴展 Vitest 的 expect
expect.extend(matchers)

// 每個測試後清理
afterEach(() => {
  cleanup()
})
```

#### Step 4.4：建立測試工具函數

**建立檔案**：`src/test/utils.tsx`

```typescript
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// 自訂 render 函數（可包裝 providers）
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options })
}

export * from '@testing-library/react'
export { customRender as render }
```

#### Step 4.5：撰寫測試 - 洗牌邏輯

**建立檔案**：`src/store/__tests__/tarotStore.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useTarotStore } from '../tarotStore'

describe('TarotStore - 洗牌邏輯', () => {
  beforeEach(() => {
    // 重置 store
    useTarotStore.setState({
      selectedCards: [],
      currentQuestion: '',
      spreadType: 'single',
    })
  })

  it('應該正確洗牌並返回不重複的卡牌', () => {
    const store = useTarotStore.getState()
    const shuffled = store.shuffleCards()

    // 檢查長度
    expect(shuffled).toHaveLength(78)

    // 檢查不重複
    const ids = shuffled.map(c => c.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(78)
  })

  it('每次洗牌結果應該不同', () => {
    const store = useTarotStore.getState()
    const shuffle1 = store.shuffleCards()
    const shuffle2 = store.shuffleCards()

    const ids1 = shuffle1.map(c => c.id).join(',')
    const ids2 = shuffle2.map(c => c.id).join(',')

    expect(ids1).not.toBe(ids2)
  })

  it('正逆位應該隨機分配', () => {
    const store = useTarotStore.getState()
    const cards = store.shuffleCards()

    const upright = cards.filter(c => !c.reversed).length
    const reversed = cards.filter(c => c.reversed).length

    // 應該有正位和逆位（統計上幾乎不可能全部一樣）
    expect(upright).toBeGreaterThan(0)
    expect(reversed).toBeGreaterThan(0)
  })
})

describe('TarotStore - 選牌邏輯', () => {
  it('單張牌應該只能選擇 1 張', () => {
    const store = useTarotStore.getState()
    store.setSpreadType('single')

    const card1 = { id: 'fool', position: 0, reversed: false }
    const card2 = { id: 'magician', position: 0, reversed: false }

    store.addSelectedCard(card1)
    expect(store.selectedCards).toHaveLength(1)

    store.addSelectedCard(card2)
    expect(store.selectedCards).toHaveLength(1)
    expect(store.selectedCards[0].id).toBe('fool')
  })

  it('三張牌應該可以選擇 3 張', () => {
    const store = useTarotStore.getState()
    store.setSpreadType('three-card')

    const cards = [
      { id: 'fool', position: 0, reversed: false },
      { id: 'magician', position: 1, reversed: true },
      { id: 'priestess', position: 2, reversed: false },
    ]

    cards.forEach(card => store.addSelectedCard(card))
    expect(store.selectedCards).toHaveLength(3)
  })

  it('不應該選擇重複的卡牌', () => {
    const store = useTarotStore.getState()
    const card = { id: 'fool', position: 0, reversed: false }

    store.addSelectedCard(card)
    store.addSelectedCard(card)

    expect(store.selectedCards).toHaveLength(1)
  })
})
```

#### Step 4.6：撰寫測試 - TarotCard 組件

**建立檔案**：`src/components/__tests__/TarotCard.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import TarotCard from '../TarotCard'

const mockCard = {
  id: 'fool',
  name: '愚者',
  nameEn: 'The Fool',
  suit: 'major' as const,
  number: 0,
  meaning: {
    upright: ['新開始', '冒險'],
    reversed: ['魯莽', '愚蠢'],
  },
  description: '愚者代表新的開始',
  keywords: ['開始', '冒險', '自由'],
  imageUrl: '/cards/fool.webp',
}

describe('TarotCard 組件', () => {
  it('應該正確渲染正位卡牌', () => {
    render(<TarotCard card={mockCard} reversed={false} />)

    expect(screen.getByAltText('愚者')).toBeInTheDocument()
    expect(screen.getByText('愚者')).toBeInTheDocument()
  })

  it('逆位卡牌應該有旋轉樣式', () => {
    const { container } = render(
      <TarotCard card={mockCard} reversed={true} />
    )

    const cardElement = container.querySelector('.tarot-card')
    expect(cardElement).toHaveClass('reversed') // 或檢查 transform style
  })

  it('點擊卡牌應該觸發 onClick', () => {
    const handleClick = vi.fn()
    render(<TarotCard card={mockCard} onClick={handleClick} />)

    const cardElement = screen.getByAltText('愚者')
    cardElement.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('禁用狀態不應該觸發點擊', () => {
    const handleClick = vi.fn()
    render(<TarotCard card={mockCard} disabled onClick={handleClick} />)

    const cardElement = screen.getByAltText('愚者')
    cardElement.click()

    expect(handleClick).not.toHaveBeenCalled()
  })
})
```

#### Step 4.7：撰寫測試 - SpreadLayout 組件

**建立檔案**：`src/components/__tests__/SpreadLayout.test.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import SpreadLayout from '../SpreadLayout'

describe('SpreadLayout 組件', () => {
  it('單張牌陣應該顯示 1 個位置', () => {
    const cards = [
      { id: 'fool', position: 0, reversed: false },
    ]

    render(<SpreadLayout type="single" cards={cards} />)

    const positions = screen.getAllByTestId('card-position')
    expect(positions).toHaveLength(1)
  })

  it('三張牌陣應該顯示 3 個位置', () => {
    const cards = [
      { id: 'fool', position: 0, reversed: false },
      { id: 'magician', position: 1, reversed: false },
      { id: 'priestess', position: 2, reversed: false },
    ]

    render(<SpreadLayout type="three-card" cards={cards} />)

    const positions = screen.getAllByTestId('card-position')
    expect(positions).toHaveLength(3)
  })

  it('凱爾特十字應該顯示 10 個位置', () => {
    const cards = Array.from({ length: 10 }, (_, i) => ({
      id: `card-${i}`,
      position: i,
      reversed: false,
    }))

    render(<SpreadLayout type="celtic-cross" cards={cards} />)

    const positions = screen.getAllByTestId('card-position')
    expect(positions).toHaveLength(10)
  })

  it('應該顯示正確的位置標籤', () => {
    const cards = [
      { id: 'fool', position: 0, reversed: false },
      { id: 'magician', position: 1, reversed: false },
      { id: 'priestess', position: 2, reversed: false },
    ]

    render(<SpreadLayout type="three-card" cards={cards} />)

    expect(screen.getByText('過去')).toBeInTheDocument()
    expect(screen.getByText('現在')).toBeInTheDocument()
    expect(screen.getByText('未來')).toBeInTheDocument()
  })
})
```

#### Step 4.8：撰寫測試 - 工具函數

**建立檔案**：`src/utils/__tests__/helpers.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate, shuffleArray, getCardMeaning } from '../helpers'

describe('Helper 函數', () => {
  describe('shuffleArray', () => {
    it('應該返回相同長度的陣列', () => {
      const arr = [1, 2, 3, 4, 5]
      const shuffled = shuffleArray([...arr])
      expect(shuffled).toHaveLength(arr.length)
    })

    it('應該包含所有原始元素', () => {
      const arr = [1, 2, 3, 4, 5]
      const shuffled = shuffleArray([...arr])
      arr.forEach(item => {
        expect(shuffled).toContain(item)
      })
    })

    it('不應該修改原始陣列', () => {
      const arr = [1, 2, 3, 4, 5]
      const original = [...arr]
      shuffleArray(arr)
      expect(arr).toEqual(original)
    })
  })

  describe('getCardMeaning', () => {
    const card = {
      meaning: {
        upright: ['正位意義'],
        reversed: ['逆位意義'],
      },
    }

    it('正位應該返回正位意義', () => {
      const meaning = getCardMeaning(card, false)
      expect(meaning).toContain('正位意義')
    })

    it('逆位應該返回逆位意義', () => {
      const meaning = getCardMeaning(card, true)
      expect(meaning).toContain('逆位意義')
    })
  })
})
```

#### Step 4.9：設定 E2E 測試（Playwright）

**建立設定檔**：`playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

#### Step 4.10：撰寫 E2E 測試

**建立檔案**：`e2e/tarot-reading.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('塔羅占卜流程', () => {
  test('完整占卜流程 - 單張牌', async ({ page }) => {
    // 1. 前往首頁
    await page.goto('/')
    await expect(page).toHaveTitle(/Wade Through Tarot/)

    // 2. 選擇單張牌陣
    await page.click('text=單張牌')

    // 3. 輸入問題（可選）
    await page.fill('[placeholder*="問題"]', '今天的運勢如何？')

    // 4. 開始占卜
    await page.click('text=開始占卜')

    // 5. 選擇一張牌
    await page.click('.card-deck')

    // 6. 等待結果顯示
    await expect(page.locator('.reading-result')).toBeVisible()

    // 7. 驗證結果包含必要資訊
    await expect(page.locator('text=正位|逆位')).toBeVisible()
    await expect(page.locator('text=建議')).toBeVisible()
  })

  test('完整占卜流程 - 三張牌', async ({ page }) => {
    await page.goto('/')

    await page.click('text=三張牌')
    await page.fill('[placeholder*="問題"]', '我的感情運勢？')
    await page.click('text=開始占卜')

    // 選擇 3 張牌
    for (let i = 0; i < 3; i++) {
      await page.click('.card-deck')
      await page.waitForTimeout(500) // 等待動畫
    }

    await expect(page.locator('.reading-result')).toBeVisible()

    // 驗證三個位置都有卡牌
    await expect(page.locator('text=過去')).toBeVisible()
    await expect(page.locator('text=現在')).toBeVisible()
    await expect(page.locator('text=未來')).toBeVisible()
  })

  test('應該可以複製結果', async ({ page }) => {
    await page.goto('/')
    await page.click('text=單張牌')
    await page.click('text=開始占卜')
    await page.click('.card-deck')

    // 等待結果
    await expect(page.locator('.reading-result')).toBeVisible()

    // 點擊複製按鈕
    await page.click('text=複製')

    // 驗證複製成功提示
    await expect(page.locator('text=已複製|複製成功')).toBeVisible()
  })
})

test.describe('卡牌圖鑑', () => {
  test('應該可以瀏覽所有卡牌', async ({ page }) => {
    await page.goto('/cards')

    // 驗證有 78 張卡牌
    const cards = await page.locator('.tarot-card').count()
    expect(cards).toBe(78)

    // 點擊一張卡牌查看詳情
    await page.locator('.tarot-card').first().click()

    // 驗證 Modal 顯示
    await expect(page.locator('.card-modal')).toBeVisible()
    await expect(page.locator('text=正位意義')).toBeVisible()
    await expect(page.locator('text=逆位意義')).toBeVisible()
  })

  test('應該可以按分類篩選', async ({ page }) => {
    await page.goto('/cards')

    // 點擊「大阿爾克納」分類
    await page.click('text=大阿爾克納')

    // 驗證只顯示 22 張
    const majorCards = await page.locator('.tarot-card').count()
    expect(majorCards).toBe(22)
  })
})
```

#### Step 4.11：更新 package.json scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

#### Step 4.12：執行測試

```bash
# 單元測試
npm test

# 單元測試 UI 模式
npm run test:ui

# 測試覆蓋率
npm run test:coverage

# E2E 測試
npm run test:e2e

# E2E UI 模式
npm run test:e2e:ui

# 執行所有測試
npm run test:all
```

#### Step 4.13：檢視覆蓋率報告

```bash
# 生成覆蓋率報告
npm run test:coverage

# 開啟 HTML 報告
open coverage/index.html
```

**目標覆蓋率**：
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

#### Step 4.14：新增測試到 .gitignore

```bash
cat >> .gitignore << 'EOF'

# 測試
coverage/
playwright-report/
test-results/
EOF
```

#### Step 4.15：Git 提交

```bash
git add .
git commit -m "test: add comprehensive test coverage

- Setup Vitest + React Testing Library
- Add unit tests for store, components, and utilities
- Setup Playwright for E2E testing
- Add E2E tests for main user flows
- Achieve 80%+ test coverage
- Add test scripts to package.json"
```

### ✅ 驗證清單
- [ ] Vitest 設定完成
- [ ] 所有單元測試通過
- [ ] E2E 測試通過
- [ ] 測試覆蓋率 > 80%
- [ ] 測試可在 CI 環境執行

---

## 🎯 完成後檢查清單

完成所有高優先級項目後，請確認：

### 程式碼品質
- [ ] `npm run lint` 無錯誤
- [ ] `npm run build` 成功
- [ ] `npm test` 所有測試通過
- [ ] `npm run test:e2e` E2E 測試通過

### 效能
- [ ] Lighthouse Performance > 85
- [ ] 首次載入時間 < 2 秒
- [ ] 圖片大小減少 > 50%

### 開發體驗
- [ ] 環境變數文件完整
- [ ] 新開發者可輕鬆設定
- [ ] 程式碼庫整潔無冗餘

### 文件
- [ ] README 已更新
- [ ] 環境變數有說明
- [ ] 測試執行方式已記錄

---

## 📊 預期效益

完成這 4 個高優先級項目後，你將獲得：

1. **更快的載入速度** - 圖片優化減少 50-70% 大小
2. **更安全的部署** - 環境變數管理完善
3. **更高的程式碼品質** - 測試覆蓋率 80%+
4. **更好的可維護性** - 程式碼整潔、測試保護

**總投入時間**：約 20-24 小時
**投資報酬率**：極高 ⭐⭐⭐⭐⭐

---

**開始日期**：____________
**完成日期**：____________
**實際耗時**：____________

祝你實作順利！有任何問題歡迎隨時詢問。✨
