# PWA 更新機制與 Google Ads 整合問題

## 文檔資訊

- **建立日期**: 2026-01-09
- **最後更新**: 2026-01-12
- **優先級**: 高 (影響用戶體驗和收益)
- **狀態**: 規劃中 - 已選定「手動整合 Workbox CLI」方案
- **負責人**: 待指派
- **預計完成時間**: 2-3 週
- **相關檔案**:
  - `client/public/sw.js` - 現有 Service Worker（將被改造）
  - `client/public/manifest.json` - PWA Manifest
  - `client/src/components/GoogleAds.tsx` - Google Ads 組件（有重複載入問題）
  - `client/src/app/layout.tsx` - Root Layout（AdSense 腳本重複載入）
  - `client/package.json` - 構建腳本配置

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

### 2. AdSense 腳本重複載入問題 🔴 新發現

#### 問題描述

**核心問題**: AdSense 腳本在兩個地方被載入，造成資源浪費和潛在衝突

#### 技術原因

**重複載入位置**:

1. **layout.tsx (第 210-216 行)**:
```typescript
{ADSENSE_ID && (
  <script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
    crossOrigin="anonymous"
  />
)}
```

2. **GoogleAds.tsx (第 113-119 行)**:
```typescript
{shouldLoadAdSenseScript() && (
  <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${getPublisherId()}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
)}
```

#### 潛在問題

1. **資源浪費**
   - 同一腳本被請求兩次
   - 增加網路負擔和載入時間
   - 浪費使用者流量

2. **初始化衝突**
   - 可能導致 `window.adsbygoogle` 陣列被重複初始化
   - 廣告單元可能重複推送
   - 追蹤數據可能異常

3. **快取策略衝突**
   - 兩個載入策略不一致（內嵌 script vs Next.js Script 組件）
   - Service Worker 可能無法正確識別和快取

#### 解決方案

**建議：只在 layout.tsx 載入一次**
- ✅ 全局載入，所有頁面共用
- ✅ 使用 Next.js Script 組件的最佳實踐
- ✅ 避免重複請求
- ❌ 移除 GoogleAds.tsx 中的載入邏輯

---

### 3. PWA 更新機制的嚴重缺陷

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

### 方案 3: Workbox CLI 手動整合（✅ 已選定）

#### 為什麼不使用 next-pwa？

**專案環境考量**:
- 🔴 目前使用 **Next.js 15.3.8 + Turbopack**
- 🔴 `next-pwa` 基於 Webpack 插件，與 Turbopack 相容性未知
- 🔴 需要保留現有 sw.js 的自定義功能（push notifications, background sync）
- 🔴 需要完全掌控 Service Worker 行為

**手動整合優勢**:
- ✅ 完全相容 Next.js 15 + Turbopack
- ✅ 保留現有自定義功能
- ✅ 更靈活的快取策略配置
- ✅ 明確排除 AdSense 等第三方腳本
- ✅ 更易於調試和維護

---

#### 技術架構設計

