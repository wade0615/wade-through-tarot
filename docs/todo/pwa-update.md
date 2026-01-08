# PWA 更新機制與 Google Ads 整合問題

## 文檔資訊

- **建立日期**: 2026-01-09
- **優先級**: 高 (影響用戶體驗和收益)
- **狀態**: 待處理
- **相關檔案**:
  - `client/public/sw.js`
  - `client/public/manifest.json`
  - `client/src/components/GoogleAds.tsx`
  - `client/src/app/layout.tsx`

---

## 問題概述

### 1. Google Ads 在 PWA 中的運作問題

#### 現況分析

**基本運作**:
- ✅ PWA 本質上仍在瀏覽器中運行，Google AdSense 會正常載入
- ✅ 廣告展示和點擊會正常記錄在 Google Ads 收益中
- ✅ 在有網路連線的情況下，廣告機制完全正常

**潛在問題**:
1. **離線狀態限制**
   - Service Worker 使用 cache-first 策略 (sw.js:20-26)
   - 離線時 AdSense 腳本無法載入
   - 離線狀態下不會顯示廣告，無收益

2. **網路依賴性**
   - AdSense 腳本 (`adsbygoogle.js`) 沒有被快取
   - 需要網路連線才能載入廣告
   - 首次訪問後的離線體驗會缺少廣告

3. **追蹤準確度**
   - PWA 獨立視窗模式可能影響分析工具
   - 部分分析工具可能誤判為不同來源
   - 需要監控收益數據確認是否有偏差

#### 收益影響評估

| 狀況 | 廣告顯示 | 收益計入 | 說明 |
|------|---------|---------|------|
| 正常連線 | ✅ 是 | ✅ 是 | 完全正常運作 |
| 離線狀態 | ❌ 否 | ❌ 否 | 無廣告展示機會 |
| 弱網路 | ⚠️ 延遲 | ⚠️ 部分 | 可能載入失敗 |

---

### 2. PWA 更新機制的嚴重缺陷

#### 問題描述

**核心問題**: 當網站更新時，已安裝的 PWA 不會自動更新到最新版本

#### 技術原因 (sw.js:1-43)

```javascript
const CACHE_NAME = "tarot-app-v1";  // ❌ 固定版本號
```

**導致的問題**:
1. ❌ Service Worker 檔案內容未改變，瀏覽器不會重新安裝
2. ❌ 用戶持續使用快取的舊版本內容
3. ❌ 新功能、bug 修復無法觸及已安裝 PWA 的用戶
4. ❌ 可能造成功能失效或資料不同步

#### 影響範圍

- **用戶體驗**: 看到過時的 UI 和功能
- **Bug 修復**: 無法推送緊急修復
- **新功能**: 用戶無法獲得新功能
- **資料同步**: 可能與後端 API 不相容

#### 更新時機分析

| 觸發條件 | 是否會更新 | 原因 |
|---------|-----------|------|
| 網站檔案更新 | ❌ 否 | Cache name 未變 |
| Service Worker 更新 | ✅ 是 | 檔案內容改變 |
| 用戶手動重新安裝 | ✅ 是 | 清除舊快取 |
| 24小時後自動檢查 | ⚠️ 可能 | 瀏覽器行為不一致 |

---

## 解決方案

### 方案 1: 緊急修復 - 手動版本管理

**優點**: 簡單、立即可用
**缺點**: 需要每次手動更新、容易遺忘

```javascript
// sw.js
const CACHE_NAME = "tarot-app-v2";  // 每次更新時遞增版本號
```

**實施步驟**:
1. 更新 `CACHE_NAME` 版本號
2. 提交並部署
3. 建立版本更新檢查清單

**適用場景**: 臨時解決方案，確保當前更新能推送

---

### 方案 2: 自動版本號生成

**優點**: 自動化、不易出錯
**缺點**: 需要修改 build 流程

```javascript
// sw.js
const BUILD_TIME = '{{BUILD_TIMESTAMP}}';
const CACHE_NAME = `tarot-app-${BUILD_TIME}`;
```

**實施步驟**:
1. 創建 build script 在構建時替換 placeholder
2. 在 `package.json` 中添加 prebuild 腳本
3. 測試構建流程

```json
// package.json
{
  "scripts": {
    "prebuild": "node scripts/generate-sw-version.js",
    "build": "next build"
  }
}
```

**適用場景**: 中期方案，平衡簡單性和自動化

---

### 方案 3: Workbox 整合（推薦）

**優點**: 完整的 PWA 解決方案、自動處理快取、更新策略靈活
**缺點**: 需要較大的重構、學習曲線

```bash
npm install next-pwa workbox-webpack-plugin
```

**主要功能**:
- ✅ 自動版本管理
- ✅ 智能快取策略（網路優先、快取優先、Stale-While-Revalidate）
- ✅ 預快取關鍵資源
- ✅ 更新通知機制
- ✅ 開發環境自動排除

**實施步驟**:
1. 安裝 `next-pwa` 套件
2. 配置 `next.config.js`
3. 移除手動編寫的 `sw.js`
4. 實作更新通知 UI

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  // 其他 Next.js 配置
});
```

**適用場景**: 長期方案，提供最佳實踐

---

### 方案 4: 更新檢查與通知機制

**獨立或配合其他方案使用**

```typescript
// components/PWAUpdateNotifier.tsx
'use client';

