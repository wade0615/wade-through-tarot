# SEO 主題導向頁面規劃

## 文檔資訊

- **建立日期**: 2026-02-05
- **最後更新**: 2026-02-05
- **優先級**: 中
- **狀態**: 規劃中
- **負責人**: 待指派
- **相關檔案**:
  - `client/src/app/guides/` - 新增頁面目錄（待建立）
  - `client/src/data/tarotCards.ts` - 塔羅牌資料來源
  - `client/src/utils/seo.ts` - SEO 工具函數
  - `client/src/app/sitemap.ts` - Sitemap 配置

---

## 背景與目標

### 問題分析

目前網站 SEO 對於**組合關鍵字**的覆蓋有缺口：

| 搜尋關鍵字 | 目前覆蓋狀況 | 問題 |
|-----------|-------------|------|
| `愚者 正位 意義` | 依賴 `/cards/fool` 內容 | 無專門頁面 |
| `戀人 逆位 感情` | 依賴 `/cards/lovers` 內容 | 無專門頁面 |
| `塔羅牌 正位 解讀` | 無 | 完全沒有覆蓋 |
| `塔羅牌 愛情 解讀` | 分散在各卡片頁面 | 沒有彙整頁面 |

### 目標

建立**主題導向的彙整頁面**，捕捉組合關鍵字搜尋流量：

1. 提升「正位/逆位 + 意義」相關關鍵字排名
2. 提升「愛情/事業/健康 + 塔羅」相關關鍵字排名
3. 增加內部鏈接，提升整體 SEO 權重
4. 提供更好的使用者導覽體驗

---

## 頁面規劃

### 新增頁面清單

| 路徑 | 頁面標題 | 目標關鍵字 | 優先級 |
|------|---------|-----------|--------|
| `/guides/upright-meanings` | 塔羅牌正位意義大全 | 正位意義、正位解讀、塔羅牌正位 | 高 |
| `/guides/reversed-meanings` | 塔羅牌逆位意義大全 | 逆位意義、逆位解讀、塔羅牌逆位 | 高 |
| `/guides/love-readings` | 塔羅牌愛情解讀指南 | 愛情塔羅、感情占卜、戀愛塔羅 | 高 |
| `/guides/career-readings` | 塔羅牌事業解讀指南 | 事業塔羅、工作占卜、職場塔羅 | 中 |
| `/guides/health-readings` | 塔羅牌健康解讀指南 | 健康塔羅、身心塔羅 | 低 |

---

## 頁面結構設計

### 1. 正位/逆位意義頁面

**路徑**: `/guides/upright-meanings` 與 `/guides/reversed-meanings`

**頁面結構**:

```
# 塔羅牌正位意義大全 - 78張牌完整解析

## 前言
- 什麼是正位？（200字）
- 正位的一般意義（200字）

## 大阿爾克納正位意義
### 愚者正位
- 關鍵詞：新開始、純真、冒險...
- 核心意義：（100字摘要）
- [查看完整解析 →] 連結到 /cards/fool

### 魔術師正位
...

## 聖杯牌組正位意義
### 聖杯王牌正位
...

## 金幣牌組正位意義
...

## 寶劍牌組正位意義
...

## 權杖牌組正位意義
...

## 常見問題 (FAQ)
- Q: 正位一定是好的意思嗎？
- Q: 如何判斷牌是正位還是逆位？
...
```

**SEO 配置**:

```typescript
// metadata
export const metadata: Metadata = {
  title: "塔羅牌正位意義大全 - 78張牌完整解析 | 愚者正位、戀人正位、死神正位",
  description: "完整收錄78張塔羅牌正位意義解析。包含大阿爾克納22張與小阿爾克納56張的正位關鍵詞、核心意義與實用建議。愚者正位代表新開始，戀人正位象徵深刻關係...",
  keywords: [
    "塔羅牌正位",
    "正位意義",
    "正位解讀",
    "愚者正位",
    "魔術師正位",
    "戀人正位",
    "死神正位",
    // ... 78張牌的正位關鍵字
  ],
};
```

