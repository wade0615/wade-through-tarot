# Google Analytics 設置指南

## 📋 設置步驟

### 1. 創建 Google Analytics 帳戶

1. 前往 [Google Analytics](https://analytics.google.com/)
2. 點擊「開始測量」
3. 創建帳戶（如果還沒有的話）
4. 填寫帳戶資訊：
   - 帳戶名稱：Wade Through Tarot
   - 資料共用設定：根據您的偏好選擇

### 2. 創建屬性（Property）

1. 點擊「下一步」
2. 選擇「網站」作為平台
3. 填寫網站資訊：
   - 屬性名稱：Wade Through Tarot
   - 網站網址：https://wade-through-tarot.vercel.app
   - 產業類別：娛樂
   - 報告時區：台北
4. 點擊「下一步」

### 3. 選擇業務目標

建議選擇以下目標：

- ✅ 獲取客戶
- ✅ 產生潛在客戶
- ✅ 線上銷售

### 4. 完成設置

1. 點擊「建立」
2. 接受服務條款
3. 您會看到一個 **Measurement ID**（格式：G-XXXXXXXXXX）

## 🔧 程式碼設置

### 1. 創建環境變數文件

在專案根目錄創建 `.env.local` 文件：

```bash
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**重要：** 請將 `G-XXXXXXXXXX` 替換為您的實際 Measurement ID

### 2. 部署到 Vercel

如果您使用 Vercel 部署，需要在 Vercel 專案設置中添加環境變數：

1. 前往 Vercel 儀表板
2. 選擇您的專案
3. 點擊「Settings」→「Environment Variables」
4. 添加變數：
   - 名稱：`NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - 值：您的 Measurement ID（G-XXXXXXXXXX）
   - 環境：Production, Preview, Development

## 📊 追蹤的事件

系統會自動追蹤以下事件：

### 1. 頁面瀏覽

- **事件名稱：** `page_view`
- **參數：** `page_name`
- **觸發時機：** 用戶訪問首頁

### 2. 占卜開始

- **事件名稱：** `tarot_reading_start`
- **參數：**
  - `spread_type`：牌陣類型（single/three-card/celtic-cross）
  - `question_length`：問題長度
  - `event_category`：tarot_reading
- **觸發時機：** 用戶開始占卜

### 3. 牌卡選擇

- **事件名稱：** `card_selected`
- **參數：**
  - `card_name`：牌卡名稱
  - `position`：位置
  - `is_reversed`：是否逆位
  - `event_category`：card_selection
- **觸發時機：** 用戶選擇牌卡

### 4. 占卜完成

- **事件名稱：** `tarot_reading_complete`
- **參數：**
  - `spread_type`：牌陣類型
  - `total_cards`：總牌數
  - `reading_duration`：占卜時長（毫秒）
  - `event_category`：tarot_reading
- **觸發時機：** 用戶完成占卜

## 🔍 查看數據

### 1. 即時數據

1. 前往 Google Analytics
2. 點擊「報告」→「即時」
3. 查看即時活躍用戶

### 2. 事件報告

1. 前往「參與度」→「事件」
2. 查看自定義事件數據

### 3. 用戶行為

1. 前往「參與度」→「頁面和畫面」
2. 查看頁面瀏覽數據

## 🛠️ 自定義追蹤

您可以在任何組件中使用追蹤函數：

```typescript
import { trackEvent, trackUserInteraction } from "@/components/GoogleAnalytics";

// 追蹤自定義事件
trackEvent("custom_event", {
  custom_parameter: "value",
  event_category: "custom",
  event_label: "label",
});

// 追蹤用戶互動
trackUserInteraction("click", "button", "start_reading");
```

## 🔒 隱私保護

### 1. 符合 GDPR

- 系統不會追蹤個人識別資訊
- 只追蹤匿名用戶行為
- 不存儲用戶輸入的問題內容

### 2. 用戶選擇權

- 用戶可以透過瀏覽器設定停用追蹤
- 提供透明的隱私政策

## 📈 建議的 KPI

### 1. 用戶參與度

- 每日活躍用戶（DAU）
- 平均會話時長
- 跳出率

### 2. 功能使用率

- 各牌陣使用比例
- 完成率（開始占卜到完成的比例）
- 牌卡選擇模式

### 3. 用戶留存

- 7 天留存率
- 30 天留存率
- 回訪用戶比例

## 🚀 優化建議

### 1. 內容優化

- 根據熱門牌陣調整 UI
- 優化用戶流程
- 改善完成率

### 2. 功能開發

- 根據用戶行為開發新功能
- 優化熱門頁面
- 改善用戶體驗

### 3. 行銷策略

- 根據用戶來源調整行銷策略
- 優化轉換漏斗
- 改善用戶獲取成本

## ❓ 常見問題

### Q: 為什麼看不到數據？

A: 請確認：

1. Measurement ID 是否正確
2. 環境變數是否設置
3. 網站是否已部署
4. 等待 24-48 小時數據更新

### Q: 如何測試追蹤是否正常？

A: 使用 Google Analytics Debugger 擴充功能或瀏覽器開發者工具檢查網路請求。

### Q: 可以追蹤更多事件嗎？

A: 是的，可以使用 `trackEvent` 函數追蹤任何自定義事件。

## 📞 支援

如果您遇到問題，請：

1. 檢查 Google Analytics 設置
2. 確認環境變數
3. 查看瀏覽器控制台錯誤
4. 聯繫開發團隊