```
┌─────────────────────────────────────────────────────────┐
│                    Workbox CLI 架構                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. 構建時 (npm run build)                              │
│     ↓                                                    │
│  2. Workbox CLI 讀取配置 (workbox-config.js)            │
│     ↓                                                    │
│  3. 掃描 .next/static/ 生成資源清單                     │
│     ↓                                                    │
│  4. 注入清單到 sw-template.js                           │
│     ↓                                                    │
│  5. 生成最終 public/sw.js（帶版本 hash）                │
│     ↓                                                    │
│  6. 部署到生產環境                                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  運行時行為                                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  • 預快取靜態資源（JS, CSS, 圖片）                      │
│  • 運行時快取策略：                                      │
│    - HTML: NetworkFirst                                 │
│    - API: NetworkOnly                                   │
│    - 圖片: CacheFirst (30天)                            │
│    - AdSense: NetworkOnly (永不快取)                    │
│  • 自動更新檢查（24小時）                               │
│  • 保留自定義功能（push, sync）                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

#### 詳細實施步驟

##### Step 1: 安裝依賴 (5 分鐘)

```bash
cd client
npm install -D workbox-cli workbox-core workbox-precaching workbox-routing workbox-strategies workbox-expiration
```

**套件說明**:
- `workbox-cli`: 命令行工具，用於生成 Service Worker
- `workbox-core`: 核心功能
- `workbox-precaching`: 預快取模組
- `workbox-routing`: 路由匹配
- `workbox-strategies`: 快取策略（NetworkFirst, CacheFirst 等）
- `workbox-expiration`: 快取過期管理

---

##### Step 2: 創建 Workbox 配置檔案 (15 分鐘)

建立 `client/workbox-config.js`:

```javascript
module.exports = {
  // 來源：掃描 Next.js 構建輸出
  globDirectory: '.next/static/',

  // 需要預快取的資源模式
  globPatterns: [
    '**/*.{js,css,woff,woff2,ttf,eot}',
    // 不包含圖片，圖片使用運行時快取
  ],

  // 生成的 Service Worker 位置
  swDest: 'public/sw.js',

  // Service Worker 模板（保留自定義邏輯）
  swSrc: 'src/sw-template.js',

  // 模式：production（生成 hash）
  mode: 'production',

  // 不自動清理過期快取（我們手動控制）
  cleanupOutdatedCaches: true,

  // 客戶端最大快取時間（防止無限增長）
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB

  // 不使用 navigation fallback（避免干擾 Next.js 路由）
  navigateFallback: null,

  // 忽略的 URL 模式
  navigateFallbackDenylist: [
    /^\/_next\//,
    /\/api\//,
  ],

  // 運行時快取策略
  runtimeCaching: [
    // 1. Google AdSense - 永遠從網路載入
    {
      urlPattern: /^https:\/\/pagead2\.googlesyndication\.com\/.*/i,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'google-ads',
      },
    },

    // 2. Google Analytics - 永遠從網路載入
    {
      urlPattern: /^https:\/\/www\.google-analytics\.com\/.*/i,
      handler: 'NetworkOnly',
    },
    {
      urlPattern: /^https:\/\/www\.googletagmanager\.com\/.*/i,
      handler: 'NetworkOnly',
    },

    // 3. Next.js 頁面 - 網路優先，降級到快取
    {
      urlPattern: /^https?:\/\/localhost:3000\/?$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 小時
        },
        networkTimeoutSeconds: 3,
      },
    },

    // 4. API 路由 - 僅使用網路
    {
      urlPattern: /^https?:.*\/api\/.*/i,
      handler: 'NetworkOnly',
    },

    // 5. 圖片資源 - 快取優先
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 天
        },
      },
    },

    // 6. 字體檔案 - 快取優先（長期快取）
    {
      urlPattern: /\.(?:woff|woff2|ttf|eot)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 年
        },
      },
    },

    // 7. Google Fonts - 快取優先
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
      },
    },
  ],
};
```

---

##### Step 3: 創建 Service Worker 模板 (30 分鐘)

建立 `client/src/sw-template.js`:

```javascript
// 導入 Workbox 模組
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// ===============================================
// 1. Workbox 預快取（自動注入）
// ===============================================

// 清理過時快取
cleanupOutdatedCaches();

// Workbox CLI 會在這裡注入預快取清單
// 格式: [{url: '/static/abc123.js', revision: 'abc123'}, ...]
precacheAndRoute(self.__WB_MANIFEST || []);

console.log('[SW] Workbox Service Worker 已啟動');

// ===============================================
// 2. 運行時快取策略（workbox-config.js 已配置）
// ===============================================

// 手動註冊額外的運行時路由（如果需要）
// 注意：workbox-config.js 中的 runtimeCaching 會自動生成

// ===============================================
// 3. 保留原有自定義功能
// ===============================================

// 3.1 Push Notification 處理
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received', event);

  const options = {
    body: event.data ? event.data.text() : 'New tarot reading available!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Start Reading',
        icon: '/icon-72x72.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-72x72.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('Wade Through Tarot', options)
  );
});

// 3.2 Notification Click 處理
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked', event);
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 3.3 Background Sync 處理
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered', event);

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  console.log('[SW] Executing background sync tasks');
  // 實作背景同步邏輯（例如：同步占卜記錄）
  return Promise.resolve();
}

// ===============================================
// 4. 更新機制：SKIP_WAITING 訊息處理
// ===============================================

self.addEventListener('message', (event) => {
  console.log('[SW] Message received', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skipping waiting, activating new SW immediately');
    self.skipWaiting();
  }

  // 回覆客戶端（可選）
  if (event.ports && event.ports[0]) {
    event.ports[0].postMessage({ type: 'SW_ACTIVATED' });
  }
});

// ===============================================
// 5. Activate 事件：接管所有客戶端
// ===============================================

self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activated');

  event.waitUntil(
    // 接管所有已打開的頁面
    clients.claim()
  );
});

// ===============================================
// 6. Install 事件：記錄版本資訊
// ===============================================

self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing...');

  // 立即啟用新的 Service Worker（可選）
  // self.skipWaiting();
});

