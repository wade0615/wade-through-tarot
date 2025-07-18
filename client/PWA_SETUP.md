# PWA 設定說明

這個專案已經配置了完整的 PWA 功能，包括：

## 已完成的設定

### 1. 核心檔案

- ✅ `public/manifest.json` - Web App Manifest
- ✅ `public/sw.js` - Service Worker
- ✅ `src/app/layout.tsx` - 更新了 metadata 和 viewport
- ✅ `src/components/PWAInstallPrompt.tsx` - 安裝提示元件
- ✅ `src/components/OfflineIndicator.tsx` - 離線指示器

### 2. 功能特色

- 📱 可安裝到主畫面
- 🔄 離線功能支援
- 📲 原生應用程式體驗
- 🔔 推送通知支援
- 💾 本地快取

## 需要準備的圖示檔案

請在 `public` 目錄下準備以下圖示檔案：

### 主要圖示

```
public/
├── icon-72x72.png     (72x72px)
├── icon-96x96.png     (96x96px)
├── icon-128x128.png   (128x128px)
├── icon-144x144.png   (144x144px)
├── icon-152x152.png   (152x152px)
├── icon-192x192.png   (192x192px)
├── icon-384x384.png   (384x384px)
├── icon-512x512.png   (512x512px)
├── apple-touch-icon.png (180x180px)
├── screenshot-wide.png  (1280x720px)
└── screenshot-narrow.png (750x1334px)
```

### 圖示設計建議

- 使用 PNG 格式
- 背景色建議使用 `#8b5cf6` (紫色主題)
- 確保在不同尺寸下都清晰可見
- 支援 maskable 圖示 (可適應不同形狀)

## 測試 PWA 功能

### 1. 開發環境

```bash
npm run dev
```

### 2. 生產環境測試

```bash
npm run build
npm run start
```

### 3. PWA 檢查清單

- [ ] 應用程式可以安裝
- [ ] 離線時仍可正常運作
- [ ] 圖示顯示正確
- [ ] 啟動畫面正常
- [ ] 主題色彩一致

## 瀏覽器支援

- ✅ Chrome/Edge (完整支援)
- ✅ Firefox (完整支援)
- ✅ Safari (部分支援)
- ✅ 行動瀏覽器 (完整支援)

## 除錯工具

1. Chrome DevTools > Application > Manifest
2. Chrome DevTools > Application > Service Workers
3. Lighthouse > PWA 審查

## 注意事項

- 開發環境中 PWA 功能會被停用
- 需要 HTTPS 才能正常運作
- 首次載入可能需要一些時間來快取資源
