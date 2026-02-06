# 牌卡主題子頁面規劃

## 文檔資訊

- **建立日期**: 2026-02-06
- **最後更新**: 2026-02-06
- **優先級**: 高
- **狀態**: 規劃中
- **負責人**: 待指派
- **前置依賴**: SEO 主題導向頁面（已完成）
- **相關檔案**:
  - `client/src/data/tarotCards.ts` — 資料來源（需擴充）
  - `client/src/data/tarotCardsDetail.ts` — 新增：子頁面專用詳細內容（待建立）
  - `client/src/app/cards/[id]/` — 現有卡片頁面
  - `client/src/app/guides/` — 已完成的指南彙整頁面

---

## 背景與目標

### 問題分析

目前網站架構：

```
/guides/upright-meanings     → 78 張牌正位彙整（已完成）
/guides/love-readings        → 78 張牌愛情彙整（已完成）
/cards/fool                  → 愚者所有主題合併在一頁
```

缺口在於：使用者搜尋「愚者 正位」「愚者 愛情」時，命中的是 `/cards/fool` 整頁，而非針對該主題的專屬頁面。這類組合關鍵字在搜尋量上具備長尾優勢，但目前沒有對應的獨立頁面。

### 目標

為每張牌建立 5 個主題子頁面，形成三層 SEO 漏斗：

```
第一層：/guides/upright-meanings          （主題彙整，已完成）
第二層：/cards/fool/upright-meanings      （單牌 × 單主題，本次目標）
第三層：/cards/fool                       （單牌完整解析，已存在）
```

**預期效果**：
- 新增 78 × 5 = **390 個靜態頁面**
- 覆蓋「牌名 + 主題」長尾組合關鍵字
- 增強三層之間的內部鏈接密度
- 網站總頁面數從 ~95 提升至 ~485

---

## 資料結構設計

### 現有資料盤點

以愚者為例，目前每張牌可用於子頁面的內容：

| 子頁主題 | 目前欄位 | 現有字數 | 目標字數 | 缺口 |
|---------|---------|---------|---------|------|
| 正位詳解 | `meaning.upright`（5 關鍵詞） | ~25 字 | 500 字 | **完全缺少（從零撰寫）** |
| 逆位詳解 | `meaning.reversed`（5 關鍵詞） | ~25 字 | 500 字 | **完全缺少（從零撰寫）** |
| 愛情詳解 | `deepAnalysis.loveReading` | ~200 字 | 500 字 | 需擴充（有基礎） |
| 事業詳解 | `deepAnalysis.careerReading` | ~200 字 | 500 字 | 需擴充（有基礎） |
| 健康詳解 | `deepAnalysis.healthReading` | ~200 字 | 500 字 | 需擴充（有基礎） |

### 資料檔案架構（必須拆檔）

目前 `tarotCards.ts` 約 **439 KB / 2,031 行**。新增 ~19.5 萬字（中文 UTF-8 約 3 bytes/字）將帶來 **~585 KB** 新增內容，檔案總體積將超過 **1 MB**。

**因此必須拆分為獨立檔案**，而非在現有檔案中新增欄位：

```
client/src/data/
├── tarotCards.ts              # 現有：基礎資料（維持不變，~439 KB）
└── tarotCardsDetail.ts        # 新增：子頁面專用詳細內容（~585 KB）
```

```typescript
// tarotCardsDetail.ts

export interface CardDetail {
  cardId: string;              // 對應 TarotCard.id
  uprightDetail: string;       // 正位詳細解析（400-600 字）
  reversedDetail: string;      // 逆位詳細解析（400-600 字）
  loveDetail: string;          // 愛情詳細解析（400-600 字）
  careerDetail: string;        // 事業詳細解析（400-600 字）
  healthDetail: string;        // 健康詳細解析（400-600 字）
}

// 以 Map 形式存儲，方便快速查詢
export const cardDetails: Record<string, CardDetail> = {
  "fool": {
    cardId: "fool",
    uprightDetail: "...",
    reversedDetail: "...",
    loveDetail: "...",
    careerDetail: "...",
    healthDetail: "...",
  },
  // ... 78 張牌
}

export function getCardDetail(cardId: string): CardDetail | undefined {
  return cardDetails[cardId]
}
```