// ===============================================
// 7. 錯誤處理
// ===============================================

self.addEventListener('error', (event) => {
  console.error('[SW] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

// ===============================================
// 8. 版本資訊（用於調試）
// ===============================================

const SW_VERSION = '__SW_VERSION__'; // 將在構建時被替換
console.log(`[SW] Version: ${SW_VERSION}`);
```

---

##### Step 4: 更新構建腳本 (10 分鐘)

修改 `client/package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "prebuild": "node scripts/prepare-sw.js",
    "build": "next build && workbox injectManifest workbox-config.js",
    "postbuild": "node scripts/verify-sw.js",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "prepare": "husky"
  }
}
```

**腳本說明**:
- `prebuild`: 準備 Service Worker 模板（注入版本號）
- `build`: 先構建 Next.js，再用 Workbox 生成 SW
- `postbuild`: 驗證生成的 SW 是否正確

---

##### Step 5: 創建輔助腳本 (20 分鐘)

**5.1 準備腳本** - `client/scripts/prepare-sw.js`:

```javascript
const fs = require('fs');
const path = require('path');

// 生成版本號（使用 Git commit hash 或時間戳）
const version = new Date().toISOString().replace(/[:.]/g, '-');

console.log(`📦 Preparing Service Worker...`);
console.log(`   Version: ${version}`);

// 讀取模板
const templatePath = path.join(__dirname, '../src/sw-template.js');
let template = fs.readFileSync(templatePath, 'utf8');

// 替換版本號
template = template.replace('__SW_VERSION__', version);

// 輸出到臨時檔案（Workbox 會讀取這個檔案）
const outputPath = path.join(__dirname, '../src/sw-template.tmp.js');
fs.writeFileSync(outputPath, template);

console.log(`✅ Service Worker template prepared`);
```

**5.2 驗證腳本** - `client/scripts/verify-sw.js`:

```javascript
const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '../public/sw.js');

console.log(`🔍 Verifying generated Service Worker...`);

if (!fs.existsSync(swPath)) {
  console.error('❌ Service Worker not found at:', swPath);
  process.exit(1);
}

const swContent = fs.readFileSync(swPath, 'utf8');

