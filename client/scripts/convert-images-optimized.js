const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const cardsDir = path.join(__dirname, '../public/cards');
const files = fs.readdirSync(cardsDir).filter(f => f.endsWith('.jpeg'));

console.log(`🔄 使用優化設定重新轉換 ${files.length} 張圖片...`);
console.log('設定：quality=75, effort=6');
console.log('');

let totalInputSize = 0;
let totalOutputSize = 0;

async function convertImages() {
  for (const file of files) {
    const input = path.join(cardsDir, file);
    const output = path.join(cardsDir, file.replace('.jpeg', '.webp'));

    const inputStats = fs.statSync(input);
    totalInputSize += inputStats.size;

    await sharp(input)
      .webp({ quality: 75, effort: 6 })
      .toFile(output);

    const outputStats = fs.statSync(output);
    totalOutputSize += outputStats.size;
  }

  const totalSavedMB = ((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2);
  const totalSavedPercent = (((totalInputSize - totalOutputSize) / totalInputSize) * 100).toFixed(1);

  console.log(`🎉 完成！`);
  console.log(`📊 原始大小：${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 轉換後大小：${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 節省：${totalSavedMB} MB (${totalSavedPercent}%)`);
}

convertImages().catch(err => {
  console.error('❌ 轉換失敗:', err);
  process.exit(1);
});