**JSON-LD Schema**:

```typescript
// FAQPage Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "愚者正位代表什麼意義？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "愚者正位代表新的開始、純真的心態..."
      }
    },
    // ... 更多 FAQ
  ]
};

// Article Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "塔羅牌正位意義大全 - 78張牌完整解析",
  "description": "...",
  "articleSection": "塔羅牌教學",
  // ...
};
```

---

### 2. 主題解讀頁面（愛情/事業/健康）

**路徑**: `/guides/love-readings`

**頁面結構**:

```
# 塔羅牌愛情解讀指南 - 感情占卜完整攻略

## 前言
- 塔羅牌與愛情占卜的關係（200字）
- 如何用塔羅牌解讀感情問題（200字）

## 愛情相關的重要牌卡

### 最佳愛情牌
#### 戀人 - 愛情的象徵
- 正位愛情含義：深刻的靈魂連結...
- 逆位愛情含義：需要面對關係中的衝突...
- [完整解析 →]

#### 聖杯二 - 相互吸引
...

### 需要注意的牌卡
#### 寶劍三 - 心碎與失落
...

## 依牌組分類的愛情解讀

### 大阿爾克納愛情解讀
（列出22張大牌的愛情意義摘要）

### 聖杯牌組愛情解讀
（聖杯與情感最相關，重點解說）

### 其他牌組愛情解讀
...

## 愛情牌陣推薦
- 單身求緣三張牌陣
- 感情發展五張牌陣
- 關係檢視凱爾特十字

## 常見愛情問題 FAQ
- Q: 抽到死神牌代表感情會結束嗎？
- Q: 逆位的戀人牌是不是代表分手？
- Q: 如何解讀感情中的寶劍牌？
...
```

**SEO 配置**:

```typescript
export const metadata: Metadata = {
  title: "塔羅牌愛情解讀指南 - 感情占卜完整攻略 | 戀人牌、聖杯牌愛情意義",
  description: "專業塔羅牌愛情解讀指南。詳解78張牌在感情問題中的正位逆位含義，包含戀人牌、聖杯牌組的愛情解析，以及單身、有伴侶的實用建議...",
  keywords: [
    "塔羅牌愛情",
    "感情占卜",
    "愛情塔羅",
    "戀人牌愛情",
    "聖杯愛情",
    "塔羅牌感情解讀",
    "戀愛塔羅",
    // ...
  ],
};
```

---

## 技術實作規劃

### 目錄結構

```
client/src/app/guides/
├── page.tsx                    # 指南首頁（列出所有主題）
├── layout.tsx                  # 指南頁面共用 Layout
├── upright-meanings/
│   └── page.tsx               # 正位意義大全
├── reversed-meanings/
│   └── page.tsx               # 逆位意義大全
├── love-readings/
│   └── page.tsx               # 愛情解讀指南
├── career-readings/
│   └── page.tsx               # 事業解讀指南
└── health-readings/
    └── page.tsx               # 健康解讀指南
```

### 共用組件

```
client/src/components/guides/
├── CardSummaryList.tsx        # 牌卡摘要列表
├── CardMiniCard.tsx           # 小型牌卡展示卡片
├── ThemeSection.tsx           # 主題區塊（正位/逆位/愛情等）
├── FAQSection.tsx             # FAQ 區塊
└── RelatedCards.tsx           # 相關牌卡推薦
```

### 資料處理