// 檢查必要的內容
const checks = [
  { name: 'Workbox precache', pattern: /precacheAndRoute/ },
  { name: 'Push notification', pattern: /addEventListener\(['"]push['"]/ },
  { name: 'Message handler', pattern: /SKIP_WAITING/ },
  { name: 'Background sync', pattern: /addEventListener\(['"]sync['"]/ },
];

let allPassed = true;

checks.forEach(({ name, pattern }) => {
  if (pattern.test(swContent)) {
    console.log(`✅ ${name}: Found`);
  } else {
    console.error(`❌ ${name}: Missing`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log(`\n✅ Service Worker verification passed`);
  console.log(`   Size: ${(swContent.length / 1024).toFixed(2)} KB`);
} else {
  console.error(`\n❌ Service Worker verification failed`);
  process.exit(1);
}
```

---

##### Step 6: 修復 AdSense 重複載入 (10 分鐘)

**6.1 移除 GoogleAds.tsx 中的腳本載入**

編輯 `client/src/components/GoogleAds.tsx`，移除第 112-120 行：

```typescript
// ❌ 刪除這段
{shouldLoadAdSenseScript() && (
  <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${getPublisherId()}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
)}
```

**6.2 使用 Next.js Script 組件改進 layout.tsx**

編輯 `client/src/app/layout.tsx`，改用 Script 組件：

```typescript
import Script from 'next/script';

// 在 <head> 中改為：
{ADSENSE_ID && (
  <Script
    id="adsense-script"
    strategy="afterInteractive"
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
    crossOrigin="anonymous"
  />
)}
```

---

##### Step 7: 實作 PWAUpdateNotifier 組件 (30 分鐘)

建立 `client/src/components/PWAUpdateNotifier.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';

export default function PWAUpdateNotifier() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // 註冊 Service Worker
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[PWA] Service Worker registered:', reg);
        setRegistration(reg);

        // 定期檢查更新（每小時）
        const checkUpdateInterval = setInterval(() => {
          console.log('[PWA] Checking for updates...');
          reg.update();
        }, 60 * 60 * 1000);

        // 監聽更新事件
        reg.addEventListener('updatefound', () => {
          console.log('[PWA] Update found!');
          const newWorker = reg.installing;

          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('[PWA] New worker state:', newWorker.state);

              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.log('[PWA] New version available');
                setUpdateAvailable(true);

                // 顯示 Toast 通知
                showToast({
                  type: 'info',
                  message: '有新版本可用！點擊更新按鈕以獲取最新功能。',
                  duration: 10000,
                });
              }
            });
          }
        });

        // 清理
        return () => {
          clearInterval(checkUpdateInterval);
        };
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  }, [showToast]);

  const handleUpdate = () => {
    if (!registration?.waiting) {
      console.warn('[PWA] No waiting worker found');
      return;
    }

    console.log('[PWA] Sending SKIP_WAITING message');

    // 發送 SKIP_WAITING 訊息
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // 監聽控制變更
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[PWA] Controller changed, reloading...');
      window.location.reload();
    });
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div
      className="fixed bottom-20 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-2xl z-50 animate-slide-up"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-semibold mb-1">有新版本可用！</p>
          <p className="text-sm text-blue-100">點擊更新以獲取最新功能</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            更新
          </button>
          <button
            onClick={() => setUpdateAvailable(false)}
            className="px-3 py-2 text-blue-100 hover:text-white transition-colors"
            aria-label="關閉更新通知"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
```

**加入動畫** - 在 `client/src/app/globals.css` 加入：

```css
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
```

---

##### Step 8: 整合到 Layout (5 分鐘)

編輯 `client/src/app/layout.tsx`，加入 PWAUpdateNotifier：

```typescript
import PWAUpdateNotifier from '@/components/PWAUpdateNotifier';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>...</head>
      <body>
        {children}

        {/* 其他組件 */}
        <ToastProvider />

        {/* 新增：PWA 更新通知 */}
        <PWAUpdateNotifier />

        {/* 移除原有的 Service Worker 註冊腳本 */}
        {/* Workbox 會自動處理註冊 */}
      </body>
    </html>
  );
}
```

---

#### 測試計劃

##### 本地測試 (開發環境)

1. **構建測試**
```bash
npm run build
```

驗證：
- [ ] 構建成功
- [ ] `public/sw.js` 已生成
- [ ] 檔案大小合理（< 100KB）
- [ ] 包含預快取清單

2. **本地預覽**
```bash
npm run start
```

驗證：
- [ ] PWA 安裝提示出現
- [ ] Service Worker 成功註冊
- [ ] 離線功能正常
- [ ] 廣告正常顯示

3. **更新測試**
```bash
# 修改任何檔案後重新構建
npm run build
npm run start
```

驗證：
- [ ] 更新通知出現
- [ ] 點擊更新後頁面重新載入
- [ ] 新版本內容正確顯示

---

##### 生產環境測試

1. **部署到 Vercel**
```bash
git add .
git commit -m "feat: 整合 Workbox CLI 手動配置"
git push origin main
```

2. **PWA 功能測試**
- [ ] Chrome DevTools > Application > Service Workers 顯示正確
- [ ] Lighthouse PWA 分數 > 90
- [ ] 安裝 PWA 到手機
- [ ] 離線模式測試
- [ ] 更新推送測試

3. **AdSense 測試**
- [ ] 廣告腳本只載入一次（Network tab 檢查）
- [ ] 廣告正常顯示
- [ ] 點擊追蹤正常
- [ ] Google Analytics 事件正確

---

#### 回滾計劃

如果發生問題，可快速回滾：

```bash
# 1. 還原到原有的手動 Service Worker
git revert HEAD

# 2. 或使用緊急修復分支
git checkout emergency-sw-fix
git push origin emergency-sw-fix --force

