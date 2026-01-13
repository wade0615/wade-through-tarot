# CardDeck 開扇撲牌交互升級計劃

## 文檔資訊

- **建立日期**: 2026-01-13
- **最後更新**: 2026-01-13
- **優先級**: 中 (UX 改善，非核心功能阻塞)
- **狀態**: 需求討論中
- **預計完成時間**: 待評估
- **相關檔案**:
  - `client/src/components/CardDeck.tsx` - 牌堆主組件（需重構）
  - `client/src/components/TarotCard.tsx` - 單張牌組件（可能需擴充）
  - `client/src/components/SelectionView.tsx` - 選牌視圖（包含 CardDeck）

---

## 需求描述

### 當前狀態

**現有交互流程**:

1. 畫面中央顯示 5 張堆疊的牌背（視覺效果）
2. 用戶點擊最上層的牌
3. 從洗好的牌堆中抽出一張牌
4. 該牌從牌堆中移除
5. 重複直到達到指定張數

**技術實現** (CardDeck.tsx:76-115):

```tsx
{
  [0, 1, 2, 3, 4].map((index) => (
    <div
      key={index}
      style={{
        transform: `translate(calc(-50% + ${index * 2}px), ${index * -2}px)`,
        zIndex: 5 - index,
        left: "50%",
      }}
    >
      <TarotCardComponent
        showBack
        size="lg"
        onClick={index === 0 ? handleCardClick : undefined}
      />
    </div>
  ));
}
```

### 期望改善

**新的交互流程**:

1. **開扇展開**: 畫面左側由上至下展開所有牌（類似撲克開扇效果）
2. **單張選擇**: 用戶點擊展開牌面中的任意一張
3. **滑出動畫**: 被選中的牌滑動至畫面右側，象徵「已選擇」
4. **重複選擇**: 繼續從左側展開的牌中選擇
5. **完成階段**: 選擇完指定張數後，進入結果查看

