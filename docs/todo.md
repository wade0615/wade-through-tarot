# Wade Through Tarot - 改善項目清單

> 最後更新：2026-01-06

---

## 📋 目錄

- [高優先級改善項目](#高優先級改善項目)
- [中優先級改善項目](#中優先級改善項目)
- [低優先級/加分項目](#低優先級加分項目)
- [改善時程建議](#改善時程建議)

---

## 🔴 高優先級改善項目

### 1. 測試覆蓋率（Testing）

**現況問題**：

- 專案目前沒有任何單元測試或端到端測試
- 核心邏輯（洗牌、牌陣計算）缺乏測試保護
- 重構時容易引入 bug

**建議方案**：

#### 安裝測試框架

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test  # E2E 測試
```

#### 重點測試區域

1. **牌組洗牌邏輯** (`client/src/store/tarotStore.ts`)

   - Fisher-Yates 洗牌算法正確性
   - 正逆位隨機分配（50/50）
   - 不重複選牌驗證

2. **牌陣位置計算** (`SpreadLayout.tsx`)

   - 單張牌、三張牌、凱爾特十字佈局
   - 響應式位置計算
   - 動畫觸發時機

3. **狀態管理** (`tarotStore.ts`)

   - 選牌流程狀態轉換
   - 歷史記錄管理
   - 重置功能

4. **組件渲染測試**
   - TarotCard 組件（正逆位顯示）
   - CardModal 開關邏輯
   - ReadingResult 結果格式化

**預期效果**：

- 測試覆蓋率達到 80% 以上
- 避免重構時引入 regression bugs
- 提升程式碼信心

---

### 2. 程式碼清理（Code Cleanup）

**現況問題**：

- 發現舊版檔案未清理：
  - `client/src/app/page-old.tsx`
  - `client/src/app/page-new.tsx`
- 可能還有其他未使用的檔案

**待辦事項**：

- [ ] 刪除 `page-old.tsx` 和 `page-new.tsx`
- [ ] 檢查是否有其他 backup/copy/old 檔案
- [ ] 清理未使用的 imports
- [ ] 移除註解掉的程式碼
- [ ] 檢查 `tarotCards.ts` 和 `tarotCardsExtended.ts` 是否可合併

**執行命令**：

```bash
# 搜尋潛在的舊檔案
find client/src -name "*-old.*" -o -name "*-new.*" -o -name "*backup*"

# 檢查未使用的 exports
npx ts-prune
```

---

### 3. 環境變數管理

**現況問題**：

- 沒有 `.env.example` 檔案
- Google Analytics ID 寫死在程式碼中
- 新開發者不知道需要哪些環境變數

**待辦事項**：

#### 建立 `.env.example`

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# 其他配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

#### 建立 `.env.local`（不提交到 git）

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-4201768192395434
```

#### 修改程式碼

- [ ] 更新 `client/src/components/GoogleAnalytics.tsx`
- [ ] 更新 `client/src/config/ads.ts`
- [ ] 新增環境變數驗證邏輯

#### 環境變數驗證（可選）

```bash
npm install -D @t3-oss/env-nextjs zod
```

---

### 4. 圖片優化

**現況問題**：

- 卡牌圖片使用 `.jpeg` 格式（78 張卡片）
- 檔案大小較大，影響載入速度
- 已在 `next.config.ts` 配置 webp/avif 支援但未使用

**建議方案**：

#### 轉換圖片格式

```bash
# 安裝圖片轉換工具
npm install -D sharp

# 批次轉換為 webp
npx sharp-cli --input "client/public/cards/*.jpeg" --output "client/public/cards/{name}.webp" --webp
```

#### 或使用線上工具

- Squoosh (https://squoosh.app/)
- TinyPNG (https://tinypng.com/)

#### 更新圖片路徑

- [ ] 修改 `client/src/data/tarotCards.ts` 中的 `imageUrl`
- [ ] 從 `.jpeg` 改為 `.webp`

**預期效果**：

- 圖片大小減少 50-70%
- 首次載入速度提升 2-3 秒
- 改善 Lighthouse Performance 分數

---

## 🟡 中優先級改善項目

### 5. CI/CD 流程

**現況問題**：

- 沒有自動化測試流程
- 沒有程式碼品質檢查
- 部署依賴手動操作

**建議方案**：

#### 建立 `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: cd client && npm ci
      - run: cd client && npm run lint
      - run: cd client && npm run build
      - run: cd client && npm test # 需先建立測試
```

#### 待辦事項

- [ ] 建立 GitHub Actions workflow
- [ ] 新增自動化測試步驟
- [ ] 新增類型檢查（`tsc --noEmit`）
- [ ] 新增 Lighthouse CI（效能檢查）
- [ ] 設定 Vercel 自動部署觸發條件

---

### 6. 資料持久化

**現況問題**：

- 占卜歷史只存在記憶體中（`readingHistory`）
- 重新整理頁面後資料消失
- 無法跨裝置同步

**方案 A：LocalStorage（簡單）**

```typescript
// 修改 client/src/store/tarotStore.ts
import { persist } from "zustand/middleware";

export const useTarotStore = create(
  persist(
    (set) => ({
      // ... existing state
    }),
    {
      name: "tarot-storage",
      partialState: (state) => ({
        readingHistory: state.readingHistory,
      }),
    }
  )
);
```

**方案 B：後端整合（完整）**

選項：

- Supabase（推薦，免費額度足夠）
- Firebase
- 自建 API + PostgreSQL

功能：

- [ ] 使用者登入/註冊
- [ ] 雲端儲存占卜記錄
- [ ] 跨裝置同步
- [ ] 收藏喜愛的牌面
- [ ] 社群功能（可選）

---

### 7. 國際化（i18n）

**現況問題**：

- 只支援繁體中文
- 限制國際使用者群

**建議方案**：

#### 安裝 i18n 套件

```bash
npm install next-intl
```

#### 語言優先順序

1. 英文（English）- 國際通用
2. 簡體中文（简体中文）- 中國大陸
3. 日文（日本語）- 對塔羅感興趣的市場

#### 待翻譯內容

- [ ] UI 文字（按鈕、標題）
- [ ] 78 張塔羅牌名稱和描述
- [ ] 牌陣說明
- [ ] 教學內容

**挑戰**：

- 塔羅牌深度解析翻譯工作量大
- 可考慮使用 AI 輔助翻譯（Claude, GPT）

---

### 8. 無障礙性（Accessibility）

**待改善項目**：

#### ARIA 標籤

- [ ] 為互動元素新增 `aria-label`
- [ ] 卡牌選擇新增 `role="button"` 和狀態提示
- [ ] Modal 新增 `aria-modal` 和焦點管理

#### 鍵盤導航

- [ ] Tab 鍵可聚焦所有互動元素
- [ ] Enter/Space 可選擇卡牌
- [ ] Esc 關閉 Modal
- [ ] 新增 focus 視覺提示

#### 螢幕閱讀器

- [ ] 為卡牌圖片新增 `alt` 描述
- [ ] 占卜結果結構化（heading hierarchy）
- [ ] 載入狀態語音提示

#### 對比度檢查

- [ ] 確保文字對比度符合 WCAG AA（4.5:1）
- [ ] 檢查紫色背景上的文字可讀性

---

### 9. 效能監控

**建議工具**：

#### Web Vitals

```typescript
// client/src/app/layout.tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### 錯誤追蹤

```bash
npm install @sentry/nextjs
```

**監控指標**：

- LCP（Largest Contentful Paint）
- FID（First Input Delay）
- CLS（Cumulative Layout Shift）
- 占卜完成率
- 錯誤發生率

---

## 🟢 低優先級/加分項目

### 10. 功能增強

#### A. 社群分享

- [ ] 新增「分享到 Facebook」按鈕
- [ ] 新增「分享到 Line」按鈕
- [ ] 新增「分享到 Twitter/X」按鈕
- [ ] 生成美觀的分享圖片（Open Graph）

#### B. 更多牌陣

- [ ] 六芒星牌陣（6 張牌）
- [ ] 關係牌陣（7 張牌）- 適合感情問題
- [ ] 生命之樹牌陣（10 張牌）
- [ ] 馬蹄形牌陣（7 張牌）

#### C. 占卜日記

- [ ] 讓使用者記錄每日占卜心得
- [ ] 新增標籤分類（感情、事業、健康）
- [ ] 回顧過去占卜記錄
- [ ] 占卜準確度自評

#### D. 音效系統

- [ ] 翻牌音效（可選）
- [ ] 背景音樂（神秘氛圍）
- [ ] 音效開關設定

#### E. 客製化

- [ ] 多種牌背圖案選擇
- [ ] 主題顏色切換（紫色/藍色/金色）
- [ ] 卡牌動畫速度調整

---

### 11. AI 整合

**現況**：只有外部 ChatGPT 連結

**升級方案**：

#### 整合 OpenAI API

```typescript
// 即時 AI 解析
async function getAIInterpretation(cards, question) {
  const response = await fetch("/api/ai-interpret", {
    method: "POST",
    body: JSON.stringify({ cards, question }),
  });
  return response.json();
}
```

#### 功能想法

- [ ] AI 根據使用者問題客製化解讀
- [ ] AI 提供每日運勢
- [ ] AI 解答塔羅學習問題
- [ ] 語音輸入問題（Web Speech API）

#### 替代方案（免費）

- Claude API
- Google Gemini API
- Groq（超快推理速度）

---

### 12. SEO 優化（進階）

**已完成**：

- ✅ Meta tags
- ✅ Open Graph
- ✅ Sitemap
- ✅ robots.txt

**可加強**：

#### 結構化資料（JSON-LD）

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wade Through Tarot",
  "description": "免費線上塔羅占卜",
  "url": "https://wade-through-tarot.vercel.app"
}
```

#### 內容行銷

- [ ] 建立部落格功能
- [ ] 發布塔羅學習文章
  - 「塔羅牌新手入門」
  - 「如何解讀凱爾特十字」
  - 「78 張塔羅牌完整解析」
- [ ] 提升 SEO 排名和流量

#### 技術 SEO

- [ ] 改善 Core Web Vitals
- [ ] 新增麵包屑導航
- [ ] 優化內部連結結構

---

### 13. 使用者體驗

#### A. 新手導覽

```typescript
// 使用 react-joyride 或自建
<Joyride
  steps={[
    { target: ".spread-selector", content: "選擇你想要的牌陣" },
    { target: ".question-input", content: "輸入你的問題" },
    { target: ".card-deck", content: "點擊牌堆進行抽牌" },
  ]}
/>
```

#### B. 每日一牌

- [ ] 每天自動抽一張牌
- [ ] 推播通知（PWA）
- [ ] 每日牌面歷史記錄

#### C. 即時提示

- [ ] 滑鼠懸停顯示牌陣位置說明
- [ ] 選牌數量提示（例：還需選 2 張牌）
- [ ] 操作步驟進度條

#### D. 結果匯出

- [ ] PDF 下載占卜結果
- [ ] 圖片格式儲存（分享用）
- [ ] 純文字複製（已完成 ✅）

---

### 14. 程式碼品質

#### A. Prettier 格式化

```bash
npm install -D prettier
```

`.prettierrc`：

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

#### B. Git Hooks

```bash
npm install -D husky lint-staged
npx husky init
```

`.husky/pre-commit`：

```bash
npx lint-staged
```

`package.json`：

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

#### C. Commit 規範

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

規範：

- `feat: 新增每日一牌功能`
- `fix: 修復牌陣佈局錯誤`
- `docs: 更新 README`
- `refactor: 重構狀態管理`
- `test: 新增洗牌邏輯測試`

#### D. Storybook

```bash
npx storybook@latest init
```

為每個組件建立 story：

- `TarotCard.stories.tsx`
- `CardModal.stories.tsx`
- `SpreadLayout.stories.tsx`

---

## 📅 改善時程建議

### 立即處理（本週）

優先級最高，投資報酬率最高的項目：

- [x] 閱讀改善建議文件
- [ ] 刪除舊檔案（`page-old.tsx`, `page-new.tsx`）
- [ ] 建立 `.env.example`
- [ ] 將硬編碼的 ID 移至環境變數
- [ ] 轉換卡牌圖片為 webp 格式

**預估時間**：4-6 小時

---

### 第 1-2 週

建立基礎設施：

- [ ] 新增測試框架（Vitest + Testing Library）
- [ ] 撰寫核心邏輯測試（洗牌、狀態管理）
- [ ] 設定 GitHub Actions CI/CD
- [ ] 實作 LocalStorage 資料持久化
- [ ] 新增 Prettier + Husky

**預估時間**：12-16 小時

---

### 第 3-4 週

效能與監控：

- [ ] 整合 Vercel Analytics + Speed Insights
- [ ] 設定 Sentry 錯誤追蹤
- [ ] 優化 Lighthouse 分數（目標 90+）
- [ ] 改善無障礙性（ARIA 標籤、鍵盤導航）
- [ ] 新增 E2E 測試（Playwright）

**預估時間**：10-14 小時

---

### 第 5-8 週

功能擴充：

- [ ] 國際化（i18n）- 英文版本
- [ ] 新增 2-3 種新牌陣
- [ ] 實作占卜日記功能
- [ ] 社群分享功能
- [ ] 新手導覽

**預估時間**：20-30 小時

---

### 長期規劃（2-3 個月）

進階功能：

- [ ] 整合 AI API（OpenAI/Claude）
- [ ] 使用者認證系統
- [ ] 後端 API + 資料庫
- [ ] 部落格內容系統
- [ ] 每日一牌推播
- [ ] 付費進階功能（可選）

**預估時間**：40-60 小時

---

## 📊 效益評估

### 高投資報酬率（優先實作）

1. **圖片優化** - 1 小時投入，載入速度提升 30%
2. **程式碼清理** - 30 分鐘投入，可維護性大幅提升
3. **環境變數管理** - 1 小時投入，部署更安全方便
4. **LocalStorage 持久化** - 2 小時投入，使用者體驗提升顯著

### 中投資報酬率（穩健推進）

5. **測試覆蓋** - 12 小時投入，長期維護成本降低
6. **CI/CD** - 4 小時投入，開發流程自動化
7. **效能監控** - 3 小時投入，問題發現更即時

### 低投資報酬率（可後續考慮）

8. **國際化** - 20+ 小時投入，需評估國際市場需求
9. **AI 整合** - 10+ 小時投入，需評估 API 成本
10. **後端系統** - 40+ 小時投入，複雜度高

---

## 🎯 成功指標

### 技術指標

- [ ] 測試覆蓋率 > 80%
- [ ] Lighthouse Performance > 90
- [ ] 首次載入時間 < 2 秒
- [ ] 零 TypeScript 錯誤
- [ ] 零 ESLint 警告

### 使用者指標

- [ ] 占卜完成率 > 80%
- [ ] 平均停留時間 > 3 分鐘
- [ ] 回訪率 > 30%
- [ ] 行動裝置使用率提升

### 業務指標

- [ ] SEO 排名進入前 10（目標關鍵字）
- [ ] 每日活躍使用者成長
- [ ] 廣告收益穩定增長
- [ ] PWA 安裝率 > 5%

---

## 📝 備註

- 此文件為改善建議，不代表必須全部實作
- 建議根據實際需求和資源排定優先順序
- 每個階段完成後可重新評估後續方向
- 歡迎根據使用者反饋調整優先級

---

**建立日期**：2026-01-06
**版本**：v1.0
**維護者**：開發團隊

---

需要針對任何特定項目展開詳細實作計畫，隨時告訴我！✨