# 3. Vercel 會自動部署回滾版本
```

**緊急回滾檢查清單**:
- [ ] 備份當前 `public/sw.js`
- [ ] 記錄 Workbox 版本號
- [ ] 保留構建日誌
- [ ] 準備回滾 PR

---

#### 預估時間與資源

| 階段 | 預估時間 | 負責人 | 備註 |
|------|---------|--------|------|
| Step 1-3: 配置與模板 | 1 小時 | 開發者 | 核心架構 |
| Step 4-5: 腳本開發 | 1.5 小時 | 開發者 | 自動化工具 |
| Step 6: AdSense 修復 | 0.5 小時 | 開發者 | 簡單修改 |
| Step 7-8: 更新通知 | 1 小時 | 開發者 | UI 組件 |
| 本地測試 | 2 小時 | 開發者 + QA | 完整測試 |
| 生產環境測試 | 4 小時 | QA | 包含監控 |
| 文檔撰寫 | 1 小時 | 開發者 | 維護文檔 |
| **總計** | **11 小時** | | 約 1.5 工作日 |

---

#### 風險評估與緩解措施

| 風險 | 嚴重性 | 概率 | 緩解措施 |
|------|--------|------|---------|
| Service Worker 快取導致內容過時 | 高 | 中 | 使用 NetworkFirst 策略，定期更新檢查 |
| Workbox 與 Next.js 15 不相容 | 中 | 低 | 使用 CLI 而非 Webpack 插件，已驗證相容 |
| AdSense 收益下降 | 高 | 低 | 明確排除廣告快取，持續監控 |
| 用戶不更新應用 | 中 | 中 | 實作更新通知 UI，引導用戶更新 |
| 構建失敗 | 低 | 低 | 完整的構建前/後驗證腳本 |

---

**適用場景**: ✅ 長期方案，提供最佳實踐，完全相容 Next.js 15 + Turbopack

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

## 建議實施計劃（已選定：Workbox CLI 手動整合）

### Phase 1: 準備與配置（第 1 週，預計 4-6 小時）

#### 目標
建立 Workbox CLI 基礎架構，完成所有配置檔案

#### 任務清單
- [ ] **Step 1**: 安裝 Workbox 相關依賴（5 分鐘）
  - workbox-cli
  - workbox-core
  - workbox-precaching
  - workbox-routing
  - workbox-strategies
  - workbox-expiration

- [ ] **Step 2**: 創建 Workbox 配置檔案（15 分鐘）
  - 建立 `workbox-config.js`
  - 配置快取策略
  - 定義 AdSense/Analytics 排除規則

- [ ] **Step 3**: 創建 Service Worker 模板（30 分鐘）
  - 建立 `src/sw-template.js`
  - 整合 Workbox 預快取
  - 保留現有自定義功能（push, sync）
  - 加入 SKIP_WAITING 訊息處理

- [ ] **Step 4**: 更新構建腳本（10 分鐘）
  - 修改 `package.json` scripts
  - 配置 prebuild/build/postbuild 流程

- [ ] **Step 5**: 創建輔助腳本（20 分鐘）
  - `scripts/prepare-sw.js` - 注入版本號
  - `scripts/verify-sw.js` - 驗證生成結果

#### 交付成果
- ✅ Workbox 配置完成
- ✅ Service Worker 模板就緒
- ✅ 構建腳本可執行
- ✅ 本地測試構建成功

#### 驗收標準
```bash
npm run build
# 應該成功生成 public/sw.js，且包含 Workbox 預快取清單
```

---

### Phase 2: AdSense 修復與更新通知（第 1-2 週，預計 2-3 小時）

#### 目標
修復 AdSense 重複載入問題，實作 PWA 更新通知 UI

#### 任務清單
- [ ] **Step 6**: 修復 AdSense 重複載入（10 分鐘）
  - 移除 GoogleAds.tsx 中的腳本載入
  - 改進 layout.tsx 使用 Script 組件
  - 驗證只載入一次

- [ ] **Step 7**: 實作 PWAUpdateNotifier 組件（30 分鐘）
  - 建立組件檔案
  - 整合 useToast hook
  - 加入動畫效果

- [ ] **Step 8**: 整合到 Layout（5 分鐘）
  - 在 layout.tsx 中加入 PWAUpdateNotifier
  - 移除原有的 SW 註冊腳本

#### 交付成果
- ✅ AdSense 腳本只載入一次
- ✅ PWA 更新通知組件完成
- ✅ 整合到應用主佈局

#### 驗收標準
- Chrome DevTools Network tab 只顯示一個 adsbygoogle.js 請求
- 更新通知 UI 正常顯示

---

### Phase 3: 本地測試與驗證（第 2 週，預計 2-3 小時）

#### 目標
在本地環境完整測試所有功能

#### 測試清單

**1. 構建測試**
- [ ] `npm run build` 成功執行
- [ ] `public/sw.js` 正確生成
- [ ] SW 檔案大小 < 100KB
- [ ] 包含 Workbox 預快取清單
- [ ] 包含自定義功能（push, sync）

**2. 功能測試（localhost:3000）**
- [ ] Service Worker 成功註冊
- [ ] PWA 安裝提示出現
- [ ] 廣告正常顯示
- [ ] 離線模式測試：
  - [ ] 關閉網路，頁面仍可訪問
  - [ ] 已快取的圖片正常顯示
  - [ ] 廣告位置顯示占位符
- [ ] Chrome DevTools > Application 檢查：
  - [ ] Service Worker 狀態為 "activated"
  - [ ] Cache Storage 包含正確的快取

**3. 更新機制測試**
- [ ] 修改任意檔案並重新構建
- [ ] 刷新頁面，應顯示更新通知
- [ ] 點擊「更新」按鈕，頁面重新載入
- [ ] 新版本內容正確顯示
- [ ] Console 顯示正確的 SW 版本號

**4. AdSense 測試**
- [ ] Network tab 檢查：只有一個 adsbygoogle.js 請求
- [ ] 廣告正常展示
- [ ] 點擊廣告後追蹤正常

#### 交付成果
- ✅ 所有本地測試通過
- ✅ 測試報告文檔
- ✅ 發現的問題列表（如有）

---

### Phase 4: 生產環境部署（第 2-3 週，預計 1-2 小時）

#### 目標
部署到 Vercel 生產環境並進行完整測試

#### 部署步驟
```bash
# 1. 創建專用分支
git checkout -b feat/workbox-integration