import { useEffect, useState } from 'react';

export default function PWAUpdateNotifier() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        setRegistration(reg);

        // 定期檢查更新（每小時）
        setInterval(() => {
          reg.update();
        }, 60 * 60 * 1000);

        // 監聽更新事件
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <p className="mb-2">有新版本可用！</p>
      <button
        onClick={handleUpdate}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
      >
        更新
      </button>
    </div>
  );
}
```

**實施步驟**:
1. 創建更新通知組件
2. 在 `layout.tsx` 中引入
3. 在 Service Worker 中添加 message 監聽

```javascript
// sw.js - 添加訊息處理
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

---

## 建議實施計劃

### Phase 1: 緊急修復（1-2 小時）
- [ ] 將 `CACHE_NAME` 改為 `tarot-app-v2`
- [ ] 測試 PWA 更新機制
- [ ] 部署到生產環境
- [ ] 監控用戶是否收到更新

### Phase 2: 中期改進（1-2 天）
- [ ] 實作自動版本號生成
- [ ] 創建更新通知 UI 組件
- [ ] 添加版本資訊頁面
- [ ] 撰寫測試案例

### Phase 3: 長期優化（1 週）
- [ ] 評估 Workbox vs 自建方案
- [ ] 整合 `next-pwa` 或實作自定義 Workbox 配置
- [ ] 優化快取策略（區分靜態資源、API、圖片）
- [ ] 實作離線頁面
- [ ] 添加背景同步機制

### Phase 4: Google Ads 優化（持續）
- [ ] 監控 PWA 用戶的廣告收益
- [ ] 分析離線使用率
- [ ] 評估是否需要特殊的廣告策略
- [ ] 考慮在離線時顯示占位符或備用內容

---

## 技術債務追蹤

### 已知限制

1. **Service Worker 快取策略過於簡單**
   - 檔案: `public/sw.js:20-26`
   - 問題: 使用 cache-first，可能導致內容過時
   - 影響: 用戶看不到最新內容

2. **缺乏版本控制機制**
   - 檔案: `public/sw.js:1`
   - 問題: 固定版本號
   - 影響: 無法推送更新

3. **沒有更新通知**
   - 影響: 即使更新可用，用戶也不知道

4. **AdSense 腳本未優化**
   - 檔案: `components/GoogleAds.tsx`
   - 問題: 離線時完全無法使用
   - 建議: 考慮添加離線占位符

---

## 測試清單

### PWA 更新測試

- [ ] 修改 cache name 後，舊 PWA 是否更新
- [ ] 更新通知是否正確顯示
- [ ] 更新後內容是否為最新版本
- [ ] 離線功能是否仍正常運作
- [ ] 圖示和 manifest 是否正確載入

### Google Ads 測試

- [ ] PWA 安裝模式下廣告是否顯示
- [ ] 點擊廣告是否正確追蹤
- [ ] 離線狀態下的處理是否正確
- [ ] 重新連線後廣告是否重新載入
- [ ] Google Analytics 是否正確記錄 PWA 流量

### 跨瀏覽器測試

- [ ] Chrome (Android)
- [ ] Safari (iOS)
- [ ] Edge (Windows)
- [ ] Samsung Internet
- [ ] Firefox (Android)

---

## 參考資料

### 官方文檔

- [Google - Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
- [MDN - Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Next.js PWA](https://github.com/shadowwalker/next-pwa)
- [Google AdSense PWA Guidelines](https://support.google.com/adsense/answer/9274019)

### 相關討論

- [PWA 更新策略最佳實踐](https://web.dev/service-worker-lifecycle/)
- [Service Worker 快取策略](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)
- [PWA 中的廣告實作](https://developers.google.com/web/ilt/pwa/lab-integrating-web-push)

---

## 附註

### 監控指標

建議追蹤以下指標來評估改進效果：

1. **PWA 採用率**
   - 安裝數 / 總訪客數
   - PWA 使用頻率

2. **更新成功率**
   - 更新推送數
   - 實際更新用戶數
   - 更新失敗率

3. **廣告收益**
   - PWA 用戶的 RPM (每千次展示收益)
   - PWA vs 網頁版收益對比
   - 離線使用率對收益的影響

4. **用戶體驗**
   - 內容新鮮度
   - 離線可用性
   - 載入速度

### 成本效益分析

| 方案 | 開發時間 | 維護成本 | 效益 | 建議 |
|------|---------|---------|------|------|
| 手動版本管理 | 0.5h | 高 | 低 | ❌ 僅臨時使用 |
| 自動版本號 | 2h | 低 | 中 | ⚠️ 中期方案 |
| Workbox | 8h | 低 | 高 | ✅ 長期推薦 |
| 更新通知 | 4h | 低 | 高 | ✅ 必須實作 |

---

## 決策記錄

### 2026-01-09 - 問題識別

**決策**: 優先修復 PWA 更新機制，再優化 Google Ads 整合

**理由**:
1. PWA 更新問題會阻止所有後續改進推送給用戶
2. 影響範圍廣（所有已安裝用戶）
3. 修復成本低、效益高

**下一步**:
1. 實施緊急修復（手動版本管理）
2. 規劃長期方案（Workbox 整合）
3. 持續監控 Google Ads 表現

---

**最後更新**: 2026-01-09
**待辦事項**: 開始 Phase 1 緊急修復
