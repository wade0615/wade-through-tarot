const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const cardsDir = path.join(__dirname, '../public/cards');
const files = fs.readdirSync(cardsDir).filter(f => f.endsWith('.jpeg'));

console.log(`🔄 開始轉換 ${files.length} 張圖片...`);
console.log('');

let converted = 0;
let totalInputSize = 0;
let totalOutputSize = 0;

async function convertImages() {
  for (const file of files) {
    const input = path.join(cardsDir, file);
    const output = path.join(cardsDir, file.replace('.jpeg', '.webp'));

    const inputStats = fs.statSync(input);
    const inputSize = inputStats.size;
    totalInputSize += inputSize;

    await sharp(input)
      .webp({ quality: 85, effort: 6 })
      .toFile(output);

    const outputStats = fs.statSync(output);
    const outputSize = outputStats.size;
    totalOutputSize += outputSize;

    const saved = inputSize - outputSize;
    const savedPercent = ((saved / inputSize) * 100).toFixed(1);

    converted++;
    console.log(`✅ ${file} → ${savedPercent}% 縮小 (${(inputSize/1024).toFixed(1)}KB → ${(outputSize/1024).toFixed(1)}KB)`);
  }

  const totalSavedMB = ((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2);
  const totalSavedPercent = (((totalInputSize - totalOutputSize) / totalInputSize) * 100).toFixed(1);

  console.log('');
  console.log(`🎉 完成！轉換 ${converted} 張圖片`);
  console.log(`📊 原始大小：${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 轉換後大小：${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 總共節省：${totalSavedMB} MB (${totalSavedPercent}%)`);
}

convertImages().catch(err => {
  console.error('❌ 轉換失敗:', err);
  process.exit(1);
});