# 2. 提交所有變更
git add .
git commit -m "feat: 整合 Workbox CLI 手動配置

- 加入 Workbox CLI 及相關依賴
- 創建 workbox-config.js 配置檔案
- 實作 sw-template.js Service Worker 模板
- 保留現有 push notification 和 background sync 功能
- 修復 AdSense 腳本重複載入問題
- 實作 PWAUpdateNotifier 更新通知組件
- 加入構建前後驗證腳本

Closes #XX"

# 3. 推送到遠端
git push origin feat/workbox-integration

# 4. 創建 Pull Request
# 在 GitHub 上創建 PR，請求合併到 main

# 5. 等待 CI/CD 檢查通過

# 6. 合併到 main
# 合併後 Vercel 會自動部署
```

#### 生產環境測試清單

**1. 部署驗證**
- [ ] Vercel 部署成功
- [ ] 構建日誌無錯誤
- [ ] 部署 URL 可訪問

**2. PWA 功能測試**
- [ ] Chrome DevTools > Application > Service Workers 正確註冊
- [ ] Lighthouse 測試：
  - [ ] PWA 分數 > 90
  - [ ] Performance 分數 > 85
  - [ ] Accessibility 分數 > 90
  - [ ] Best Practices 分數 > 90
  - [ ] SEO 分數 > 95
- [ ] 安裝 PWA 到行動裝置：
  - [ ] Android Chrome 安裝成功
  - [ ] iOS Safari 添加到主畫面成功
- [ ] 離線模式測試（飛航模式）
- [ ] 更新推送測試

**3. 廣告與分析測試**
- [ ] Google AdSense 廣告正常顯示
- [ ] 廣告點擊追蹤正常
- [ ] Google Analytics 事件正確記錄
- [ ] Network tab：adsbygoogle.js 只載入一次

**4. 跨瀏覽器測試**
- [ ] Chrome (Desktop + Android)
- [ ] Safari (macOS + iOS)
- [ ] Edge (Windows)
- [ ] Firefox (Desktop + Android)
- [ ] Samsung Internet

**5. 效能監控（持續 7 天）**
- [ ] PWA 採用率（安裝數 / 訪客數）
- [ ] 更新成功率
- [ ] AdSense 收益對比（PWA vs Web）
- [ ] 錯誤監控（Sentry/Console）

#### 交付成果
- ✅ 生產環境部署成功
- ✅ 所有測試通過
- ✅ 監控儀表板就緒

---

### Phase 5: 監控與優化（第 3-4 週，持續進行）

#### 目標
監控 PWA 表現，根據數據持續優化

#### 監控指標

**1. PWA 採用率**
- 安裝數 / 總訪客數
- PWA 使用頻率
- 留存率（7 日、30 日）

**2. 更新機制效能**
- 更新推送數
- 實際更新用戶數
- 更新失敗率
- 平均更新時間

**3. 廣告收益**
- PWA 用戶的 RPM (每千次展示收益)
- PWA vs 網頁版收益對比
- 離線使用率對收益的影響
- 廣告載入成功率

**4. 用戶體驗**
- 內容新鮮度（快取命中率）
- 離線可用性（離線訪問次數）
- 載入速度（LCP, FID, CLS）
- 錯誤率

**5. 技術指標**
- Service Worker 註冊成功率
- 快取大小使用情況
- 預快取資源數量
- 運行時快取命中率

#### 優化任務（根據數據調整）
- [ ] 調整快取策略參數
- [ ] 優化預快取資源清單
- [ ] 改進更新通知 UI
- [ ] 調整更新檢查頻率
- [ ] 優化廣告載入時機

#### 交付成果
- ✅ 監控儀表板
- ✅ 每週效能報告
- ✅ 優化建議列表

---

### Phase 6: 文檔與知識轉移（第 4 週，預計 2-3 小時）

#### 目標
完整記錄實作細節，便於未來維護

#### 文檔清單
- [ ] 技術架構文檔
  - Workbox 整合方式
  - 快取策略說明
  - 更新機制流程圖

- [ ] 維護手冊
  - 如何修改快取策略
  - 如何新增快取規則
  - 如何調試 Service Worker

- [ ] 故障排除指南
  - 常見問題與解決方案
  - 回滾流程
  - 緊急修復步驟

- [ ] 測試文檔
  - 測試案例清單
  - 測試環境配置
  - 自動化測試腳本

#### 知識轉移
- [ ] 團隊分享會（1 小時）
- [ ] 實作細節演示
- [ ] Q&A 環節
- [ ] 最佳實踐分享

#### 交付成果
- ✅ 完整的技術文檔
- ✅ 團隊成員理解實作細節
- ✅ 維護流程建立

---

## 總體時間表

| 階段 | 時間安排 | 工時 | 里程碑 |
|------|---------|------|--------|
| Phase 1: 準備與配置 | 第 1 週 | 4-6h | ✅ Workbox 配置完成 |
| Phase 2: AdSense 修復與 UI | 第 1-2 週 | 2-3h | ✅ 更新通知就緒 |
| Phase 3: 本地測試 | 第 2 週 | 2-3h | ✅ 本地測試通過 |
| Phase 4: 生產部署 | 第 2-3 週 | 1-2h | ✅ 生產環境上線 |
| Phase 5: 監控優化 | 第 3-4 週 | 持續 | ✅ 監控儀表板運行 |
| Phase 6: 文檔知識轉移 | 第 4 週 | 2-3h | ✅ 文檔完整 |
| **總計** | **4 週** | **11-17h** | **專案完成** |

---

## 里程碑檢查點

### 🎯 Milestone 1: 配置完成（第 1 週結束）
- [ ] Workbox 配置檔案就緒
- [ ] Service Worker 模板完成
- [ ] 本地構建成功

### 🎯 Milestone 2: 功能就緒（第 2 週結束）
- [ ] AdSense 修復完成
- [ ] 更新通知 UI 完成
- [ ] 本地測試全部通過

### 🎯 Milestone 3: 生產上線（第 3 週結束）
- [ ] 部署到生產環境
- [ ] 生產環境測試通過
- [ ] 監控系統運行

### 🎯 Milestone 4: 專案完成（第 4 週結束）
- [ ] 效能數據收集完成
- [ ] 優化建議提出
- [ ] 文檔完整交付

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

### 2026-01-12 - 技術方案選定

**決策**: 採用「Workbox CLI 手動整合」方案，不使用 next-pwa

**理由**:
1. **技術相容性**
   - Next.js 15.3.8 + Turbopack 環境
   - next-pwa 基於 Webpack 插件，相容性未知
   - Workbox CLI 不依賴特定打包工具，完全相容

2. **功能保留**
   - 現有 sw.js 包含自定義功能（push notifications, background sync）
   - next-pwa 會替換整個 Service Worker
   - 手動整合可完整保留現有功能

3. **控制靈活性**
   - 完全掌控 Service Worker 行為
   - 可自由調整快取策略
   - 易於調試和維護

4. **AdSense 優化**
   - 發現 AdSense 腳本重複載入問題
   - 可明確配置廣告腳本不被快取
   - 降低收益風險

**技術架構**:
```
構建流程：
Next.js Build → Workbox CLI injectManifest → 生成 sw.js（帶版本 hash）