**視覺佈局**:

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌────┐                     ┌────┐     │
│  │牌1 │                     │已選│ ←─┐ │
│   ┌────┐                    │牌1 │   │ │
│   │牌2 │                    └────┘   │ │
│    ┌────┐                   ┌────┐   │ │
│    │牌3 │  點擊後滑動至右側 →│已選│   │ │
│     ┌────┐                  │牌2 │   │ │
│     │牌4 │                  └────┘   │ │
│      ┌────┐                          │ │
│      │...│                           │ │
│                                      │ │
│    左側開扇展開              右側已選區域│
│                                         │
└─────────────────────────────────────────┘
```

---

## 技術方案分析

### 問題 1: 是否需要 Canvas？

#### Canvas 方案 ✅ 優點 / ❌ 缺點

**優點**:

- ✅ 性能更好（特別是大量動畫和粒子效果）
- ✅ 可實現複雜的物理效果（卡牌飛行軌跡、旋轉、彈性）
- ✅ 更流暢的動畫（60fps 更容易達成）
- ✅ 可添加特效（光暈、拖尾、陰影）

**缺點**:

- ❌ 開發複雜度高（需要手動處理渲染、事件、碰撞檢測）
- ❌ 可訪問性差（需要額外處理 screen reader、鍵盤導航）
- ❌ SEO 不友善（內容不在 DOM 中）
- ❌ 響應式處理複雜（需要監聽 resize 並重新計算座標）
- ❌ 需要引入額外的 Canvas 庫（如 Konva.js、Fabric.js、PixiJS）
- ❌ 除錯困難（無法使用 DevTools 檢查元素）

**適用場景**:

- 需要大量卡牌同時動畫（100+ 張）
- 需要複雜的物理效果（碰撞、重力、彈性）
- 需要粒子特效或濾鏡效果

#### CSS/HTML 方案 ✅ 優點 / ❌ 缺點

**優點**:

- ✅ 開發簡單（使用熟悉的 CSS transform/transition）
- ✅ 可訪問性好（保持 DOM 結構，支援鍵盤、screen reader）
- ✅ SEO 友善（內容在 DOM 中）
- ✅ 響應式處理簡單（使用相對單位和 flexbox/grid）
- ✅ 除錯容易（DevTools 直接檢查）
- ✅ 無需額外依賴
- ✅ 與現有 React 組件無縫整合

**缺點**:

- ❌ 複雜動畫可能性能較差（大量 DOM 元素）
- ❌ 動畫控制較粗糙（難以實現物理效果）

**適用場景**:

- 卡牌數量適中（78 張塔羅牌）
- 動畫相對簡單（位移、旋轉、縮放）
- 需要保持可訪問性和 SEO

---

## 建議方案：CSS/HTML 實現 ✅ 推薦

### 為什麼選擇 CSS/HTML？

1. **卡牌數量適中**: 78 張塔羅牌，CSS 動畫足以應付
2. **動畫需求簡單**: 開扇展開、滑動、縮放都可用 CSS transform 實現
3. **開發效率高**: 不需要學習 Canvas API，使用現有 React + CSS 技能
4. **維護成本低**: 代碼清晰、易於除錯
5. **可訪問性**: 保持 DOM 結構，支援鍵盤和 screen reader
6. **無額外依賴**: 不需要引入 Canvas 庫

### 實現方案設計

#### 1. 開扇展開效果

**技術**: CSS `transform: rotate()` + `transform-origin`

```tsx
// 計算每張牌的旋轉角度和位置
const fanCards = shuffledCards.map((card, index) => {
  const totalCards = shuffledCards.length;
  const angle = ((index - totalCards / 2) * fanSpreadAngle) / totalCards;
  const translateY = index * cardOffset;

  return {
    card,
    style: {
      transform: `translateY(${translateY}px) rotate(${angle}deg)`,
      transformOrigin: "bottom center",
      zIndex: index,
      transition: "all 0.5s ease-out",
    },
  };
});
```

**效果示意**:

```
    │         畫面左側
    │
    ┌────┐    ← -10度
     ┌────┐   ← -5度
      ┌────┐  ← 0度 (中心)
       ┌────┐ ← +5度
        ┌────┐ ← +10度
```

#### 2. 單張牌選擇與滑出動畫

**技術**: CSS `transform: translate()` + React 狀態管理

```tsx
const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

const handleCardClick = (card: TarotCard, index: number) => {
  // 1. 標記為已選擇
  setSelectedCardIds((prev) => [...prev, card.id]);

  // 2. 觸發滑出動畫（通過 CSS class）
  // 牌會從左側滑動到右側

  // 3. 動畫完成後，從左側移除並加入右側區域
  setTimeout(() => {
    onCardSelect?.(card, getRandomReversed());
  }, 500); // 等待動畫完成
};
```

**CSS 動畫**:

```css
.card-selected {
  animation: slideToRight 0.5s ease-out forwards;
}

@keyframes slideToRight {
  from {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(60vw) scale(0.8);
    opacity: 0.5;
  }
}
```

#### 3. 佈局結構

```tsx
<div className="flex justify-between items-start min-h-screen px-8">
  {/* 左側：開扇牌堆 */}
  <div className="flex-1 relative">
    <div className="fan-container">
      {availableCards.map((card, index) => (
        <TarotCardComponent
          key={card.id}
          card={card}
          showBack
          onClick={() => handleCardClick(card, index)}
          className={cn(
            "fan-card",
            selectedCardIds.includes(card.id) && "card-selected"
          )}
          style={getFanCardStyle(index)}
        />
      ))}
    </div>
  </div>

  {/* 右側：已選牌區域 */}
  <div className="w-80 flex flex-col gap-4">
    <h3>
      已選擇 {selectedCards.length} / {maxSelection} 張
    </h3>
    {selectedCards.map((sc, index) => (
      <TarotCardComponent
        key={sc.card.id}
        card={sc.card}
        isReversed={sc.isReversed}
        size="md"
        className="selected-card-enter"
      />
    ))}
  </div>
