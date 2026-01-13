// 導入 Workbox 模組
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// ===============================================
// 1. Workbox 預快取（自動注入）
// ===============================================

// 清理過時快取
cleanupOutdatedCaches();

// Workbox CLI 會在這裡注入預快取清單
// 格式: [{url: '/static/abc123.js', revision: 'abc123'}, ...]
precacheAndRoute([{"revision":"8ea4f719af3312a055caf09f34c89a77","url":"media/ba015fad6dcf6784-s.woff2"},{"revision":"7b7c0ef93df188a852344fc272fc096b","url":"media/9610d9e46709d722-s.woff2"},{"revision":"da83d5f06d825c5ae65b7cca706cb312","url":"media/93f479601ee12b01-s.p.woff2"},{"revision":"cc728f6c0adb04da0dfcb0fc436a8ae5","url":"media/8d697b304b401681-s.woff2"},{"revision":"a0761690ccf4441ace5cec893b82d4ab","url":"media/747892c23ea88013-s.woff2"},{"revision":"18bae71b1e1b2bb25321090a3b563103","url":"media/4cf2300e9c8272f7-s.p.woff2"},{"revision":"d7bef8fc256ce2b443b78ab8d99e262d","url":"css/e6caa97723e44495.css"},{"revision":"cb2fd872cf970122181ab8d3479ec2ab","url":"chunks/webpack-29ebadaebe2fcb3f.js"},{"revision":"846118c33b2c0e922d7b3a7676f81f6f","url":"chunks/polyfills-42372ed130431b0a.js"},{"revision":"4e6a2cb06a02af8d250176b3a1a84100","url":"chunks/main-app-7e8aadf2a14ac31b.js"},{"revision":"7ecfeff537354590fcf6c5ec00d2fd7a","url":"chunks/main-4bcb131f21cb5706.js"},{"revision":"06d51392d1ce010e6b7690419059fb32","url":"chunks/framework-f593a28cde54158e.js"},{"revision":"0d2ba83844b9044b7587e8bec1b83c41","url":"chunks/874-a41f90a2aa8a3513.js"},{"revision":"6af78360ef772a5f44077388172c0667","url":"chunks/766-708f158faafe868c.js"},{"revision":"2d8903d7ebdac73fd7ff3334097aa1f2","url":"chunks/684-e0592144f4bb2199.js"},{"revision":"6d42e7f9902a9f33e9cceed41588d1cf","url":"chunks/4bd1b696-09217a58725cf5d5.js"},{"revision":"5b8c67c0096b45d7f2da349d4416fb7b","url":"chunks/45-f7b3f29514a6ad7e.js"},{"revision":"54307c2c0d4c92c90c00120cc48b0460","url":"chunks/277-2edf8f8bb72498ce.js"},{"revision":"57aeffd05ef3dcafb30819d2e22864de","url":"chunks/253-36e1c7f5415c931e.js"},{"revision":"4a9e98c17e03d8c6b1a65ba25d9be103","url":"chunks/pages/_error-cc3f077a18ea1793.js"},{"revision":"8fff4495d3ab349651f39d843a48f138","url":"chunks/pages/_app-da15c11dea942c36.js"},{"revision":"fcacd0ec58c78df3b9b5251b34604647","url":"chunks/app/page-9edc66d7e22279c0.js"},{"revision":"c3f731094f5de3629e7d474d79568824","url":"chunks/app/not-found-2c90fd8f6ec14c2f.js"},{"revision":"835fb7df66bdf68ba898c794a7293ec9","url":"chunks/app/layout-68f871bd51fbf8ec.js"},{"revision":"7a0c7b568687770dd92f88bf06163d9b","url":"chunks/app/global-error-e9cb64a562717c5e.js"},{"revision":"4472a55a38a3a7b14768aafddea76e70","url":"chunks/app/error-9f149da1158ad5fb.js"},{"revision":"b1eff38f33262e6e50965541d6a9c7f2","url":"chunks/app/sitemap.xml/route-cc475aedaf38be7c.js"},{"revision":"b1eff38f33262e6e50965541d6a9c7f2","url":"chunks/app/robots.txt/route-f12ccde7c651d36f.js"},{"revision":"6abf6f2abbeb7965697863d4544b8c2d","url":"chunks/app/learn/page-79f875dfc21e3072.js"},{"revision":"b1eff38f33262e6e50965541d6a9c7f2","url":"chunks/app/learn/layout-c71b3f7bb85f93b2.js"},{"revision":"fe1655354a0b8e07a33fa03f1e19bd48","url":"chunks/app/info/page-9039b2fbe66520bb.js"},{"revision":"b1eff38f33262e6e50965541d6a9c7f2","url":"chunks/app/info/layout-bdc6d1cdb0d6921a.js"},{"revision":"df44566bca03f8a816fd5ad0123cdb9d","url":"chunks/app/history/page-4df0602923af8d59.js"},{"revision":"b1eff38f33262e6e50965541d6a9c7f2","url":"chunks/app/history/layout-4320374e0174259d.js"},{"revision":"cb9542a4b861f47b18dc60608eb7a55f","url":"chunks/app/cards/page-56cd1e868a6b1585.js"},{"revision":"b1eff38f33262e6e50965541d6a9c7f2","url":"chunks/app/cards/layout-7b676a3eb95b4fcd.js"},{"revision":"3d7ff3f76d62947e2dabf8cdc447f36e","url":"chunks/app/cards/[id]/page-fa915413baa5b6ee.js"},{"revision":"b1eff38f33262e6e50965541d6a9c7f2","url":"chunks/app/_not-found/page-106eae25dbd22f98.js"},{"revision":"20e59733229fdfe900b2fcab61a7e202","url":"Tdv2LvAjSkP3EgZVZoYwP/_ssgManifest.js"},{"revision":"ababcf769c14f2fdb32d6cda480c76d5","url":"Tdv2LvAjSkP3EgZVZoYwP/_buildManifest.js"}] || []);

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

const SW_VERSION = '2026-01-12T14-31-41-377Z'; // 將在構建時被替換
console.log(`[SW] Version: ${SW_VERSION}`);
