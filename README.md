# Wade Through Tarot - 塔羅牌占卜應用

一個現代化的塔羅牌占卜 Web 應用，提供直觀的塔羅牌閱讀體驗和完整的牌面圖鑑。

## 🎯 專案目的

這個專案旨在為用戶提供一個美觀、易用的塔羅牌占卜平台，讓用戶能夠：

- 進行不同類型的塔羅牌占卜（單張牌、三張牌、凱爾特十字）
- 瀏覽完整的塔羅牌圖鑑，了解每張牌的含義
- 獲得詳細的占卜結果解釋和建議
- 將占卜結果分享到 ChatGPT 進行進一步分析

## ✨ 主要功能

### 🔮 占卜功能

- **三種牌陣**：單張牌、三張牌（過去現在未來）、凱爾特十字（10 張牌）
- **直觀操作**：點擊選牌、翻牌動畫、結果展示
- **詳細解釋**：每張牌的正位/逆位含義、關鍵詞、整體建議
- **問題記錄**：可輸入個人問題，結果會包含問題分析

### 📚 塔羅牌圖鑑

- **完整牌面**：78 張塔羅牌全收錄
- **分類瀏覽**：按大阿爾克納、聖杯、金幣、寶劍、權杖分組
- **詳細信息**：點擊查看牌面描述、含義、關鍵詞
- **響應式設計**：適配各種設備尺寸

### 🔗 外部整合

- **複製功能**：一鍵複製占卜結果
- **ChatGPT 整合**：直接跳轉到 ChatGPT 進行深度分析
- **PWA 支持**：可安裝為桌面應用

## 🏗️ 專案結構

```
wade-through-tarot/
├── client/                          # Next.js 前端應用
│   ├── public/                      # 靜態資源
│   │   └── cards/                   # 塔羅牌圖片
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   │   ├── cards/               # 塔羅牌圖鑑頁面
│   │   │   ├── globals.css          # 全局樣式
│   │   │   ├── layout.tsx           # 根布局
│   │   │   └── page.tsx             # 首頁
│   │   ├── components/              # React 組件
│   │   │   ├── CardDeck.tsx         # 牌組組件
│   │   │   ├── CardModal.tsx        # 牌面詳情彈窗
│   │   │   ├── ReadingResult.tsx    # 占卜結果
│   │   │   ├── SelectionView.tsx    # 選牌界面
│   │   │   ├── SetupView.tsx        # 設置界面
│   │   │   ├── SpreadLayout.tsx     # 牌陣布局
│   │   │   └── TarotCard.tsx        # 單張牌組件
│   │   ├── data/
│   │   │   └── tarotCards.ts        # 塔羅牌數據
│   │   ├── store/
│   │   │   └── tarotStore.ts        # Zustand 狀態管理
│   │   └── utils/
│   │       └── helpers.ts           # 工具函數
│   ├── package.json                 # 依賴配置
│   └── tsconfig.json               # TypeScript 配置
└── README.md                       # 專案說明
```

## 🛠️ 使用技術

### 前端技術

- **Next.js 15** - React 全棧框架
- **TypeScript** - 類型安全的 JavaScript
- **Tailwind CSS** - 實用優先的 CSS 框架
- **Zustand** - 輕量級狀態管理
- **React Hooks** - 函數式組件狀態管理

### 開發工具

- **ESLint** - 代碼質量檢查
- **PostCSS** - CSS 後處理器
- **Next.js Image** - 圖片優化

### 部署與性能

- **PWA 支持** - 漸進式 Web 應用
- **響應式設計** - 適配各種設備
- **圖片優化** - 自動圖片壓縮和格式轉換

## 🚀 如何啟動

### 環境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安裝步驟

1. **克隆專案**

   ```bash
   git clone <repository-url>
   cd wade-through-tarot
   ```

2. **進入客戶端目錄**

   ```bash
   cd client
   ```

3. **安裝依賴**

   ```bash
   npm install
   # 或使用 yarn
   yarn install
   ```

4. **啟動開發服務器**

   ```bash
   npm run dev
   # 或使用 yarn
   yarn dev
   ```

5. **打開瀏覽器**
   訪問 `http://localhost:3000` 開始使用

### 構建生產版本

```bash
npm run build
npm start
```

## 📱 使用說明

### 開始占卜

1. 在首頁選擇牌陣類型（單張牌、三張牌、凱爾特十字）
2. 可選：輸入你想問的問題
3. 點擊"開始占卜"
4. 點擊牌組進行選牌
5. 查看詳細的占卜結果

### 瀏覽牌面圖鑑

1. 點擊首頁的"查看所有牌面"按鈕
2. 按分類瀏覽所有塔羅牌
3. 點擊任意牌面查看詳細信息
4. 使用右下角的返回按鈕回到首頁

### 分享結果

- 點擊"複製內容"複製占卜結果
- 點擊"前往 ChatGPT"在 ChatGPT 中進行深度分析

## 🎨 設計特色

- **深色主題**：神秘的紫色和藍色漸變背景
- **毛玻璃效果**：現代化的視覺設計
- **流暢動畫**：翻牌、選牌、懸停效果
- **響應式布局**：完美適配手機、平板、桌面

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request 來改進這個專案！

## 📄 授權

本專案採用 MIT 授權條款。

## 🙏 致謝

- 感謝所有塔羅牌圖片的創作者
- 感謝開源社區的貢獻
- 感謝 Next.js 和 Tailwind CSS 團隊

---

**讓直覺引導你找到答案** ✨