</div>
```

#### 4. 響應式設計

**桌面版** (≥1024px):

- 上下佈局
- 上方開扇展開（水平重疊排列）
- 下方已選牌區域（水平排列）

**平板版** (768px - 1023px):

- 上下佈局（同桌面版）
- 開扇區域高度調整
- 已選牌區域縮小

**手機版** (<768px):

- 左右佈局
- 左側開扇展開（垂直扇形，-15° 到 +15°）
- 右側已選牌區域（垂直堆疊）

---

## 需要釐清的問題

### 1. 開扇展開的方向和角度

**問題**:

- 由上至下展開時，牌是「垂直排列 + 小角度旋轉」還是「扇形展開」？
- 角度範圍是多少？（建議 -15° 到 +15°，共 30° 扇形）

**建議**:

```
選項 A：垂直扇形（更優雅）
    ┌────┐    ← 牌向左旋轉 -10°
     ┌────┐   ← 牌向左旋轉 -5°
      ┌────┐  ← 牌不旋轉 0°
       ┌────┐ ← 牌向右旋轉 +5°
        ┌────┐ ← 牌向右旋轉 +10°

選項 B：純垂直堆疊（更簡單）
    ┌────┐    ← 牌不旋轉，僅位移
    ┌────┐
    ┌────┐
    ┌────┐
    ┌────┐
```

### 2. 牌展開的數量

**問題**:

- 一次展開所有 78 張牌？還是只展開部分（如 20 張）？
- 如果全部展開，畫面可能過於擁擠

**建議**:

- 展開 15-20 張牌（足夠選擇，不會過於擁擠）
- 隨著選牌進行，動態補充新的牌到扇形中
- 使用「虛擬滾動」技術優化性能

### 3. 滑出動畫的細節

**問題**:

- 滑出時是否需要翻牌動畫？（顯示牌面）
- 滑出速度？（建議 0.5-0.8 秒）
- 滑出軌跡？（直線 vs 曲線）

**建議**:

```
選項 A：直接滑出（簡單）
左側 → → → → 右側

選項 B：拋物線滑出（更生動）
左側 → ↗ → ↘ 右側

選項 C：翻牌後滑出（最生動）
左側 → [翻轉180°] → 右側
```

### 4. 右側已選牌的排列方式

**問題**:

- 垂直堆疊？還是網格排列？
- 是否可以點擊已選牌取消選擇？

**建議**:

```
選項 A：垂直堆疊（節省空間）
┌────┐
┌────┐
┌────┐

選項 B：網格排列（更清晰）
┌────┐ ┌────┐
┌────┐

選項 C：重疊展示（節省空間，類似牌組）
  ┌────┐
 ┌────┐
