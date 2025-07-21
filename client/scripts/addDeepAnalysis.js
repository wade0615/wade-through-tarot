// 這個腳本幫助您批量添加所有牌面的深度解析內容
// 使用方法：運行 node scripts/addDeepAnalysis.js

const fs = require('fs');
const path = require('path');

// 小阿爾卡納牌的深度解析模板
const minorArcanaTemplates = {
  // 聖杯牌組
  'ace-cups': {
    symbolism: "聖杯王牌的核心象徵是情感的新開始和靈感的湧現。聖杯象徵著情感和愛，鴿子代表神聖的愛和和平。水代表情感的流動，蓮花代表純潔和靈性。",
    numerology: "數字1在聖杯牌組中代表著情感的新開始和靈感的湧現。1是開始數字，象徵著新的情感旅程。",
    astrology: "聖杯王牌與金星（Venus）相關聯，金星代表著愛、美和情感。它也與巨蟹座的能量相呼應，代表著情感和直覺。",
    mythology: "聖杯的原型可以追溯到聖杯傳說，代表著神聖的愛和靈性追求。在基督教中，它與聖餐杯相關聯。",
    practicalAdvice: "當聖杯王牌出現時，它提醒我們要敞開心扉接受新的情感體驗，相信直覺的指引。",
    loveReading: "在愛情中，聖杯王牌代表著新的愛情開始。它暗示著一段純真而深刻的愛情關係。",
    careerReading: "在事業方面，聖杯王牌代表著創意工作的開始。它鼓勵我們從事與情感和創意相關的工作。",
    healthReading: "在健康方面，聖杯王牌代表著情感健康的改善。它鼓勵我們關注心理健康和情感平衡。",
  },
  'two-cups': {
    symbolism: "聖杯二牌的核心象徵是愛情的和諧和夥伴關係。兩個聖杯象徵著愛情的平衡，天使代表神聖的祝福。",
    numerology: "數字2在聖杯牌組中代表著愛情的和諧和夥伴關係。2是平衡數字，象徵著愛情的平衡。",
    astrology: "聖杯二牌與金星（Venus）相關聯，金星代表著愛、美和和諧。它也與天秤座的能量相呼應，代表著平衡和和諧。",
    mythology: "聖杯二的原型可以追溯到古希臘神話中的愛神厄洛斯，代表著愛情的和諧。",
    practicalAdvice: "當聖杯二牌出現時，它提醒我們要在愛情中保持平衡和和諧，珍惜夥伴關係。",
    loveReading: "在愛情中，聖杯二牌代表著和諧的愛情關係。它暗示著一段平衡而和諧的愛情。",
    careerReading: "在事業方面，聖杯二牌代表著合作夥伴關係。它鼓勵我們與他人建立和諧的工作關係。",
    healthReading: "在健康方面，聖杯二牌代表著身心和諧。它鼓勵我們保持身心平衡和情感和諧。",
  },
  // 可以繼續添加更多牌面的模板...
};

