export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  suit: 'major' | 'cups' | 'pentacles' | 'swords' | 'wands';
  number?: number;
  meaning: {
    upright: string[];
    reversed: string[];
  };
  description: string;
  keywords: string[];
  imageUrl: string;
}

// 大阿爾卡納牌 (Major Arcana)
const majorArcana: TarotCard[] = [
  {
    id: 'fool',
    name: '愚者',
    nameEn: 'The Fool',
    suit: 'major',
    number: 0,
    meaning: {
      upright: ['新開始', '冒險精神', '純真', '自發性', '自由精神'],
      reversed: ['魯莽', '缺乏經驗', '愚蠢決定', '風險', '不負責任']
    },
    description: '愚者代表新的開始和無限的可能性。踏出舒適圈，勇敢追求夢想。',
    keywords: ['開始', '冒險', '純真', '自由'],
    imageUrl: '/cards/major/fool.jpg'
  },
  {
    id: 'magician',
    name: '魔術師',
    nameEn: 'The Magician',
    suit: 'major',
    number: 1,
    meaning: {
      upright: ['意志力', '創造力', '技能', '集中力', '實現目標'],
      reversed: ['操縱', '缺乏焦點', '能力不足', '延遲', '欺騙']
    },
    description: '魔術師象徵著將想法轉化為現實的能力。掌握自己的命運。',
    keywords: ['意志', '創造', '技能', '實現'],
    imageUrl: '/cards/major/magician.jpg'
  },
  {
    id: 'high-priestess',
    name: '女祭司',
    nameEn: 'The High Priestess',
    suit: 'major',
    number: 2,
    meaning: {
      upright: ['直覺', '神秘', '潛意識', '智慧', '靈性'],
      reversed: ['缺乏直覺', '與內心失聯', '保密', '隱瞒', '表面知識']
    },
    description: '女祭司代表內在智慧和直覺。相信你的第六感和內心聲音。',
    keywords: ['直覺', '神秘', '智慧', '靈性'],
    imageUrl: '/cards/major/high-priestess.jpg'
  },
  {
    id: 'empress',
    name: '皇后',
    nameEn: 'The Empress',
    suit: 'major',
    number: 3,
    meaning: {
      upright: ['豐盛', '創造力', '母性', '自然', '美感'],
      reversed: ['創意阻塞', '依賴', '窒息愛情', '缺乏成長']
    },
    description: '皇后象徵豐盛和創造力。享受生活的美好，培養創意才能。',
    keywords: ['豐盛', '創造', '母性', '美感'],
    imageUrl: '/cards/major/empress.jpg'
  },
  {
    id: 'emperor',
    name: '皇帝',
    nameEn: 'The Emperor',
    suit: 'major',
    number: 4,
    meaning: {
      upright: ['權威', '結構', '控制', '父性', '領導力'],
      reversed: ['專制', '缺乏紀律', '不成熟', '過度控制']
    },
    description: '皇帝代表權威和秩序。建立穩固的基礎，承擔領導責任。',
    keywords: ['權威', '結構', '領導', '穩定'],
    imageUrl: '/cards/major/emperor.jpg'
  }
];

// 聖盃牌組 (Cups) - 簡化版本，只顯示幾張代表牌
const cups: TarotCard[] = [
  {
    id: 'ace-cups',
    name: '聖盃一',
    nameEn: 'Ace of Cups',
    suit: 'cups',
    number: 1,
    meaning: {
      upright: ['新愛情', '情感滿足', '創意靈感', '精神覺醒'],
      reversed: ['情感阻塞', '失戀', '創意枯竭', '精神空虛']
    },
    description: '聖盃一代表情感的新開始和心靈的滿足。',
    keywords: ['新愛情', '靈感', '情感', '開始'],
    imageUrl: '/cards/cups/ace-cups.jpg'
  },
  {
    id: 'two-cups',
    name: '聖盃二',
    nameEn: 'Two of Cups',
    suit: 'cups',
    number: 2,
    meaning: {
      upright: ['愛情', '夥伴關係', '和諧', '連結'],
      reversed: ['關係失衡', '分離', '缺乏和諧']
    },
    description: '聖盃二象徵愛情和深厚的情感連結。',
    keywords: ['愛情', '夥伴', '和諧', '連結'],
    imageUrl: '/cards/cups/two-cups.jpg'
  }
];

// 金幣牌組 (Pentacles)
const pentacles: TarotCard[] = [
  {
    id: 'ace-pentacles',
    name: '金幣一',
    nameEn: 'Ace of Pentacles',
    suit: 'pentacles',
    number: 1,
    meaning: {
      upright: ['新機會', '財富', '物質成功', '實現'],
      reversed: ['失去機會', '財務問題', '缺乏計劃']
    },
    description: '金幣一代表物質世界的新機會和財富的開始。',
    keywords: ['機會', '財富', '成功', '實現'],
    imageUrl: '/cards/pentacles/ace-pentacles.jpg'
  }
];

// 寶劍牌組 (Swords)
const swords: TarotCard[] = [
  {
    id: 'ace-swords',
    name: '寶劍一',
    nameEn: 'Ace of Swords',
    suit: 'swords',
    number: 1,
    meaning: {
      upright: ['清晰思考', '新想法', '突破', '真理'],
      reversed: ['混亂思緒', '缺乏焦點', '創意阻塞']
    },
    description: '寶劍一象徵清晰的思維和新的想法突破。',
    keywords: ['思考', '想法', '突破', '真理'],
    imageUrl: '/cards/swords/ace-swords.jpg'
  }
];

// 權杖牌組 (Wands)
const wands: TarotCard[] = [
  {
    id: 'ace-wands',
    name: '權杖一',
    nameEn: 'Ace of Wands',
    suit: 'wands',
    number: 1,
    meaning: {
      upright: ['創意靈感', '新專案', '成長', '潛力'],
      reversed: ['缺乏方向', '延遲', '創意阻塞']
    },
    description: '權杖一代表創意的火花和新專案的開始。',
    keywords: ['靈感', '專案', '成長', '潛力'],
    imageUrl: '/cards/wands/ace-wands.jpg'
  }
];

export const allTarotCards: TarotCard[] = [
  ...majorArcana,
  ...cups,
  ...pentacles,
  ...swords,
  ...wands
];

export const getTarotCardById = (id: string): TarotCard | undefined => {
  return allTarotCards.find(card => card.id === id);
};

export const getTarotCardsBySuit = (suit: TarotCard['suit']): TarotCard[] => {
  return allTarotCards.filter(card => card.suit === suit);
};