**拆檔優勢**：
1. 現有頁面不受影響，不需 import 新檔案
2. 只有子頁面才 import `tarotCardsDetail.ts`，tree-shaking 有效
3. 子頁面為 Server Component，詳細內容不進入 client bundle
4. 可依牌組進一步拆分（若未來需要）

### 欄位內容規範

#### `uprightDetail`（正位詳細解析，400-600 字）

結構：
```
正位核心意義（100 字）
→ 闡述這張牌正位的本質能量與核心訊息

正位在日常生活中的展現（150 字）
→ 具體情境描述：這張牌正位出現時，生活中可能發生什麼

正位的深層啟示（100 字）
→ 靈性層面的解讀與自我成長建議

正位與其他牌的搭配解讀（100 字）
→ 常見搭配牌組合與綜合意義

正位行動建議（50 字）
→ 實際可執行的建議
```

#### `reversedDetail`（逆位詳細解析，400-600 字）

結構：
```
逆位核心意義（100 字）
→ 能量的減弱 / 內化 / 阻塞 / 過度

逆位的常見表現（150 字）
→ 日常生活中逆位能量的具體展現

逆位的正面解讀（100 字）
→ 逆位不等於負面，可能的積極面向

逆位的調整建議（100 字）
→ 如何面對與轉化逆位能量

逆位與其他牌的搭配解讀（50 字）
→ 逆位搭配特定牌的意義變化
```

#### `loveDetail`（愛情詳細解析，400-600 字）

結構（使用【】標記，與現有 loveReading 格式一致）：
```
【正位愛情】（100 字）詳細的正位愛情解讀
【逆位愛情】（100 字）詳細的逆位愛情解讀
【單身者】（80 字）單身者的具體行動建議
【有伴侶者】（80 字）有伴侶者的關係建議
【復合】（80 字）分手後是否適合復合的指引
【行動】（60 字）立即可執行的愛情行動建議
```

#### `careerDetail`（事業詳細解析，400-600 字）

結構：
```
【正位事業】（100 字）詳細的正位事業解讀
【逆位事業】（100 字）詳細的逆位事業解讀
【求職者】（80 字）求職面試的具體建議
【在職者】（80 字）職場發展與升遷建議
【創業者】（80 字）創業方向與風險評估
【財務】（60 字）理財與投資建議
```

#### `healthDetail`（健康詳細解析，400-600 字）

結構：
```
【身體】（120 字）身體健康的詳細提示
【心理】（120 字）心理健康與情緒管理
【生活習慣】（100 字）作息、飲食、運動建議
【壓力管理】（100 字）壓力來源辨識與緩解方法
【注意】（60 字）需要特別留意的健康面向
```

### 內容總量估算

- 每張牌 5 個欄位 × 500 字 = 2,500 字
- 78 張牌 × 2,500 字 = **195,000 字**（約 19.5 萬字）
- UTF-8 中文約 3 bytes/字，檔案新增量約 **585 KB**

---

## 頁面結構設計

### URL 結構

```
/cards/[id]/upright-meanings    → 正位詳解
/cards/[id]/reversed-meanings   → 逆位詳解
/cards/[id]/love-readings       → 愛情詳解
/cards/[id]/career-readings     → 事業詳解
/cards/[id]/health-readings     → 健康詳解
```

### 頁面模板（以 `/cards/fool/upright-meanings` 為例）

```
Breadcrumb: 首頁 / 塔羅牌圖鑑 / 大阿爾克納 / 愚者 / 正位解析

# 愚者正位意義 - 完整解析與實用建議

[牌面小縮圖]  愚者 The Fool | 大阿爾克納 | 編號 0

## 愚者正位關鍵詞
新開始、冒險精神、純真、自發性、自由精神

## 愚者正位詳細解析
（uprightDetail 內容，400-600 字）

## 愚者正位在不同領域的影響
- 愛情：（loveReading 正位摘要 + 連結到 /cards/fool/love-readings）
- 事業：（careerReading 正位摘要 + 連結到 /cards/fool/career-readings）
- 健康：（healthReading 正位摘要 + 連結到 /cards/fool/health-readings）

## 延伸閱讀
- 查看愚者完整解析 → /cards/fool
- 查看愚者逆位解析 → /cards/fool/reversed-meanings
- 塔羅牌正位意義大全 → /guides/upright-meanings

[FAQ JSON-LD]
[Article JSON-LD]
[BreadcrumbList JSON-LD]
```

### 技術架構

