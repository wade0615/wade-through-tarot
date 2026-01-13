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
console.log(`   Output: ${outputPath}`);