```typescript
// utils/guideHelpers.ts

/**
 * 取得所有牌卡的正位資訊
 */
export function getAllUprightMeanings() {
  return allCards.map(card => ({
    id: card.id,
    name: card.name,
    nameEn: card.nameEn,
    suit: card.suit,
    uprightKeywords: card.uprightKeywords,
    uprightMeaning: card.meaning.upright,
    // 摘要：取前100字
    summary: card.meaning.upright.substring(0, 100) + "...",
  }));
}

/**
 * 取得所有牌卡的愛情解讀
 */
export function getAllLoveReadings() {
  return allCards.map(card => ({
    id: card.id,
    name: card.name,
    nameEn: card.nameEn,
    suit: card.suit,
    loveReading: card.deepAnalysis?.loveReading,
    // 提取正位和逆位愛情含義
    loveUpright: extractSection(card.deepAnalysis?.loveReading, "正位"),
    loveReversed: extractSection(card.deepAnalysis?.loveReading, "逆位"),
  }));
}

/**
 * 依牌組分類
 */
export function groupBySuit(cards: Card[]) {
  return {
    majorArcana: cards.filter(c => c.suit === "大阿爾克納"),
    cups: cards.filter(c => c.suit === "聖杯"),
    pentacles: cards.filter(c => c.suit === "金幣"),
    swords: cards.filter(c => c.suit === "寶劍"),
    wands: cards.filter(c => c.suit === "權杖"),
  };
}
```

### SEO 工具函數擴充

```typescript
// utils/seo.ts 新增

/**
 * 生成指南頁面的 SEO 關鍵字
 */
export function generateGuideSEOKeywords(
  theme: "upright" | "reversed" | "love" | "career" | "health"
): string[] {
  const baseKeywords = {
    upright: ["塔羅牌正位", "正位意義", "正位解讀"],
    reversed: ["塔羅牌逆位", "逆位意義", "逆位解讀"],
    love: ["塔羅牌愛情", "感情占卜", "愛情塔羅", "戀愛塔羅"],
    career: ["塔羅牌事業", "工作占卜", "職場塔羅"],
    health: ["塔羅牌健康", "身心塔羅"],
  };

  // 加入每張牌的主題關鍵字
  const cardKeywords = allCards.map(card => {
    switch (theme) {
      case "upright":
        return `${card.name}正位`;
      case "reversed":
        return `${card.name}逆位`;
      case "love":
        return `${card.name}愛情`;
      case "career":
        return `${card.name}事業`;
      case "health":
        return `${card.name}健康`;
    }
  });

  return [...baseKeywords[theme], ...cardKeywords];
}
```

---

## Sitemap 更新

```typescript
// app/sitemap.ts 新增

const guidePages = [
  {
    url: `${baseUrl}/guides`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },
  {
    url: `${baseUrl}/guides/upright-meanings`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    url: `${baseUrl}/guides/reversed-meanings`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    url: `${baseUrl}/guides/love-readings`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    url: `${baseUrl}/guides/career-readings`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${baseUrl}/guides/health-readings`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  },
];
```

---

## 內部鏈接策略

### 從新頁面連結到卡片頁面

```tsx
// 在指南頁面中
<Link href={`/cards/${card.id}`}>
  查看 {card.name} 完整解析 →
</Link>
```

### 從卡片頁面連結回指南頁面

在現有 `/cards/[id]` 頁面底部新增：

```tsx
<section className="related-guides">
  <h3>延伸閱讀</h3>
  <ul>
    <li><Link href="/guides/upright-meanings">塔羅牌正位意義大全</Link></li>
    <li><Link href="/guides/love-readings">塔羅牌愛情解讀指南</Link></li>
    {/* 根據牌的特性推薦相關指南 */}
  </ul>
</section>
```

### 從首頁和圖鑑頁連結

在 `/cards` 頁面新增指南入口：

```tsx
<section className="guide-cta">
  <h2>主題解讀指南</h2>
  <div className="guide-cards">
    <Link href="/guides/upright-meanings">正位意義大全</Link>
    <Link href="/guides/reversed-meanings">逆位意義大全</Link>
    <Link href="/guides/love-readings">愛情解讀指南</Link>
    <Link href="/guides/career-readings">事業解讀指南</Link>
  </div>
