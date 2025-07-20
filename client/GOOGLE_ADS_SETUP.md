# Google Ads 設置指南

## 📋 設置步驟

### 1. 創建 Google AdSense 帳戶

1. 前往 [Google AdSense](https://www.google.com/adsense/)
2. 點擊「開始使用」
3. 登入您的 Google 帳戶
4. 填寫網站資訊：
   - 網站網址：https://wade-through-tarot.vercel.app
   - 網站語言：繁體中文
   - 網站類別：娛樂
5. 接受服務條款
6. 等待 Google 審核（通常需要 1-2 週）

### 2. 獲取 Publisher ID

審核通過後，您會獲得：

- **Publisher ID**：格式為 `ca-pub-XXXXXXXXXX`
- 這是您的唯一識別碼

### 3. 創建廣告單元

1. 在 AdSense 儀表板中點擊「廣告」
2. 點擊「建立新廣告單元」
3. 為每個廣告位置創建單元：

#### 廣告單元配置

| 廣告位置       | 廣告單元名稱          | 廣告格式 | 建議尺寸 |
| -------------- | --------------------- | -------- | -------- |
| 首頁頂部       | HOME_TOP_BANNER       | 橫幅     | 728x90   |
| 首頁底部       | HOME_BOTTOM_BANNER    | 橫幅     | 728x90   |
| 結果頁面       | RESULT_PAGE_RECTANGLE | 矩形     | 300x250  |
| 牌卡頁面側邊欄 | CARDS_PAGE_SIDEBAR    | 摩天大樓 | 160x600  |
| 通用響應式     | RESPONSIVE_GENERAL    | 響應式   | 自動     |

### 4. 獲取廣告單元 ID

每個廣告單元創建後，您會獲得：

- **廣告單元 ID**：格式為 `ad-slot-XXXXXX`
- 記錄下所有廣告單元 ID

## 🔧 程式碼設置

### 1. 更新廣告配置

編輯 `src/config/ads.ts` 文件：

```typescript
export const ADS_CONFIG = {
  // 將此處替換為您的實際 Publisher ID
  PUBLISHER_ID: "ca-pub-XXXXXXXXXX",

  AD_SLOTS: {
    // 將這些替換為您的實際廣告單元 ID
    HOME_TOP_BANNER: "ad-slot-XXXXXX",
    HOME_BOTTOM_BANNER: "ad-slot-XXXXXX",
    RESULT_PAGE_RECTANGLE: "ad-slot-XXXXXX",
    CARDS_PAGE_SIDEBAR: "ad-slot-XXXXXX",
    RESPONSIVE_GENERAL: "ad-slot-XXXXXX",
  },
  // ... 其他配置
};
```

### 2. 部署到生產環境

1. 提交程式碼變更
2. 部署到 Vercel
3. 等待 Google 審核廣告

## 📊 廣告位置說明

### 1. 首頁廣告

- **頂部橫幅**：頁面頂部，728x90 像素
- **底部橫幅**：頁面底部，728x90 像素
- **結果頁矩形**：占卜結果頁面，300x250 像素

### 2. 牌卡圖鑑頁面

- **側邊欄摩天大樓**：右側固定位置，160x600 像素
- **底部響應式**：頁面底部，自動適應螢幕尺寸

### 3. 響應式設計

- 所有廣告都會自動適應不同螢幕尺寸
- 在手機上會自動調整為適合的格式

## 🎯 廣告策略建議

### 1. 用戶體驗優先

- 廣告不會干擾主要功能
- 保持適當的間距和視覺平衡
- 避免過度廣告影響用戶體驗

### 2. 收益優化

- 熱門頁面放置更多廣告
- 使用響應式廣告提高填充率
- 定期分析廣告表現

### 3. 內容相關性

- 廣告與塔羅占卜主題相關
- 避免不當或不相關的廣告

## 🔍 監控和分析

### 1. AdSense 儀表板

- 查看收入報告
- 監控廣告表現
- 分析用戶行為

### 2. 關鍵指標

- **CPM**：每千次展示收益
- **CTR**：點擊率
- **RPM**：每千次展示收入
- **填充率**：廣告顯示率

### 3. 優化建議

- 根據表現調整廣告位置
- 測試不同的廣告格式
- 優化網站內容提高流量

## 🛡️ 政策合規

### 1. AdSense 政策

- 遵守 Google AdSense 政策
- 不點擊自己的廣告
- 不鼓勵他人點擊廣告

### 2. 用戶隱私

- 遵守 GDPR 和隱私法規
- 提供透明的隱私政策
- 尊重用戶選擇權

### 3. 內容品質

- 確保網站內容原創
- 避免重複或低品質內容
- 定期更新和維護

## 🚀 最佳實踐

### 1. 廣告放置

- 在自然閱讀流程中放置廣告
- 避免彈出式或侵入式廣告
- 保持頁面載入速度

### 2. 用戶體驗

- 廣告與網站設計風格一致
- 提供清晰的廣告標識
- 允許用戶選擇關閉廣告

### 3. 技術優化

- 使用延遲載入提高性能
- 監控廣告載入時間
- 優化行動裝置體驗

## ❓ 常見問題

### Q: 為什麼廣告沒有顯示？

A: 可能原因：

1. 網站還在審核中
2. 廣告單元 ID 不正確
3. 網站流量不足
4. 違反 AdSense 政策

### Q: 如何提高廣告收入？

A: 建議：

1. 增加網站流量
2. 優化廣告位置
3. 提高內容品質
4. 改善用戶體驗

### Q: 可以放置多少廣告？

A: AdSense 限制：

- 每頁最多 3 個廣告單元
- 不超過 3 個展示廣告
- 遵守 AdSense 政策

### Q: 如何處理廣告阻擋？

A: 建議：

1. 提供無廣告版本
2. 教育用戶支持網站
3. 多元化收入來源

## 📞 支援資源

### 1. 官方資源

- [Google AdSense 說明中心](https://support.google.com/adsense/)
- [AdSense 政策中心](https://support.google.com/adsense/answer/48182)
- [AdSense 論壇](https://productforums.google.com/forum/#!forum/adsense)

### 2. 開發者資源

- [AdSense API 文檔](https://developers.google.com/adsense/)
- [AdSense 程式碼範例](https://developers.google.com/adsense/management/v1.4/guides/adsense-code)

### 3. 社群支援

- Stack Overflow
- Reddit r/AdSense
- 開發者社群

## ⚠️ 重要提醒

1. **耐心等待**：AdSense 審核需要時間
2. **遵守政策**：嚴格遵守 Google 政策
3. **持續優化**：定期分析並優化廣告策略
4. **用戶優先**：始終將用戶體驗放在首位
5. **多元化收入**：不要完全依賴廣告收入