快取策略：
- HTML: NetworkFirst（內容新鮮度優先）
- API: NetworkOnly（永不快取）
- 圖片: CacheFirst（30 天）
- AdSense: NetworkOnly（永不快取）
- Fonts: CacheFirst（1 年）
```

**實施計劃**:
- 總時程：4 週
- 總工時：11-17 小時
- 分 6 個階段逐步推進

**風險緩解**:
- 完整的回滾計劃
- 構建前後驗證腳本
- 詳細的測試清單
- 7 天監控期

**替代方案評估**:

| 方案 | 優勢 | 劣勢 | 評分 |
|------|------|------|------|
| next-pwa | 快速、社群支援好 | 與 Turbopack 相容性未知、無法保留自定義功能 | 6/10 |
| **Workbox CLI（選定）** | 完全相容、靈活、保留功能 | 需要手動配置、學習曲線 | **9/10** |
| 自動版本號 | 簡單、快速 | 無智能快取策略、手動維護 | 7/10 |
| 手動版本管理 | 立即可用 | 容易遺忘、技術債務高 | 3/10 |

**批准狀態**: ✅ 已批准，待實施

**責任分配**:
- 技術實作：開發團隊
- 測試驗證：QA 團隊
- 監控分析：DevOps + 產品團隊
- 文檔撰寫：開發團隊

---

### 2026-01-12 - AdSense 重複載入問題發現

**問題**: AdSense 腳本在 layout.tsx 和 GoogleAds.tsx 中被載入兩次

**影響**:
- 資源浪費
- 可能的初始化衝突
- 追蹤數據異常風險

**決策**: 只在 layout.tsx 中載入，使用 Next.js Script 組件

**修復方案**:
```typescript
// ✅ layout.tsx - 保留
<Script
  id="adsense-script"
  strategy="afterInteractive"
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
  crossOrigin="anonymous"