┌────┐
```

### 5. 觸控設備支援

**問題**:

- 手機上如何操作？（點擊 vs 滑動）
- 是否需要支援「拖曳」牌到右側？

**建議**:

- 桌面：點擊或拖曳
- 手機：點擊（拖曳在小螢幕上容易誤觸）

---

## 實作階段規劃

### Phase 1: 基礎佈局與開扇效果（2-3 小時）

**目標**: 實現左右分欄佈局和開扇展開效果

**任務清單**:

- [ ] 重構 CardDeck 組件佈局（左右分欄）
- [ ] 實現開扇展開計算邏輯（角度、位移）
- [ ] 添加 CSS 動畫（開扇展開）
- [ ] 響應式設計（桌面/平板/手機）

**驗收標準**:

```bash
npm run dev
# 訪問首頁 → 進入選牌階段
# 應該看到左側牌展開成扇形
# 右側顯示「已選擇 0/N 張」
```

### Phase 2: 選牌與滑出動畫（2-3 小時）

**目標**: 實現點擊選牌和滑出動畫

**任務清單**:

- [ ] 實現牌卡點擊事件處理
- [ ] 添加滑出動畫（CSS + React 狀態）
- [ ] 牌滑出至右側區域
- [ ] 從左側扇形中移除已選牌
- [ ] 添加選牌計數器更新

**驗收標準**:

```bash
# 點擊左側任意一張牌
# 該牌應該平滑滑動至右側
# 左側扇形自動調整（移除已選牌）
# 右側顯示已選牌，計數器更新
```

### Phase 3: 動畫優化與細節打磨（2-3 小時）

**目標**: 優化動畫效果和用戶體驗

**任務清單**:

- [ ] 優化動畫時序（stagger effect）
- [ ] 添加音效（可選）
- [ ] 添加 hover 效果（高亮、放大）
- [ ] 添加觸控支援（手機/平板）
- [ ] 性能優化（虛擬滾動、GPU 加速）

**驗收標準**:

```bash
# 動畫流暢（60fps）
# hover 時牌卡高亮
# 手機上可正常點擊
# 無卡頓或延遲
```

### Phase 4: 測試與修復（1-2 小時）

**目標**: 全面測試和修復 bug

**任務清單**:

- [ ] 單元測試（CardDeck 邏輯）
- [ ] E2E 測試（完整選牌流程）
- [ ] 瀏覽器兼容性測試（Chrome、Safari、Firefox）
- [ ] 響應式測試（不同螢幕尺寸）
- [ ] 可訪問性測試（鍵盤導航、screen reader）

**驗收標準**:

```bash
npm run test        # 單元測試通過
npm run test:e2e    # E2E 測試通過
# 在 Chrome、Safari、Firefox 上手動測試
# 在手機、平板、桌面上測試
```

---

## 總體時間表

| 階段                    | 時間安排  | 工時      | 里程碑          |
| ----------------------- | --------- | --------- | --------------- |
| Phase 1: 基礎佈局與開扇 | 第 1-2 天 | 2-3h      | ✅ 開扇效果完成 |
| Phase 2: 選牌與動畫     | 第 2-3 天 | 2-3h      | ✅ 滑出動畫完成 |
| Phase 3: 優化與打磨     | 第 3-4 天 | 2-3h      | ✅ 動畫優化完成 |
| Phase 4: 測試與修復     | 第 4-5 天 | 1-2h      | ✅ 測試通過     |
| **總計**                | **5 天**  | **7-11h** | **功能上線**    |

---

## 技術風險評估

| 風險項目         | 可能性 | 影響 | 緩解措施                                 |
| ---------------- | ------ | ---- | ---------------------------------------- |
| 動畫性能不佳     | 中     | 中   | 使用 CSS transform（GPU 加速）、虛擬滾動 |
| 響應式適配困難   | 低     | 中   | 使用 flexbox/grid、相對單位              |
| 觸控設備體驗差   | 中     | 高   | 提供點擊模式、增大觸控區域               |
| 瀏覽器兼容性問題 | 低     | 低   | 使用標準 CSS、polyfill                   |
| 可訪問性不足     | 中     | 中   | 保持 DOM 結構、添加 ARIA 標籤            |

---

## 需求確認 ✅ (2026-01-13)

### 基本需求

1. **展開牌數**: 所有 78 張牌
2. **滑出動畫**: 不翻牌，0.5 秒，直線滑出
3. **已選牌顯示**: 顯示牌背（保持神秘感）
4. **取消選牌**: 不可以
5. **交互方式**: PC/Mobile 僅支援點擊
6. **懸停效果**: 高亮 + 輕微放大 + 其他牌淡化
7. **點擊區域**: 擴大點擊區域（比視覺大 5-10px）
8. **開扇動態調整**: 保持原有位置，出現空缺（不重新計算）

### PC 版佈局（≥1024px）- 上下佈局

**上方：開扇牌堆區域（60% 高度，約 400-500px）**

- 排列方式：水平排列，無旋轉
- 展示方式：重疊展示（像真實撲克開扇）
  - 每張牌完整寬度：60-80px
  - 重疊展示，僅露出 10-15px
  - 總寬度：約 800-1200px（無需滾動）
- 選牌後：保持原有位置，出現空缺

**下方：已選牌區域（40% 高度，約 300-350px）**

- 排列方式：水平排列，居中顯示
- 顯示內容：牌背（保持神秘感）

**視覺示意**:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│        開扇牌堆區域（水平重疊展開）              │
│     ┌┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┐            │
│     ││││││││││││││││││││││││││││││            │
│     (78 張牌，重疊展示，無旋轉)                  │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│        已選牌區域（水平排列，居中）              │
│           ┌────┐ ┌────┐ ┌────┐                 │
│           │牌背│ │牌背│ │牌背│                 │
│           └────┘ └────┘ └────┘                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 手機版佈局（<1024px）- 左右佈局

**左側：開扇牌堆區域（約 60-70% 寬度）**

- 排列方式：垂直排列 + 小角度旋轉（-15° 到 +15°）
- 卡片尺寸：縮小以容納所有 78 張牌
- 展示方式：扇形展開
- 選牌後：保持原有位置，出現空缺

**右側：已選牌區域（約 30-40% 寬度）**

- 排列方式：垂直堆疊
- 顯示內容：牌背（保持神秘感）

**視覺示意**:

```
┌──────────────┬──────────┐
│  ┌────┐      │ ┌────┐  │
│  │牌1 │      │ │已選│  │
│   ┌────┐     │ │牌1 │  │
│   │牌2 │     │ └────┘  │
│    ┌────┐    │ ┌────┐  │
│    │牌3 │    │ │已選│  │
│     ┌────┐   │ │牌2 │  │
│     │...│    │ └────┘  │
│              │          │
│  開扇牌堆    │ 已選牌   │
│  (垂直扇形)  │ (垂直)   │
└──────────────┴──────────┘
```

---

## 技術實作重點

### PC 版開扇計算

**水平重疊展開計算**:

```tsx
const getPCFanCardStyle = (index: number, totalCards: number) => {
  const cardWidth = 70; // 完整卡片寬度
  const visibleWidth = 12; // 每張牌露出的寬度
  const containerWidth = 1000; // 容器寬度
  const startX =
    (containerWidth - (totalCards * visibleWidth + cardWidth - visibleWidth)) /
    2;

  return {
    transform: `translateX(${startX + index * visibleWidth}px)`,
    zIndex: index,
    width: `${cardWidth}px`,
  };
};
```

### 手機版開扇計算

**垂直扇形展開計算**:

```tsx
const getMobileFanCardStyle = (index: number, totalCards: number) => {
  const fanSpreadAngle = 30; // 總扇形角度（-15° 到 +15°）
  const cardHeight = 80; // 縮小後的卡片高度
  const cardOffset = 3; // 垂直間距

  const angle = ((index - totalCards / 2) * fanSpreadAngle) / totalCards;
  const translateY = index * cardOffset;

  return {
    transform: `translateY(${translateY}px) rotate(${angle}deg)`,
    transformOrigin: "bottom center",
    zIndex: index,
  };
};
```

### 滑出動畫

**CSS 動畫**:

```css
.card-slide-out-pc {
  animation: slideDown 0.5s ease-out forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(300px);
    opacity: 0;
  }
}

.card-slide-out-mobile {
  animation: slideRight 0.5s ease-out forwards;
}

@keyframes slideRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100vw);
    opacity: 0;
  }
}
```

### 懸停效果

```css
.fan-card:hover {
  transform: scale(1.1);
  z-index: 999;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  transition: all 0.2s ease-out;
}

.fan-card:hover ~ .fan-card {
  opacity: 0.7;
}
```

---

## 技術方案

### 採用：CSS/HTML 實現

**理由**:

1. ✅ 開發效率高，維護成本低
2. ✅ 可訪問性好，SEO 友善
3. ✅ 卡牌數量適中（78 張），性能足夠
4. ✅ 與現有技術棧無縫整合
5. ✅ 無需額外依賴（不使用 Canvas）

---

**最後更新**: 2026-01-13
**文檔狀態**: ✅ 所有需求已確認完成
**下一步**: 準備開始 Phase 1 實作
**預計工時**: 7-11 小時（5 天）