</section>
```

---

## 實作階段

### Phase 1：正位/逆位頁面（優先）

**預計工作項目**:

1. 建立 `/guides` 目錄結構
2. 實作 `upright-meanings` 頁面
3. 實作 `reversed-meanings` 頁面
4. 建立共用組件 `CardSummaryList`、`ThemeSection`
5. 更新 Sitemap
6. 設定 SEO metadata 和 JSON-LD

**預計新增檔案**:
- `app/guides/page.tsx`
- `app/guides/layout.tsx`
- `app/guides/upright-meanings/page.tsx`
- `app/guides/reversed-meanings/page.tsx`
- `components/guides/CardSummaryList.tsx`
- `components/guides/ThemeSection.tsx`
- `utils/guideHelpers.ts`

### Phase 2：愛情解讀頁面

**預計工作項目**:

1. 實作 `love-readings` 頁面
2. 建立愛情相關的內容提取邏輯
3. 設計愛情牌卡排序（最相關的牌優先）
4. 加入 FAQ 區塊

**預計新增檔案**:
- `app/guides/love-readings/page.tsx`
- `components/guides/FAQSection.tsx`

### Phase 3：事業/健康解讀頁面

**預計工作項目**:

1. 實作 `career-readings` 頁面
2. 實作 `health-readings` 頁面
3. 完善內部鏈接

**預計新增檔案**:
- `app/guides/career-readings/page.tsx`
- `app/guides/health-readings/page.tsx`

### Phase 4：整合與優化

**預計工作項目**:

1. 在卡片頁面加入延伸閱讀區塊
2. 在圖鑑頁面加入指南入口
3. 優化頁面載入效能
4. 進行 SEO 檢測與調整

---

## 預期效果

### SEO 指標預期改善

| 指標 | 目前 | 預期 |
|------|------|------|
| 「正位意義」相關關鍵字排名 | 無/低 | 前 20 名 |
| 「愛情塔羅」相關關鍵字排名 | 無/低 | 前 20 名 |
| 網站總頁面數 | 83 | 89 |
| 內部鏈接密度 | 中 | 高 |

### 流量預期

- 新增頁面預計帶來 **10-20%** 額外自然搜尋流量
- 長尾關鍵字覆蓋率提升 **30%**

---

## 風險與注意事項

### 內容重複風險

**問題**: 指南頁面與卡片頁面內容可能重複，影響 SEO

**解決方案**:
1. 指南頁面只放**摘要**（100字以內）
2. 使用 `canonical` 標籤明確指向來源
3. 指南頁面著重**彙整與比較**，而非詳細解讀

### 維護成本

**問題**: 新增頁面會增加維護工作

**解決方案**:
1. 內容從 `tarotCards.ts` 自動提取
2. 使用共用組件減少重複程式碼
3. 牌卡資料更新時，指南頁面自動更新

---

## 參考資料

- [Google SEO 指南 - 內容品質](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [結構化資料 - FAQPage](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Next.js 13+ Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

## 決策記錄

### 2026-02-05 - 方案選定

**決策**: 採用「主題導向彙整頁面」方案

**理由**:
1. 直接針對組合關鍵字建立專門頁面
2. 不影響現有卡片頁面的 SEO
3. 增加內部鏈接，提升整體網站權重
4. 提供更好的使用者體驗

**替代方案評估**:

| 方案 | 優勢 | 劣勢 | 評分 |
|------|------|------|------|
| **A: 主題導向頁面（選定）** | 直接覆蓋關鍵字、內部鏈接增強 | 需要額外開發 | 9/10 |
| B: 強化 H2 標題 | 簡單快速 | 效果有限 | 6/10 |
| C: 調整 Meta Description | 最簡單 | 效果微弱 | 4/10 |

---

**最後更新**: 2026-02-05
**文檔狀態**: 規劃完成，待實作
**負責人**: 待指派