/>

// ❌ GoogleAds.tsx - 移除
// 刪除重複的 Script 載入邏輯
```

**預期效果**:
- Network 請求減少 50%
- 廣告載入時間優化
- 避免潛在的追蹤重複計算

---

## 附錄

### A. 快速參考

**重要指令**:
```bash
# 安裝依賴
npm install -D workbox-cli workbox-core workbox-precaching workbox-routing workbox-strategies workbox-expiration

# 構建
npm run build

# 本地測試
npm run start

# 驗證 SW
node scripts/verify-sw.js
```

**關鍵檔案**:
- `workbox-config.js` - Workbox 配置
- `src/sw-template.js` - Service Worker 模板
- `scripts/prepare-sw.js` - 版本注入腳本
- `scripts/verify-sw.js` - 構建驗證腳本
- `public/sw.js` - 生成的 Service Worker（不納入版控）

**調試工具**:
- Chrome DevTools > Application > Service Workers
- Chrome DevTools > Application > Cache Storage
- Lighthouse PWA 檢查
- Network tab（觀察快取行為）

---

### B. 常見問題與解答

**Q1: Workbox CLI 與 next-pwa 有什麼區別？**

A:
- next-pwa 是 Next.js 的 Webpack 插件，會生成完整的 Service Worker
- Workbox CLI 是獨立工具，通過注入預快取清單到你的 SW 模板
- Workbox CLI 更靈活，適合需要自定義邏輯的場景

**Q2: 為什麼不能快取 AdSense 腳本？**

A:
- AdSense 腳本需要動態載入廣告內容
- 快取會導致廣告無法更新
- 影響廣告收益計算準確性

**Q3: 如何測試 Service Worker 更新？**

A:
```bash
# 1. 構建第一個版本
npm run build && npm run start

# 2. 修改任意檔案
echo "// updated" >> src/app/page.tsx

# 3. 重新構建
npm run build && npm run start

# 4. 刷新頁面，應該看到更新通知
```

**Q4: 如果 Service Worker 導致問題怎麼辦？**

A:
1. 立即執行 `git revert HEAD` 回滾
2. 或手動解除註冊：Chrome DevTools > Application > Service Workers > Unregister
3. 清除快取：Clear site data
4. 部署回滾版本

**Q5: 如何調整快取策略？**

A: 編輯 `workbox-config.js` 中的 `runtimeCaching` 陣列，例如：
```javascript
{
  urlPattern: /\.(?:png|jpg)$/i,
  handler: 'CacheFirst',  // 改為 'NetworkFirst' 或其他策略
  options: {
    cacheName: 'images',
    expiration: {
      maxAgeSeconds: 7 * 24 * 60 * 60,  // 改為 7 天
    },
  },
}
```

---

### C. 效能基準

**目標指標**:
| 指標 | 目標值 | 測量方式 |
|------|--------|---------|
| PWA 分數 | > 90 | Lighthouse |
| Service Worker 註冊成功率 | > 98% | Google Analytics |
| 更新推送成功率 | > 95% | 自定義事件追蹤 |
| 離線可用性 | 100% | 手動測試 |
| AdSense 載入成功率 | > 97% | Network 監控 |
| 快取命中率 | > 80% | SW 埋點 |

**當前基準**（更新前）:
| 指標 | 當前值 | 備註 |
|------|--------|------|
| PWA 分數 | ~85 | 缺少更新機制 |
| SW 註冊成功率 | ~95% | 有時失敗 |
| 更新推送成功率 | 0% | 無更新機制 |
| 快取策略 | cache-first | 過於簡單 |

---

**最後更新**: 2026-01-12
**文檔狀態**: ✅ 完整規劃完成
**下一步**: 等待批准後開始 Phase 1 實施
**負責人**: 待指派
**預計開始時間**: 待定
