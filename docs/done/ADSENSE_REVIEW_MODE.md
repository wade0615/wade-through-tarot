# Google AdSense 審核模式設定

## 概述

本專案支援 Google AdSense 審核期間的智能廣告顯示控制，讓您在審核期間隱藏廣告但保持頁面佈局，審核通過後可快速啟用廣告。

## 環境變數設定

### 審核期間（隱藏廣告）

```bash
# .env.local 或 Vercel 環境變數
NEXT_PUBLIC_ADS_ENABLED=false
```

### 審核通過後（顯示廣告）

```bash
# .env.local 或 Vercel 環境變數
NEXT_PUBLIC_ADS_ENABLED=true
```

## 功能特點

### 審核期間（NEXT_PUBLIC_ADS_ENABLED=false）

- ✅ 隱藏實際廣告內容
- ✅ 保留廣告容器結構（不影響頁面佈局）
- ✅ 載入 AdSense 腳本（確保審核通過）
- ✅ 顯示「AdSense 審核中...」提示
- ✅ 保持頁面美觀

### 審核通過後（NEXT_PUBLIC_ADS_ENABLED=true）

- ✅ 正常顯示 Google AdSense 廣告
- ✅ 自動觸發廣告載入
- ✅ 完整的廣告功能

## 部署設定

### Vercel 部署

1. 進入 Vercel 專案設定
2. 找到「Environment Variables」區塊
3. 新增變數：
   - **Name**: `NEXT_PUBLIC_ADS_ENABLED`
   - **Value**: `false`（審核期間）或 `true`（通過後）
4. 重新部署

### 本地開發

1. 在專案根目錄建立 `.env.local` 檔案
2. 加入：
   ```
   NEXT_PUBLIC_ADS_ENABLED=false
   ```
3. 重新啟動開發伺服器

## 審核流程

1. **申請階段**：設定 `NEXT_PUBLIC_ADS_ENABLED=false`
2. **提交審核**：網站會顯示隱形廣告容器
3. **等待審核**：Google 會檢查 AdSense 腳本和容器結構
4. **審核通過**：設定 `NEXT_PUBLIC_ADS_ENABLED=true`
5. **重新部署**：廣告開始正常顯示

## 注意事項

- 審核期間請勿更改廣告容器結構
- 確保 AdSense 腳本能正常載入
- 審核通過後記得及時啟用廣告
- 本地開發環境預設不顯示廣告

## 技術實作

- 使用 `shouldShowAds()` 控制廣告顯示
- 使用 `shouldLoadAdSenseScript()` 控制腳本載入
- 使用 `isReviewMode()` 判斷審核狀態
- 保留廣告容器以維持頁面佈局
