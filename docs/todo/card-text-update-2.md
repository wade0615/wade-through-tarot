# 卡片文案更新 Phase 2 — practicalAdvice / numerology / astrology / mythology

## 目標

將 `client/src/data/tarotCards.ts` 中每張牌的以下四個欄位文案擴充至目標字數：

| 欄位 | 目標字數 | 現況字數範圍 |
|------|---------|-------------|
| `practicalAdvice` | 180–220 字 | 27–83 字 |
| `numerology` | 100–150 字 | 19–85 字 |
| `astrology` | 100–150 字 | 29–89 字 |
| `mythology` | 100–150 字 | 31–92 字 |

**全部 78 張牌皆低於目標字數，需逐一更新。**

---

## 現況分析

### 內容品質分層

| 分層 | 說明 | 張數 | 特徵 |
|------|------|------|------|
| A 層 | 現有內容較豐富 | 13 張 | practicalAdvice ≥ 65 字，四欄位皆有實質內容 |
| B 層 | 中等內容 | 5 張 | practicalAdvice 40–64 字，內容具差異化但偏短 |
| C 層 | 模板填充 | 60 張 | practicalAdvice < 40 字，各牌內容高度雷同 |

### 各牌組現況

| 牌組 | 張數 | practicalAdvice 均 | numerology 均 | astrology 均 | mythology 均 | 每張需補字量（4 欄合計）|
|------|------|-------------------|--------------|-------------|-------------|----------------------|
| 大阿爾克納 | 22 | ~55 字 | ~55 字 | ~61 字 | ~61 字 | ~168 字 |
| 聖杯 | 14 | ~42 字 | ~34 字 | ~42 字 | ~42 字 | ~292 字 |
| 金幣 | 14 | ~37 字 | ~24 字 | ~41 字 | ~47 字 | ~311 字 |
| 寶劍 | 14 | ~34 字 | ~24 字 | ~39 字 | ~45 字 | ~318 字 |
| 權杖 | 14 | ~32 字 | ~24 字 | ~35 字 | ~41 字 | ~328 字 |

---

## 分階段執行計畫

依牌組分為 **6 個 Phase**，優先處理內容最豐富的牌組以建立品質標準，再依序處理模板內容。

### Phase 1 — 大阿爾克納前半（11 張）

編號 0–10：fool、magician、high-priestess、empress、emperor、hierophant、lovers、chariot、strength、hermit、wheel-of-fortune

- 這批牌現有內容為 A 層，擴充幅度較小
- 作為首批執行，建立文案風格與品質標準

### Phase 2 — 大阿爾克納後半（11 張）

編號 11–21：justice、hanged-man、death、temperance、devil、tower、star、moon、sun、judgement、world

- hanged-man 至 world（不含 star）為 C 層模板內容，需大幅改寫
- justice 與 star 為 A 層，擴充幅度較小

### Phase 3 — 聖杯牌組（14 張）

ace-cups ~ king-cups

- ace-cups 至 four-cups 有中等內容，five-cups 至 king-cups 為模板填充

### Phase 4 — 金幣牌組（14 張）

ace-pentacles ~ king-pentacles

- 全部為 C 層模板內容，字數極度均一（差異僅 3–4 字），需全面改寫

### Phase 5 — 寶劍牌組（14 張）

ace-swords ~ king-swords

- 全部為 C 層模板內容，與金幣牌組狀況相同

### Phase 6 — 權杖牌組（14 張）

ace-wands ~ king-wands

- 全部為 C 層模板內容，現有字數為所有牌組中最低

---

## 文案撰寫規範

### practicalAdvice（實用建議）180–220 字

- 提供 2–3 個具體可執行的生活建議
- 結合牌義核心概念，避免空泛通用語句
- 涵蓋心態調整與行動方向兩個面向

### numerology（數字學含義）100–150 字

- 說明該牌編號在數字學中的象徵意義
- 連結數字能量與牌面核心主題
- 宮廷牌以其代表的階段/角色切入

### astrology（占星學關聯）100–150 字

- 指明對應的行星、星座或宮位
- 解釋占星象徵如何呼應牌義
- 帶入實際占星場景輔助理解

### mythology（神話背景）100–150 字

- 引用具體的神話故事、人物或原型
- 闡述神話意象與牌面圖案的關聯
- 東西方神話皆可，以讀者易理解為優先

---

## 每階段執行流程

1. 逐張更新 `tarotCards.ts` 中對應牌的四個欄位
2. 確認每個欄位字數落在目標範圍內
3. `npm run build` 驗證 SSG 正常產出 78 頁
4. 單獨 commit，格式：`content: 擴充{牌組名}{張數}張牌 practicalAdvice/numerology/astrology/mythology 文案 (Phase N)`

---

## 驗證方式

1. `npm run build` 確認編譯與靜態頁面產出正常
2. 抽樣檢查 3–5 張牌頁面，確認文案正確顯示
3. 字數抽驗：每階段完成後隨機抽取 2 張牌，確認四欄位皆在目標範圍

## 狀態

- [x] Phase 1 — 大阿爾克納前半（11 張）
- [x] Phase 2 — 大阿爾克納後半（11 張）
- [x] Phase 3 — 聖杯牌組（14 張）
- [ ] Phase 4 — 金幣牌組（14 張）
- [ ] Phase 5 — 寶劍牌組（14 張）
- [ ] Phase 6 — 權杖牌組（14 張）
