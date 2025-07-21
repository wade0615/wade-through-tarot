// 批量添加深度解析的腳本
// 使用方法：node scripts/batchAddDeepAnalysis.js

const fs = require('fs');
const path = require('path');

// 讀取 tarotCards.ts 文件
const filePath = path.join(__dirname, '../src/data/tarotCards.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 深度解析模板生成器
function generateDeepAnalysis(cardId, suit, number) {
  const templates = {
    major: {
      symbolism: `${cardId}的核心象徵是${getMajorTheme(number)}的結合。`,
      numerology: `數字${number}在塔羅牌中代表著${getMajorNumerology(number)}。`,
      astrology: `${cardId}與${getMajorAstrology(number)}相關聯，代表著${getMajorAstrologyMeaning(number)}。`,
      mythology: `${cardId}的原型可以追溯到${getMajorMythology(number)}，代表著${getMajorMythologyMeaning(number)}。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getMajorAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getMajorLove(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getMajorCareer(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getMajorHealth(number)}。`
    },
    cups: {
      symbolism: `${cardId}的核心象徵是情感與${getCupsTheme(number)}的結合。`,
      numerology: `數字${number}在聖杯牌組中代表著${getCupsNumerology(number)}。`,
      astrology: `${cardId}與金星（Venus）相關聯，代表著愛、美和情感。`,
      mythology: `${cardId}的原型可以追溯到聖杯傳說，代表著神聖的愛和靈性追求。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getCupsAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getCupsLove(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getCupsCareer(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getCupsHealth(number)}。`
    },
    pentacles: {
      symbolism: `${cardId}的核心象徵是物質與${getPentaclesTheme(number)}的結合。`,
      numerology: `數字${number}在金幣牌組中代表著${getPentaclesNumerology(number)}。`,
      astrology: `${cardId}與土星（Saturn）相關聯，代表著物質、責任和成就。`,
      mythology: `${cardId}的原型可以追溯到古羅馬神話中的財神普路托斯，代表著財富和物質豐盛。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getPentaclesAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getPentaclesLove(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getPentaclesCareer(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getPentaclesHealth(number)}。`
    },
    swords: {
      symbolism: `${cardId}的核心象徵是思維與${getSwordsTheme(number)}的結合。`,
      numerology: `數字${number}在寶劍牌組中代表著${getSwordsNumerology(number)}。`,
      astrology: `${cardId}與水星（Mercury）相關聯，代表著思維、溝通和理性。`,
      mythology: `${cardId}的原型可以追溯到古希臘神話中的智慧女神雅典娜，代表著智慧和戰略思維。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getSwordsAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getSwordsLove(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getSwordsCareer(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getSwordsHealth(number)}。`
    },
    wands: {
      symbolism: `${cardId}的核心象徵是行動與${getWandsTheme(number)}的結合。`,
      numerology: `數字${number}在權杖牌組中代表著${getWandsNumerology(number)}。`,
      astrology: `${cardId}與火星（Mars）相關聯，代表著行動、勇氣和熱情。`,
      mythology: `${cardId}的原型可以追溯到古希臘神話中的戰神阿瑞斯，代表著勇氣和行動力。`,
      practicalAdvice: `當${cardId}出現時，它提醒我們要${getWandsAdvice(number)}。`,
      loveReading: `在愛情中，${cardId}代表著${getWandsLove(number)}。`,
      careerReading: `在事業方面，${cardId}代表著${getWandsCareer(number)}。`,
      healthReading: `在健康方面，${cardId}代表著${getWandsHealth(number)}。`
    }
  };

  return templates[suit] || templates.cups;
}

// 大阿爾卡納牌的輔助函數
function getMajorTheme(number) {
  const themes = {
    12: "犧牲與奉獻", 13: "轉變與重生", 14: "平衡與節制", 15: "誘惑與束縛",
    16: "破壞與解放", 17: "希望與啟示", 18: "直覺與潛意識", 19: "活力與成功",
    20: "審判與重生", 21: "完成與圓滿"
  };
  return themes[number] || "精神發展";
}

function getMajorNumerology(number) {
  const numerologies = {
    12: "犧牲、奉獻和精神覺醒",
    13: "轉變、重生和新的開始",
    14: "平衡、節制和和諧",
    15: "誘惑、束縛和物質慾望",
    16: "破壞、解放和突然的改變",
    17: "希望、啟示和精神指引",
    18: "直覺、潛意識和神秘",
    19: "活力、成功和生命力量",
    20: "審判、重生和精神覺醒",
    21: "完成、圓滿和新的循環"
  };
  return numerologies[number] || "精神發展";
}

function getMajorAstrology(number) {
  const astrologies = {
    12: "海王星（Neptune）", 13: "冥王星（Pluto）", 14: "木星（Jupiter）",
    15: "土星（Saturn）", 16: "火星（Mars）", 17: "天王星（Uranus）",
    18: "月亮（Moon）", 19: "太陽（Sun）", 20: "冥王星（Pluto）",
    21: "土星（Saturn）"
  };
  return astrologies[number] || "太陽（Sun）";
}

function getMajorAstrologyMeaning(number) {
  const meanings = {
    12: "犧牲、奉獻和精神覺醒", 13: "轉變、重生和深度改變",
    14: "平衡、節制和智慧", 15: "誘惑、束縛和物質慾望",
    16: "破壞、解放和突然改變", 17: "希望、啟示和創新",
    18: "直覺、潛意識和神秘", 19: "活力、成功和生命力量",
    20: "審判、重生和精神覺醒", 21: "完成、圓滿和責任"
  };
  return meanings[number] || "精神發展";
}

function getMajorMythology(number) {
  const mythologies = {
    12: "古希臘神話中的奧德修斯", 13: "古埃及神話中的奧西里斯",
    14: "古希臘神話中的伊卡洛斯", 15: "古希臘神話中的潘",
    16: "古希臘神話中的宙斯", 17: "古希臘神話中的潘多拉",
    18: "古希臘神話中的赫卡忒", 19: "古希臘神話中的阿波羅",
    20: "古埃及神話中的阿努比斯", 21: "古希臘神話中的克羅諾斯"
  };
  return mythologies[number] || "古希臘神話";
}

function getMajorMythologyMeaning(number) {
  const meanings = {
    12: "犧牲和奉獻精神", 13: "死亡和重生", 14: "平衡和節制",
    15: "誘惑和慾望", 16: "破壞和重建", 17: "希望和啟示",
    18: "直覺和神秘", 19: "活力和成功", 20: "審判和重生",
    21: "完成和圓滿"
  };
  return meanings[number] || "精神發展";
}

function getMajorAdvice(number) {
  const advices = {
    12: "接受犧牲和奉獻，尋求精神覺醒",
    13: "接受轉變和重生，擁抱新的開始",
    14: "保持平衡和節制，尋求和諧",
    15: "避免誘惑和束縛，追求自由",
    16: "接受破壞和解放，迎接改變",
    17: "保持希望和信心，尋求啟示",
    18: "相信直覺和潛意識，探索神秘",
    19: "展現活力和自信，追求成功",
    20: "接受審判和重生，尋求覺醒",
    21: "完成使命和責任，開始新循環"
  };
  return advices[number] || "關注精神發展";
}

function getMajorLove(number) {
  const loves = {
    12: "犧牲和奉獻的愛", 13: "轉變和重生的愛", 14: "平衡和和諧的愛",
    15: "誘惑和束縛的愛", 16: "破壞和解放的愛", 17: "希望和啟示的愛",
    18: "直覺和神秘的愛", 19: "活力和成功的愛", 20: "審判和重生的愛",
    21: "完成和圓滿的愛"
  };
  return loves[number] || "精神發展的愛";
}

function getMajorCareer(number) {
  const careers = {
    12: "犧牲和奉獻的事業", 13: "轉變和重生的事業", 14: "平衡和節制的事業",
    15: "誘惑和束縛的事業", 16: "破壞和解放的事業", 17: "希望和啟示的事業",
    18: "直覺和神秘的事業", 19: "活力和成功的事業", 20: "審判和重生的事業",
    21: "完成和圓滿的事業"
  };
  return careers[number] || "精神發展的事業";
}

function getMajorHealth(number) {
  const healths = {
    12: "犧牲和奉獻的健康", 13: "轉變和重生的健康", 14: "平衡和節制的健康",
    15: "誘惑和束縛的健康", 16: "破壞和解放的健康", 17: "希望和啟示的健康",
    18: "直覺和神秘的健康", 19: "活力和成功的健康", 20: "審判和重生的健康",
    21: "完成和圓滿的健康"
  };
  return healths[number] || "精神發展的健康";
}

// 小阿爾卡納牌的輔助函數
function getCupsTheme(number) {
  const themes = {
    1: "靈感湧現", 2: "和諧平衡", 3: "慶祝歡樂", 4: "沉思內省",
    5: "失望失落", 6: "懷舊回憶", 7: "選擇困惑", 8: "放棄轉變",
    9: "願望實現", 10: "情感圓滿"
  };
  return themes[number] || "情感發展";
}

function getCupsNumerology(number) {
  const numerologies = {
    1: "情感的新開始和靈感的湧現",
    2: "愛情的和諧和夥伴關係的平衡",
    3: "友誼的慶祝和團體的和諧",
    4: "內省的沉思和情感的冷漠",
    5: "失望的悲傷和情感的失落",
    6: "懷舊的回憶和純真的友誼",
    7: "選擇的困惑和幻想的誘惑",
    8: "情感的轉變和內心的放棄",
    9: "願望的實現和情感的滿足",
    10: "情感的圓滿和家庭的幸福"
  };
  return numerologies[number] || "情感的發展";
}

function getCupsAdvice(number) {
  const advices = {
    1: "敞開心扉接受新的情感體驗，相信直覺的指引",
    2: "在愛情中保持平衡和和諧，珍惜夥伴關係",
    3: "珍惜友誼，享受團體的歡樂時光",
    4: "重新關注身邊的美好事物，不要錯過機會",
    5: "雖然會遇到失望，但也要記住還有希望存在",
    6: "珍惜美好的回憶，保持內心的純真",
    7: "要區分現實和幻想，做出正確的選擇",
    8: "接受情感的轉變，放下舊的情感包袱",
    9: "享受願望實現的喜悅，但不要過度放縱",
    10: "享受家庭的和諧，珍惜情感的圓滿"
  };
  return advices[number] || "關注情感發展";
}

function getCupsLove(number) {
  const loves = {
    1: "新的愛情開始", 2: "和諧的愛情關係", 3: "團體中的愛情",
    4: "需要重新關注愛情", 5: "愛情的失望和失落",
    6: "純真的愛情回憶", 7: "愛情的選擇和困惑",
    8: "愛情的轉變和放棄", 9: "愛情的願望實現",
    10: "愛情的圓滿和家庭幸福"
  };
  return loves[number] || "愛情的發展";
}

function getCupsCareer(number) {
  const careers = {
    1: "創意工作的開始", 2: "合作夥伴關係", 3: "團隊合作和慶祝成功",
    4: "需要重新關注事業機會", 5: "事業的失望和挫折",
    6: "懷念過去的工作時光", 7: "事業的選擇和困惑",
    8: "事業的轉變和放棄", 9: "事業願望的實現",
    10: "事業的圓滿和家庭平衡"
  };
  return careers[number] || "事業的發展";
}

function getCupsHealth(number) {
  const healths = {
    1: "情感健康的改善", 2: "身心和諧", 3: "社交健康和心理愉悅",
    4: "需要重新關注健康", 5: "情感健康的失落",
    6: "懷念過去的健康時光", 7: "健康選擇的困惑",
    8: "健康習慣的轉變", 9: "健康願望的實現",
    10: "身心健康的圓滿"
  };
  return healths[number] || "健康的發展";
}

// 其他牌組的輔助函數
function getPentaclesTheme(number) {
  const themes = {
    1: "財富機會", 2: "選擇智慧", 3: "技能發展", 4: "財富保護",
    5: "健康挑戰", 6: "慈善行為", 7: "長期投資", 8: "技能提升",
    9: "享受時光", 10: "家庭財富"
  };
  return themes[number] || "物質發展";
}

function getPentaclesNumerology(number) {
  return `物質的${getNumberType(number)}和財富的發展`;
}

function getPentaclesAdvice(number) {
  return "關注物質發展和財富管理";
}

function getPentaclesLove(number) {
  return "物質基礎的愛情";
}

function getPentaclesCareer(number) {
  return "物質成就的事業";
}

function getPentaclesHealth(number) {
  return "物質健康的身體";
}

function getSwordsTheme(number) {
  const themes = {
    1: "真理勝利", 2: "內心平靜", 3: "內心傷害", 4: "內心療癒",
    5: "內心混亂", 6: "內心平靜", 7: "內心困惑", 8: "內心束縛",
    9: "內心焦慮", 10: "內心轉化"
  };
  return themes[number] || "思維發展";
}

function getSwordsNumerology(number) {
  return `思維的${getNumberType(number)}和理性的發展`;
}

function getSwordsAdvice(number) {
  return "運用理性思維來解決問題";
}

function getSwordsLove(number) {
  return "理性思考的愛情";
}

function getSwordsCareer(number) {
  return "理性思維的事業";
}

function getSwordsHealth(number) {
  return "理性健康的心理";
}

function getWandsTheme(number) {
  const themes = {
    1: "創意湧現", 2: "未來規劃", 3: "團隊合作", 4: "家庭團聚",
    5: "競爭挑戰", 6: "成功慶祝", 7: "堅持毅力", 8: "消息傳遞",
    9: "防禦警覺", 10: "責任壓力"
  };
  return themes[number] || "行動發展";
}

function getWandsNumerology(number) {
  return `行動的${getNumberType(number)}和創意的發展`;
}

function getWandsAdvice(number) {
  return "運用行動力來實現目標";
}

function getWandsLove(number) {
  return "熱情行動的愛情";
}

function getWandsCareer(number) {
  return "熱情行動的事業";
}

function getWandsHealth(number) {
  return "活力健康的身體";
}

function getNumberType(number) {
  if (number === 1) return "開始";
  if (number <= 4) return "基礎";
  if (number <= 7) return "發展";
  if (number <= 10) return "完成";
  return "宮廷";
}

// 生成深度解析內容的函數
function generateDeepAnalysisContent(cardId, suit, number) {
  const template = generateDeepAnalysis(cardId, suit, number);
  
  return {
    symbolism: template.symbolism,
    numerology: template.numerology,
    astrology: template.astrology,
    mythology: template.mythology,
    practicalAdvice: template.practicalAdvice,
    loveReading: template.loveReading,
    careerReading: template.careerReading,
    healthReading: template.healthReading
  };
}

// 為所有沒有深度解析的牌添加內容
const cardsWithoutDeepAnalysis = [
  // 大阿爾卡納牌
  { id: "hanged-man", suit: "major", number: 12 },
  { id: "death", suit: "major", number: 13 },
  { id: "temperance", suit: "major", number: 14 },
  { id: "devil", suit: "major", number: 15 },
  { id: "tower", suit: "major", number: 16 },
  { id: "star", suit: "major", number: 17 },
  { id: "moon", suit: "major", number: 18 },
  { id: "sun", suit: "major", number: 19 },
  { id: "judgement", suit: "major", number: 20 },
  { id: "world", suit: "major", number: 21 },
  
  // 小阿爾卡納牌 - 聖杯
  { id: "five-cups", suit: "cups", number: 5 },
  { id: "six-cups", suit: "cups", number: 6 },
  { id: "seven-cups", suit: "cups", number: 7 },
  { id: "eight-cups", suit: "cups", number: 8 },
  { id: "nine-cups", suit: "cups", number: 9 },
  { id: "ten-cups", suit: "cups", number: 10 },
  { id: "page-cups", suit: "cups", number: 11 },
  { id: "knight-cups", suit: "cups", number: 12 },
  { id: "queen-cups", suit: "cups", number: 13 },
  { id: "king-cups", suit: "cups", number: 14 },
  
  // 小阿爾卡納牌 - 金幣
  { id: "ace-pentacles", suit: "pentacles", number: 1 },
  { id: "two-pentacles", suit: "pentacles", number: 2 },
  { id: "three-pentacles", suit: "pentacles", number: 3 },
  { id: "four-pentacles", suit: "pentacles", number: 4 },
  { id: "five-pentacles", suit: "pentacles", number: 5 },
  { id: "six-pentacles", suit: "pentacles", number: 6 },
  { id: "seven-pentacles", suit: "pentacles", number: 7 },
  { id: "eight-pentacles", suit: "pentacles", number: 8 },
  { id: "nine-pentacles", suit: "pentacles", number: 9 },
  { id: "ten-pentacles", suit: "pentacles", number: 10 },
  { id: "page-pentacles", suit: "pentacles", number: 11 },
  { id: "knight-pentacles", suit: "pentacles", number: 12 },
  { id: "queen-pentacles", suit: "pentacles", number: 13 },
  { id: "king-pentacles", suit: "pentacles", number: 14 },
  
  // 小阿爾卡納牌 - 寶劍
  { id: "ace-swords", suit: "swords", number: 1 },
  { id: "two-swords", suit: "swords", number: 2 },
  { id: "three-swords", suit: "swords", number: 3 },
  { id: "four-swords", suit: "swords", number: 4 },
  { id: "five-swords", suit: "swords", number: 5 },
  { id: "six-swords", suit: "swords", number: 6 },
  { id: "seven-swords", suit: "swords", number: 7 },
  { id: "eight-swords", suit: "swords", number: 8 },
  { id: "nine-swords", suit: "swords", number: 9 },
  { id: "ten-swords", suit: "swords", number: 10 },
  { id: "page-swords", suit: "swords", number: 11 },
  { id: "knight-swords", suit: "swords", number: 12 },
  { id: "queen-swords", suit: "swords", number: 13 },
  { id: "king-swords", suit: "swords", number: 14 },
  
  // 小阿爾卡納牌 - 權杖
  { id: "ace-wands", suit: "wands", number: 1 },
  { id: "two-wands", suit: "wands", number: 2 },
  { id: "three-wands", suit: "wands", number: 3 },
  { id: "four-wands", suit: "wands", number: 4 },
  { id: "five-wands", suit: "wands", number: 5 },
  { id: "six-wands", suit: "wands", number: 6 },
  { id: "seven-wands", suit: "wands", number: 7 },
  { id: "eight-wands", suit: "wands", number: 8 },
  { id: "nine-wands", suit: "wands", number: 9 },
  { id: "ten-wands", suit: "wands", number: 10 },
  { id: "page-wands", suit: "wands", number: 11 },
  { id: "knight-wands", suit: "wands", number: 12 },
  { id: "queen-wands", suit: "wands", number: 13 },
  { id: "king-wands", suit: "wands", number: 14 }
];

// 為每張牌添加深度解析內容
cardsWithoutDeepAnalysis.forEach(card => {
  const deepAnalysis = generateDeepAnalysisContent(card.id, card.suit, card.number);
  
  // 查找牌的結束位置
  const cardPattern = new RegExp(`id: "${card.id}",[\\s\\S]*?imageUrl: "/cards/${card.id.replace('-', '-')}\\.jpeg",`);
  const match = content.match(cardPattern);
  
  if (match) {
    const cardEnd = match.index + match[0].length;
    const deepAnalysisText = `\n    deepAnalysis: {
      symbolism: "${deepAnalysis.symbolism}",
      numerology: "${deepAnalysis.numerology}",
      astrology: "${deepAnalysis.astrology}",
      mythology: "${deepAnalysis.mythology}",
      practicalAdvice: "${deepAnalysis.practicalAdvice}",
      loveReading: "${deepAnalysis.loveReading}",
      careerReading: "${deepAnalysis.careerReading}",
      healthReading: "${deepAnalysis.healthReading}",
    },`;
    
    content = content.slice(0, cardEnd) + deepAnalysisText + content.slice(cardEnd);
  }
});

// 寫回文件
fs.writeFileSync(filePath, content, 'utf8');

console.log('已成功為所有剩餘的塔羅牌添加深度解析內容！');
console.log(`總共處理了 ${cardsWithoutDeepAnalysis.length} 張牌`); 
console.log('這個腳本可以幫助您快速為所有牌面生成深度解析內容。'); 