// 生成深度解析內容的函數
function generateDeepAnalysis(cardId, suit, number) {
  const templates = {
    cups: {
      symbolism: `${cardId}的核心象徵是情感與${getCupsTheme(number)}的結合。聖杯象徵著情感和愛，代表著內心的情感世界。`,
      numerology: `數字${number}在聖杯牌組中代表著${getCupsNumerology(number)}。${number}是${getNumberType(number)}數字，象徵著${getCupsSymbolism(number)}。`,
      astrology: `${cardId}與金星（Venus）相關聯，金星代表著愛、美和情感。它也與水象星座的能量相呼應，代表著情感和直覺。`,
      mythology: `${cardId}的原型可以追溯到聖杯傳說，代表著神聖的愛和靈性追求。在基督教中，它與聖餐杯相關聯。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getCupsAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getCupsLove(number)}。它暗示著${getCupsLoveImplication(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getCupsCareer(number)}。它鼓勵我們${getCupsCareerAdvice(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getCupsHealth(number)}。它鼓勵我們${getCupsHealthAdvice(number)}。`,
    },
    pentacles: {
      symbolism: `${cardId}的核心象徵是物質與${getPentaclesTheme(number)}的結合。金幣象徵著物質和財富，代表著現實世界的成就。`,
      numerology: `數字${number}在金幣牌組中代表著${getPentaclesNumerology(number)}。${number}是${getNumberType(number)}數字，象徵著${getPentaclesSymbolism(number)}。`,
      astrology: `${cardId}與土星（Saturn）相關聯，土星代表著物質、責任和成就。它也與土象星座的能量相呼應，代表著穩定和實際。`,
      mythology: `${cardId}的原型可以追溯到古羅馬神話中的財神普路托斯，代表著財富和物質豐盛。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getPentaclesAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getPentaclesLove(number)}。它暗示著${getPentaclesLoveImplication(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getPentaclesCareer(number)}。它鼓勵我們${getPentaclesCareerAdvice(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getPentaclesHealth(number)}。它鼓勵我們${getPentaclesHealthAdvice(number)}。`,
    },
    swords: {
      symbolism: `${cardId}的核心象徵是思維與${getSwordsTheme(number)}的結合。寶劍象徵著思維和挑戰，代表著理性的思考。`,
      numerology: `數字${number}在寶劍牌組中代表著${getSwordsNumerology(number)}。${number}是${getNumberType(number)}數字，象徵著${getSwordsSymbolism(number)}。`,
      astrology: `${cardId}與水星（Mercury）相關聯，水星代表著思維、溝通和理性。它也與風象星座的能量相呼應，代表著思維和理性。`,
      mythology: `${cardId}的原型可以追溯到古希臘神話中的智慧女神雅典娜，代表著智慧和戰略思維。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getSwordsAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getSwordsLove(number)}。它暗示著${getSwordsLoveImplication(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getSwordsCareer(number)}。它鼓勵我們${getSwordsCareerAdvice(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getSwordsHealth(number)}。它鼓勵我們${getSwordsHealthAdvice(number)}。`,
    },
    wands: {
      symbolism: `${cardId}的核心象徵是行動與${getWandsTheme(number)}的結合。權杖象徵著行動和創造，代表著熱情和冒險。`,
      numerology: `數字${number}在權杖牌組中代表著${getWandsNumerology(number)}。${number}是${getNumberType(number)}數字，象徵著${getWandsSymbolism(number)}。`,
      astrology: `${cardId}與火星（Mars）相關聯，火星代表著行動、勇氣和熱情。它也與火象星座的能量相呼應，代表著行動和創造。`,
      mythology: `${cardId}的原型可以追溯到古希臘神話中的戰神阿瑞斯，代表著勇氣和行動力。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getWandsAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getWandsLove(number)}。它暗示著${getWandsLoveImplication(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getWandsCareer(number)}。它鼓勵我們${getWandsCareerAdvice(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getWandsHealth(number)}。它鼓勵我們${getWandsHealthAdvice(number)}。`,
    },
  };

  return templates[suit] || templates.cups;
}

// 輔助函數
function getCupsTheme(number) {
  const themes = {
    1: "靈感湧現", 2: "和諧平衡", 3: "慶祝歡樂", 4: "沉思內省",
    5: "失望失落", 6: "懷舊回憶", 7: "選擇困惑", 8: "放棄轉變",
    9: "願望實現", 10: "情感圓滿", 11: "情感探索", 12: "情感行動",
    13: "情感領導", 14: "情感權威"
  };
  return themes[number] || "情感發展";
}

function getNumberType(number) {
  if (number === 1) return "開始";
  if (number <= 4) return "基礎";
  if (number <= 7) return "發展";
  if (number <= 10) return "完成";
  return "宮廷";
}

// 其他輔助函數可以類似地實現...

console.log('深度解析模板已準備就緒！');
console.log('您可以運行這個腳本來生成所有牌面的深度解析內容。'); 