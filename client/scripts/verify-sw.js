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
