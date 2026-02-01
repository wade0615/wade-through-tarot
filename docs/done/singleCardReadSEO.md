# 單張牌面 SEO 增強

## 目標

針對長尾關鍵字（如「愚者事業」「愚者愛情逆位」「寶劍三健康」）優化單張牌面頁面的 SEO 排名。

## 修改內容

### 1. `client/src/utils/seo.ts`（新建）

SEO 工具函數集中管理：

- `extractSegment(text, marker)` — 提取【標籤】段落
- `generateCardSEODescription(card)` — 動態組合 description
- `generateCardSEOKeywords(card)` — 完整關鍵字陣列（含愛情正位/逆位、事業正位/逆位、健康等）
- `generateFAQSchema(card)` — FAQPage JSON-LD
- `generateBreadcrumbSchema(card)` — BreadcrumbList JSON-LD

### 2. `client/src/app/cards/[id]/page.tsx`（修改）

- Title 改為：`{牌名}塔羅牌解析 - 愛情事業健康正位逆位解讀 | {nameEn} | Wade Through Tarot`
- Description 使用 `generateCardSEODescription` 動態組合
- Keywords 使用 `generateCardSEOKeywords` 產生
- Article JSON-LD 增加 `datePublished`、`dateModified`、`inLanguage`
- 新增 BreadcrumbList JSON-LD
- 新增 FAQPage JSON-LD

### 3. `client/src/app/cards/[id]/CardDetailClient.tsx`（修改）

- 外層 `<div>` 改為 `<article>` 語義化
- 所有 `<h2>` 標題植入牌名關鍵字（如「愚者愛情占卜解析」）
- `formatReadingText` 增加 `<h3>` 子標題（如「愚者愛情正位」「愚者事業逆位」）

## 驗證方式

1. `npm run build` 確認 SSG 正常產出所有 78 頁
2. 檢查 `<title>` 包含長尾關鍵字
3. 檢查 `<meta name="description">` 內容
4. 檢查頁面含三組 JSON-LD（Article / BreadcrumbList / FAQPage）
5. 檢查 h2/h3 標題包含「{牌名}愛情正位」等關鍵字
6. 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 驗證結構化資料

## 狀態

- [x] 實作完成