```
client/src/app/cards/[id]/[theme]/
└── page.tsx              # 動態路由，根據 theme 參數渲染不同內容
```

```typescript
// generateStaticParams 產生 78 × 5 = 390 條路徑
export async function generateStaticParams() {
  const allCards = getAllTarotCards()
  const themes = [
    "upright-meanings",
    "reversed-meanings",
    "love-readings",
    "career-readings",
    "health-readings",
  ]
  return allCards.flatMap((card) =>
    themes.map((theme) => ({ id: card.id, theme }))
  )
}
```

### 共用組件

```
client/src/components/cards/
├── CardThemeHeader.tsx        # 子頁面共用標題區塊（縮圖 + 牌名 + 分類）
├── CrossThemeLinks.tsx        # 跨主題連結區塊（其他主題摘要 + 連結）
└── CardThemeFAQ.tsx           # 子頁面 FAQ（根據主題動態生成問答）
```

---

## Sitemap 更新

```typescript
// 在 sitemap.ts 中新增 390 條 URL
const themes = [
  "upright-meanings",
  "reversed-meanings",
  "love-readings",
  "career-readings",
  "health-readings",
]

const cardThemeUrls = allCards.flatMap((card) =>
  themes.map((theme) => ({
    url: `${baseUrl}/cards/${card.id}/${theme}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
)
```

---

## 內部鏈接策略

### 從子頁面向外連結

每個子頁面包含：
1. 回到該牌完整解析：`/cards/[id]`
2. 同牌其他主題：`/cards/[id]/[其他 theme]`
3. 對應主題彙整頁：`/guides/[theme]`

### 從現有頁面向內連結

1. **`/cards/[id]` 卡片詳情頁**：在各 deepAnalysis 區塊加入「查看完整 XX 解析 →」連結
2. **`/guides/[theme]` 指南彙整頁**：每張牌卡片的「查看完整解析」改為連結到對應子頁面
3. **CardSummaryList / LoveCardSummary / ThemeCardSummary**：連結目標從 `/cards/[id]` 調整為 `/cards/[id]/[theme]`

**重要**：元件連結更新必須在 Phase B 子頁面建好後才執行，Phase A 期間不可提前修改，否則連結會指向不存在的頁面。

---

## 實作階段

### Phase A：內容擴充（資料層）

#### A-0：建立資料檔案與介面（前置步驟）

1. 建立 `client/src/data/tarotCardsDetail.ts`，定義 `CardDetail` 介面與 `getCardDetail()` 函數
2. 先以 1 張牌（fool）作為範本填入內容，驗證資料結構正確
3. 確認 import 路徑與 type 匯出正常

#### A-1 ~ A-5：依牌組批次擴充內容

每批次先完成**有基礎的 3 個欄位**（loveDetail / careerDetail / healthDetail），再處理**從零撰寫的 2 個欄位**（uprightDetail / reversedDetail）。

| 批次 | 牌組 | 張數 | 先做（有基礎） | 後做（從零寫） | 預估字數 |
|------|------|------|---------------|---------------|---------|
| A-1 | 大阿爾克納 | 22 張 | loveDetail, careerDetail, healthDetail | uprightDetail, reversedDetail | ~55,000 字 |
| A-2 | 聖杯牌組 | 14 張 | loveDetail, careerDetail, healthDetail | uprightDetail, reversedDetail | ~35,000 字 |
| A-3 | 金幣牌組 | 14 張 | loveDetail, careerDetail, healthDetail | uprightDetail, reversedDetail | ~35,000 字 |
| A-4 | 寶劍牌組 | 14 張 | loveDetail, careerDetail, healthDetail | uprightDetail, reversedDetail | ~35,000 字 |
| A-5 | 權杖牌組 | 14 張 | loveDetail, careerDetail, healthDetail | uprightDetail, reversedDetail | ~35,000 字 |

**每批次交付物**：
1. 更新 `tarotCardsDetail.ts` 中對應牌組的所有欄位
2. 驗證所有新欄位可正確讀取

**內容撰寫原則**：
- 每段文案需獨特，不可與現有 `loveReading` / `careerReading` / `healthReading` 重複
- `*Detail` 欄位提供比現有欄位更深入、更具體的解析
- 使用【】標記格式（愛情/事業/健康），與現有格式一致
- 正位/逆位詳解使用純文字段落，不使用【】標記
- 語調保持一致：溫暖、專業、引導性，避免絕對性預言語句

### Phase B：頁面建置（前端層）

| 步驟 | 工作項目 | 依賴 |
|------|---------|------|
| B-1 | 建立 `/cards/[id]/[theme]/page.tsx` 動態路由與 `generateStaticParams` | A-0 |
| B-2 | 建立共用組件 `CardThemeHeader`、`CrossThemeLinks`、`CardThemeFAQ` | - |
| B-3 | 更新 Sitemap 加入 390 條 URL | B-1 |
| B-4 | 更新現有 `CardDetailClient.tsx`，在各 deepAnalysis 區塊加入子頁面連結 | B-1 |
| B-5 | 更新指南頁面元件（CardSummaryList 等），連結指向子頁面 | B-1 |
| B-6 | 驗證：build 成功、頁面渲染正確、JSON-LD 正確、Sitemap 包含所有 URL | B-1~B-5 |

### Phase C：優化與驗證

| 步驟 | 工作項目 |
|------|---------|
| C-1 | 檢查所有 390 頁的 metadata 與 canonical URL |
| C-2 | 確認無重複內容問題（子頁面 vs 母頁面） |
| C-3 | 確認 build 時間與產出大小在可接受範圍 |
| C-4 | 提交 sitemap 至 Google Search Console |

---

## 風險與注意事項

### 內容重複風險

**問題**：子頁面與 `/cards/[id]` 母頁面內容可能重複。

**解決方案**：
1. 子頁面使用 `*Detail` 新欄位（專屬內容，存於獨立檔案），不複製 `loveReading` 等現有欄位
2. 母頁面保留現有摘要級內容，子頁面提供深度詳解
3. 各頁設定正確的 `canonical` URL 指向自身

### Build 時間增加

**問題**：從 95 頁增至 485 頁，build 時間可能增加 4-5 倍。

**解決方案**：
1. 監控 build 時間，若超過 5 分鐘考慮啟用 ISR（Incremental Static Regeneration）
2. 子頁面為純靜態內容，不依賴外部 API，build 壓力可控

### 資料檔案體積

**問題**：新增 ~19.5 萬字（~585 KB），若放入現有 `tarotCards.ts` 將使檔案超過 1 MB。

**解決方案**（必須執行）：
1. 拆分為獨立檔案 `tarotCardsDetail.ts`，與 `tarotCards.ts` 分離
2. 只有子頁面才 import 新檔案，現有頁面完全不受影響
3. Next.js tree-shaking 確保未使用的資料不進入 client bundle
4. 子頁面為 Server Component，詳細內容不傳到瀏覽器端

### 元件連結更新時機

**問題**：指南頁面元件（CardSummaryList、LoveCardSummary、ThemeCardSummary）的連結需從 `/cards/[id]` 改為 `/cards/[id]/[theme]`，但若在子頁面建好前提前修改，連結將指向 404。

**解決方案**：
1. 元件連結更新統一在 Phase B-5 執行，不可在 Phase A 期間提前修改
2. Phase B-5 與 B-1（子頁面建立）在同一次 PR 中完成

---

## 預期 SEO 效果

| 指標 | 目前 | 預期 |
|------|------|------|
| 網站總頁面數 | ~95 | ~485 |
| 「牌名 + 正位」關鍵字覆蓋 | 部分（在母頁面內） | 78 頁專屬頁面 |
| 「牌名 + 愛情」關鍵字覆蓋 | 部分（在母頁面內） | 78 頁專屬頁面 |
| 內部鏈接數量 | 中 | 高（三層互聯） |
| 長尾關鍵字覆蓋率 | 中 | 大幅提升 |

---

## 審計結果（2026-02-06）

實作前的程式碼審計確認：

- [x] Next.js 路由不衝突：`/cards/[id]` 與 `/cards/[id]/[theme]` 可並存
- [x] 78 張牌 deepAnalysis 覆蓋率 100%
- [x] generateStaticParams 父子層互不干擾
- [x] Sitemap 478 URLs 遠低於 Google 50,000 上限
- [x] 3 個指南元件需更新連結（Phase B-5 處理）
- [x] 資料檔案必須拆分（已納入 Phase A-0）

---

**最後更新**: 2026-02-06
**文檔狀態**: 規劃完成，已通過審計，待實作
**負責人**: 待指派
