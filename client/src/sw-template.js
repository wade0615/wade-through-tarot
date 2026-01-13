// 導入 Workbox 模組
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

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

self.addEventListener('install', () => {
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
