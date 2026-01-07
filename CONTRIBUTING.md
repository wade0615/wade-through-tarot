# 貢獻指南

感謝你對 Wade Through Tarot 專案的興趣！本文件將指導你如何參與專案開發。

## 目錄

- [開發環境設置](#開發環境設置)
- [程式碼風格](#程式碼風格)
- [開發流程](#開發流程)
- [提交規範](#提交規範)
- [測試](#測試)
- [Pull Request 流程](#pull-request-流程)

## 開發環境設置

### 系統需求

- Node.js >= 20.17.0
- npm >= 10.0.0
- Git

### 安裝步驟

1. Fork 並 clone 專案

```bash
git clone https://github.com/your-username/wade-through-tarot.git
cd wade-through-tarot/client
```

2. 安裝依賴

```bash
npm install
```

3. 啟動開發伺服器

```bash
npm run dev
```

4. 在瀏覽器中開啟 `http://localhost:3000`

### 可用的指令

```bash
# 開發模式（使用 Turbopack）
npm run dev

# 建置專案
npm run build

# 啟動生產模式
npm run start

# 執行 ESLint
npm run lint

# 執行單元測試
npm test

# 執行測試並顯示 UI
npm run test:ui

# 執行測試覆蓋率報告
npm run test:coverage

# 執行 E2E 測試
npm run test:e2e
```

## 程式碼風格

本專案使用以下工具來維護一致的程式碼風格：

### TypeScript

- **嚴格模式**：啟用 TypeScript strict mode
- **編譯器選項**：
  - `noUnusedLocals: true` - 禁止未使用的本地變數
  - `noUnusedParameters: true` - 禁止未使用的參數
  - `noImplicitReturns: true` - 函數必須明確返回值
  - `noFallthroughCasesInSwitch: true` - switch 語句需要 break

### ESLint

- 基於 Next.js 推薦配置
- 使用 `eslint-plugin-unused-imports` 自動移除未使用的 import
- 執行 `npm run lint` 檢查程式碼

### Prettier

- 自動格式化程式碼
- 配置檔案：`.prettierrc`
- 主要設定：
  - 使用雙引號
  - 使用分號
  - 行寬 80 字元
  - 2 空格縮排

## 開發流程

### Git Hooks

本專案使用 Husky 和 lint-staged 在 commit 前自動執行檢查：

- **pre-commit**：自動執行 ESLint 修復和 Prettier 格式化

### 分支策略

- `main`：生產環境分支
- `dev`：開發分支
- `feature/*`：新功能分支
- `fix/*`：錯誤修復分支

### 開發流程

1. 從 `dev` 分支建立新分支

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

2. 進行開發並定期 commit

```bash
git add .
git commit -m "feat: add new feature"
```

3. Push 到遠端倉庫

```bash
git push origin feature/your-feature-name
```

4. 建立 Pull Request 到 `dev` 分支

## 提交規範

使用 Conventional Commits 規範：

### 提交訊息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 類型

- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文件變更
- `style`: 程式碼格式（不影響功能）
- `refactor`: 重構（不是新功能也不是錯誤修復）
- `perf`: 效能改進
- `test`: 測試相關
- `chore`: 建置流程或輔助工具變更

### 範例

```bash
feat(tarot): add new card spread layout
fix(storage): prevent duplicate readings in history
docs(readme): update installation instructions
refactor(components): simplify card selection logic
test(store): add tests for tarotStore
```

## 測試

### 單元測試

- 使用 Vitest 作為測試框架
- 測試檔案位於 `src/__tests__/`
- 執行測試：`npm test`

### E2E 測試

- 使用 Playwright
- 測試檔案位於 `e2e/`
- 執行測試：`npm run test:e2e`

### 測試覆蓋率

- 目標：80% 以上
- 執行：`npm run test:coverage`
- 查看報告：`coverage/index.html`

### 撰寫測試

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTarotStore } from '@/store/tarotStore'

describe('useTarotStore', () => {
  it('should select a card', () => {
    const { result } = renderHook(() => useTarotStore())

    act(() => {
      result.current.selectCard(mockCard, 0, false)
    })

    expect(result.current.selectedCards).toHaveLength(1)
  })
})
```

## Pull Request 流程

### 提交前檢查清單

- [ ] 程式碼通過 `npm run lint`
- [ ] 程式碼通過 `npm run build`
- [ ] 所有測試通過 `npm test`
- [ ] 新功能有對應的測試
- [ ] 文件已更新（如需要）
- [ ] Commit 訊息符合規範

### PR 描述範本

```markdown
## 摘要
簡短描述這個 PR 的目的

## 變更內容
- 變更項目 1
- 變更項目 2

## 測試計劃
- [ ] 測試項目 1
- [ ] 測試項目 2

## 截圖（如適用）
[貼上截圖]

## 相關 Issue
Closes #123
```

### Code Review

- 至少需要 1 位 reviewer 批准
- 回應所有 review 意見
- 保持 PR 簡潔，專注於單一功能或修復

### 合併後

- 刪除功能分支
- 更新本地 `dev` 分支

```bash
git checkout dev
git pull origin dev
git branch -d feature/your-feature-name
```

## 問題回報

如果發現 bug 或有功能建議，請：

1. 檢查是否已有相關 Issue
2. 建立新 Issue 並提供：
   - 清楚的標題和描述
   - 重現步驟（如適用）
   - 預期行為 vs 實際行為
   - 環境資訊（瀏覽器、Node.js 版本等）
   - 截圖或錯誤訊息

## 聯絡方式

如有任何問題，歡迎：

- 建立 Issue
- 透過 Pull Request 提出改進建議

感謝你的貢獻！
