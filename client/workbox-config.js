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
  swSrc: 'src/sw-template.tmp.js',

  // 客戶端最大快取檔案大小（防止無限增長）
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB

  // 排除特定檔案不被預快取
  globIgnores: [
    '**/node_modules/**/*',
  ],
};
