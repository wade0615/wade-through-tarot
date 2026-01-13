const { injectManifest } = require('workbox-build');
const path = require('path');

// 載入 Workbox 配置
const config = require('../workbox-config');

console.log('🔨 Building Service Worker with Workbox...');

// 使用 injectManifest API
injectManifest(config)
  .then(({ count, size, warnings }) => {
    console.log(`✅ Service Worker generated successfully!`);
    console.log(`   Precached ${count} files, totaling ${(size / 1024).toFixed(2)} KB`);

    if (warnings.length > 0) {
      console.warn('⚠️  Warnings:');
      warnings.forEach((warning) => console.warn(`   - ${warning}`));
    }
  })
  .catch((error) => {
    console.error('❌ Service Worker build failed:', error);
    process.exit(1);
  });
