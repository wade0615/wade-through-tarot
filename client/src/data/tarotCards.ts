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

// 大阿爾卡納牌 (Major Arcana) - 22張
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
  },
  {
    id: 'hierophant',
    name: '教皇',
    nameEn: 'The Hierophant',
    suit: 'major',
    number: 5,
    meaning: {
      upright: ['傳統', '宗教', '教育', '指導', '建議'],
      reversed: ['反叛', '新方法', '個人信仰', '打破傳統']
    },
    description: '教皇代表傳統智慧和精神指導。尋求知識和導師的建議。',
    keywords: ['傳統', '指導', '宗教', '教育'],
    imageUrl: '/cards/major/hierophant.jpg'
  },
  {
    id: 'lovers',
    name: '戀人',
    nameEn: 'The Lovers',
    suit: 'major',
    number: 6,
    meaning: {
      upright: ['愛情', '關係', '選擇', '和諧', '價值觀'],
      reversed: ['關係問題', '價值衝突', '錯誤選擇', '不和諧']
    },
    description: '戀人代表愛情和重要的人生選擇。追隨內心，做出正確決定。',
    keywords: ['愛情', '選擇', '關係', '和諧'],
    imageUrl: '/cards/major/lovers.jpg'
  },
  {
    id: 'chariot',
    name: '戰車',
    nameEn: 'The Chariot',
    suit: 'major',
    number: 7,
    meaning: {
      upright: ['勝利', '決心', '控制', '成功', '方向'],
      reversed: ['失控', '缺乏方向', '失敗', '挫敗']
    },
    description: '戰車象徵勝利和自我控制。保持專注，朝目標前進。',
    keywords: ['勝利', '控制', '決心', '成功'],
    imageUrl: '/cards/major/chariot.jpg'
  },
  {
    id: 'strength',
    name: '力量',
    nameEn: 'Strength',
    suit: 'major',
    number: 8,
    meaning: {
      upright: ['力量', '勇氣', '耐心', '自信', '溫柔'],
      reversed: ['軟弱', '缺乏自信', '粗暴', '缺乏耐心']
    },
    description: '力量代表內在的勇氣和溫柔的力量。以愛征服恐懼。',
    keywords: ['力量', '勇氣', '耐心', '自信'],
    imageUrl: '/cards/major/strength.jpg'
  },
  {
    id: 'hermit',
    name: '隱者',
    nameEn: 'The Hermit',
    suit: 'major',
    number: 9,
    meaning: {
      upright: ['內省', '尋找', '指導', '智慧', '孤獨'],
      reversed: ['孤立', '拒絕幫助', '迷失', '過度內向']
    },
    description: '隱者代表內在的智慧和自我反省。獨處時光找到答案。',
    keywords: ['內省', '智慧', '指導', '尋找'],
    imageUrl: '/cards/major/hermit.jpg'
  },
  {
    id: 'wheel-of-fortune',
    name: '命運之輪',
    nameEn: 'Wheel of Fortune',
    suit: 'major',
    number: 10,
    meaning: {
      upright: ['命運', '機會', '變化', '循環', '好運'],
      reversed: ['厄運', '失控', '挫折', '延遲']
    },
    description: '命運之輪象徵生命的起伏變化。接受變化，把握機會。',
    keywords: ['命運', '變化', '機會', '循環'],
    imageUrl: '/cards/major/wheel-of-fortune.jpg'
  },
  {
    id: 'justice',
    name: '正義',
    nameEn: 'Justice',
    suit: 'major',
    number: 11,
    meaning: {
      upright: ['正義', '平衡', '公平', '真理', '法律'],
      reversed: ['不公平', '偏見', '缺乏責任', '失衡']
    },
    description: '正義代表公平和道德平衡。做出公正的判斷和決定。',
    keywords: ['正義', '平衡', '公平', '真理'],
    imageUrl: '/cards/major/justice.jpg'
  },
  {
    id: 'hanged-man',
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    suit: 'major',
    number: 12,
    meaning: {
      upright: ['犧牲', '等待', '放下', '新觀點', '暫停'],
      reversed: ['拖延', '抗拒', '無意義的犧牲', '停滯']
    },
    description: '倒吊人代表犧牲和等待的智慧。有時停下來反思更重要。',
    keywords: ['犧牲', '等待', '放下', '觀點'],
    imageUrl: '/cards/major/hanged-man.jpg'
  },
  {
    id: 'death',
    name: '死神',
    nameEn: 'Death',
    suit: 'major',
    number: 13,
    meaning: {
      upright: ['結束', '轉變', '重生', '釋放', '變化'],
      reversed: ['抗拒變化', '停滯', '恐懼', '僵化']
    },
    description: '死神代表結束和新的開始。舊的必須死去，新的才能誕生。',
    keywords: ['結束', '轉變', '重生', '變化'],
    imageUrl: '/cards/major/death.jpg'
  },
  {
    id: 'temperance',
    name: '節制',
    nameEn: 'Temperance',
    suit: 'major',
    number: 14,
    meaning: {
      upright: ['平衡', '節制', '和諧', '耐心', '治癒'],
      reversed: ['不平衡', '過度', '缺乏耐心', '衝突']
    },
    description: '節制象徵平衡和中庸之道。在極端中找到和諧。',
    keywords: ['平衡', '節制', '和諧', '耐心'],
    imageUrl: '/cards/major/temperance.jpg'
  },
  {
    id: 'devil',
    name: '惡魔',
    nameEn: 'The Devil',
    suit: 'major',
    number: 15,
    meaning: {
      upright: ['束縛', '誘惑', '物質主義', '依賴', '陰影'],
      reversed: ['解脫', '覺醒', '打破束縛', '自由']
    },
    description: '惡魔代表束縛和誘惑。認識自己的陰影，才能獲得真正自由。',
    keywords: ['束縛', '誘惑', '物質', '依賴'],
    imageUrl: '/cards/major/devil.jpg'
  },
  {
    id: 'tower',
    name: '塔',
    nameEn: 'The Tower',
    suit: 'major',
    number: 16,
    meaning: {
      upright: ['突然變化', '破壞', '覺醒', '震撼', '解放'],
      reversed: ['避免災難', '內在變化', '延遲的變化', '抗拒']
    },
    description: '塔代表突然的變化和舊結構的崩塌。破壞帶來新的可能。',
    keywords: ['變化', '破壞', '覺醒', '震撼'],
    imageUrl: '/cards/major/tower.jpg'
  },
  {
    id: 'star',
    name: '星星',
    nameEn: 'The Star',
    suit: 'major',
    number: 17,
    meaning: {
      upright: ['希望', '信心', '指引', '靈感', '治癒'],
      reversed: ['失望', '缺乏信心', '失去方向', '絕望']
    },
    description: '星星象徵希望和指引。即使在黑暗中，也有光明指路。',
    keywords: ['希望', '信心', '指引', '靈感'],
    imageUrl: '/cards/major/star.jpg'
  },
  {
    id: 'moon',
    name: '月亮',
    nameEn: 'The Moon',
    suit: 'major',
    number: 18,
    meaning: {
      upright: ['幻象', '潛意識', '恐懼', '直覺', '不確定'],
      reversed: ['克服恐懼', '真相揭露', '直覺清晰', '擺脫幻象']
    },
    description: '月亮代表潛意識和隱藏的恐懼。面對內心的陰影，尋找真相。',
    keywords: ['幻象', '潛意識', '恐懼', '直覺'],
    imageUrl: '/cards/major/moon.jpg'
  },
  {
    id: 'sun',
    name: '太陽',
    nameEn: 'The Sun',
    suit: 'major',
    number: 19,
    meaning: {
      upright: ['快樂', '成功', '活力', '正面能量', '成就'],
      reversed: ['延遲的快樂', '過度自信', '缺乏活力', '陰霾']
    },
    description: '太陽象徵快樂和成功。生命中的美好時光即將到來。',
    keywords: ['快樂', '成功', '活力', '能量'],
    imageUrl: '/cards/major/sun.jpg'
  },
  {
    id: 'judgement',
    name: '審判',
    nameEn: 'Judgement',
    suit: 'major',
    number: 20,
    meaning: {
      upright: ['重生', '覺醒', '寬恕', '內省', '新開始'],
      reversed: ['缺乏覺醒', '自我懷疑', '嚴厲批判', '拒絕改變']
    },
    description: '審判代表精神覺醒和重生。寬恕過去，迎接新生。',
    keywords: ['重生', '覺醒', '寬恕', '內省'],
    imageUrl: '/cards/major/judgement.jpg'
  },
  {
    id: 'world',
    name: '世界',
    nameEn: 'The World',
    suit: 'major',
    number: 21,
    meaning: {
      upright: ['完成', '成就', '整合', '成功', '實現'],
      reversed: ['未完成', '缺乏成就感', '延遲', '內在尋求']
    },
    description: '世界代表完成和圓滿。一個循環的結束，也是新開始的準備。',
    keywords: ['完成', '成就', '整合', '成功'],
    imageUrl: '/cards/major/world.jpg'
  }
];

// 聖盃牌組 (Cups) - 14張
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
  },
  {
    id: 'three-cups',
    name: '聖盃三',
    nameEn: 'Three of Cups',
    suit: 'cups',
    number: 3,
    meaning: {
      upright: ['友誼', '慶祝', '團體', '歡樂', '社交'],
      reversed: ['超額派對', '第三者', '孤獨', '社交問題']
    },
    description: '聖盃三代表友誼和團體的歡樂時光。',
    keywords: ['友誼', '慶祝', '團體', '歡樂'],
    imageUrl: '/cards/cups/three-cups.jpg'
  },
  {
    id: 'four-cups',
    name: '聖盃四',
    nameEn: 'Four of Cups',
    suit: 'cups',
    number: 4,
    meaning: {
      upright: ['冷漠', '沉思', '錯失機會', '不滿', '內省'],
      reversed: ['重新關注', '動力', '新機會', '興趣恢復']
    },
    description: '聖盃四提醒我們不要錯過眼前的機會。',
    keywords: ['冷漠', '沉思', '機會', '不滿'],
    imageUrl: '/cards/cups/four-cups.jpg'
  },
  {
    id: 'five-cups',
    name: '聖盃五',
    nameEn: 'Five of Cups',
    suit: 'cups',
    number: 5,
    meaning: {
      upright: ['失望', '悲傷', '遺憾', '失落', '悲傷'],
      reversed: ['接受', '前進', '寬恕', '情感恢復']
    },
    description: '聖盃五代表失望，但也提醒我們還有希望存在。',
    keywords: ['失望', '悲傷', '遺憾', '失落'],
    imageUrl: '/cards/cups/five-cups.jpg'
  },
  {
    id: 'six-cups',
    name: '聖盃六',
    nameEn: 'Six of Cups',
    suit: 'cups',
    number: 6,
    meaning: {
      upright: ['懷舊', '童年', '純真', '回憶', '給予'],
      reversed: ['困在過去', '幼稚', '無法前進', '理想化']
    },
    description: '聖盃六象徵懷舊和童年的純真回憶。',
    keywords: ['懷舊', '童年', '純真', '回憶'],
    imageUrl: '/cards/cups/six-cups.jpg'
  },
  {
    id: 'seven-cups',
    name: '聖盃七',
    nameEn: 'Seven of Cups',
    suit: 'cups',
    number: 7,
    meaning: {
      upright: ['選擇', '幻想', '願望', '困惑', '誘惑'],
      reversed: ['決心', '現實', '專注', '明確目標']
    },
    description: '聖盃七代表太多選擇帶來的困擾和幻想。',
    keywords: ['選擇', '幻想', '願望', '困惑'],
    imageUrl: '/cards/cups/seven-cups.jpg'
  },
  {
    id: 'eight-cups',
    name: '聖盃八',
    nameEn: 'Eight of Cups',
    suit: 'cups',
    number: 8,
    meaning: {
      upright: ['放棄', '離開', '尋找', '失望', '前進'],
      reversed: ['恐懼離開', '停滯', '逃避', '缺乏勇氣']
    },
    description: '聖盃八象徵放下過去，尋找新的道路。',
    keywords: ['放棄', '離開', '尋找', '前進'],
    imageUrl: '/cards/cups/eight-cups.jpg'
  },
  {
    id: 'nine-cups',
    name: '聖盃九',
    nameEn: 'Nine of Cups',
    suit: 'cups',
    number: 9,
    meaning: {
      upright: ['滿足', '願望成真', '快樂', '成功', '滿意'],
      reversed: ['貪婪', '物質主義', '不滿足', '虛榮']
    },
    description: '聖盃九代表願望實現和內心的滿足。',
    keywords: ['滿足', '願望', '快樂', '成功'],
    imageUrl: '/cards/cups/nine-cups.jpg'
  },
  {
    id: 'ten-cups',
    name: '聖盃十',
    nameEn: 'Ten of Cups',
    suit: 'cups',
    number: 10,
    meaning: {
      upright: ['家庭', '幸福', '和諧', '滿足', '情感完整'],
      reversed: ['家庭問題', '不和諧', '價值衝突', '表面和睦']
    },
    description: '聖盃十象徵家庭幸福和情感的圓滿。',
    keywords: ['家庭', '幸福', '和諧', '滿足'],
    imageUrl: '/cards/cups/ten-cups.jpg'
  },
  {
    id: 'page-cups',
    name: '聖盃侍者',
    nameEn: 'Page of Cups',
    suit: 'cups',
    number: 11,
    meaning: {
      upright: ['創意訊息', '直覺', '藝術才能', '情感學習', '內在孩子'],
      reversed: ['情感不成熟', '創意阻塞', '逃避現實', '情緒化']
    },
    description: '聖盃侍者代表創意靈感和情感的新開始。',
    keywords: ['創意', '直覺', '藝術', '學習'],
    imageUrl: '/cards/cups/page-cups.jpg'
  },
  {
    id: 'knight-cups',
    name: '聖盃騎士',
    nameEn: 'Knight of Cups',
    suit: 'cups',
    number: 12,
    meaning: {
      upright: ['浪漫', '魅力', '跟隨心意', '創意行動', '理想主義'],
      reversed: ['情緒化', '不切實際', '缺乏方向', '善變']
    },
    description: '聖盃騎士象徵浪漫的追求和情感的行動。',
    keywords: ['浪漫', '魅力', '創意', '理想'],
    imageUrl: '/cards/cups/knight-cups.jpg'
  },
  {
    id: 'queen-cups',
    name: '聖盃皇后',
    nameEn: 'Queen of Cups',
    suit: 'cups',
    number: 13,
    meaning: {
      upright: ['直覺', '同情心', '情感智慧', '治癒', '關懷'],
      reversed: ['情感依賴', '情緒不穩', '缺乏界限', '自我犧牲']
    },
    description: '聖盃皇后代表情感智慧和深刻的直覺能力。',
    keywords: ['直覺', '同情', '智慧', '治癒'],
    imageUrl: '/cards/cups/queen-cups.jpg'
  },
  {
    id: 'king-cups',
    name: '聖盃國王',
    nameEn: 'King of Cups',
    suit: 'cups',
    number: 14,
    meaning: {
      upright: ['情感平衡', '同情', '外交', '沉著', '智慧'],
      reversed: ['情感操控', '喜怒無常', '壓抑', '無情']
    },
    description: '聖盃國王象徵情感的成熟和內在的平衡。',
    keywords: ['平衡', '同情', '外交', '智慧'],
    imageUrl: '/cards/cups/king-cups.jpg'
  }
];

// 金幣牌組 (Pentacles) - 14張
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
  },
  {
    id: 'two-pentacles',
    name: '金幣二',
    nameEn: 'Two of Pentacles',
    suit: 'pentacles',
    number: 2,
    meaning: {
      upright: ['平衡', '適應性', '時間管理', '優先順序', '靈活性'],
      reversed: ['失衡', '壓力過大', '缺乏組織', '混亂']
    },
    description: '金幣二象徵在多重責任中保持平衡的能力。',
    keywords: ['平衡', '適應', '管理', '靈活'],
    imageUrl: '/cards/pentacles/two-pentacles.jpg'
  },
  {
    id: 'three-pentacles',
    name: '金幣三',
    nameEn: 'Three of Pentacles',
    suit: 'pentacles',
    number: 3,
    meaning: {
      upright: ['團隊合作', '技能', '學習', '建設', '協作'],
      reversed: ['缺乏團隊精神', '技能不足', '缺乏合作', '衝突']
    },
    description: '金幣三代表團隊合作和技能的學習發展。',
    keywords: ['團隊', '技能', '學習', '合作'],
    imageUrl: '/cards/pentacles/three-pentacles.jpg'
  },
  {
    id: 'four-pentacles',
    name: '金幣四',
    nameEn: 'Four of Pentacles',
    suit: 'pentacles',
    number: 4,
    meaning: {
      upright: ['安全感', '控制', '保守', '節儉', '穩定'],
      reversed: ['貪婪', '物質主義', '慷慨', '財務不穩']
    },
    description: '金幣四象徵對安全和物質的強烈需求。',
    keywords: ['安全', '控制', '保守', '穩定'],
    imageUrl: '/cards/pentacles/four-pentacles.jpg'
  },
  {
    id: 'five-pentacles',
    name: '金幣五',
    nameEn: 'Five of Pentacles',
    suit: 'pentacles',
    number: 5,
    meaning: {
      upright: ['財務困難', '貧窮', '失業', '健康問題', '孤立'],
      reversed: ['財務恢復', '工作機會', '接受幫助', '改善']
    },
    description: '金幣五代表物質上的困難和挑戰時期。',
    keywords: ['困難', '貧窮', '健康', '孤立'],
    imageUrl: '/cards/pentacles/five-pentacles.jpg'
  },
  {
    id: 'six-pentacles',
    name: '金幣六',
    nameEn: 'Six of Pentacles',
    suit: 'pentacles',
    number: 6,
    meaning: {
      upright: ['慷慨', '分享', '公平', '給予', '慈善'],
      reversed: ['自私', '不公平', '債務', '依賴']
    },
    description: '金幣六象徵慷慨的給予和接受的平衡。',
    keywords: ['慷慨', '分享', '公平', '給予'],
    imageUrl: '/cards/pentacles/six-pentacles.jpg'
  },
  {
    id: 'seven-pentacles',
    name: '金幣七',
    nameEn: 'Seven of Pentacles',
    suit: 'pentacles',
    number: 7,
    meaning: {
      upright: ['耐心', '投資', '長期規劃', '評估', '等待'],
      reversed: ['缺乏耐心', '放棄', '短期思維', '急躁']
    },
    description: '金幣七代表耐心等待努力成果的時期。',
    keywords: ['耐心', '投資', '規劃', '評估'],
    imageUrl: '/cards/pentacles/seven-pentacles.jpg'
  },
  {
    id: 'eight-pentacles',
    name: '金幣八',
    nameEn: 'Eight of Pentacles',
    suit: 'pentacles',
    number: 8,
    meaning: {
      upright: ['技能發展', '努力工作', '專注', '學習', '完善'],
      reversed: ['缺乏焦點', '完美主義', '技能不足', '無聊']
    },
    description: '金幣八象徵透過努力工作來完善技能。',
    keywords: ['技能', '努力', '專注', '學習'],
    imageUrl: '/cards/pentacles/eight-pentacles.jpg'
  },
  {
    id: 'nine-pentacles',
    name: '金幣九',
    nameEn: 'Nine of Pentacles',
    suit: 'pentacles',
    number: 9,
    meaning: {
      upright: ['獨立', '成功', '奢華', '自給自足', '完成'],
      reversed: ['財務依賴', '缺乏自信', '工作過度', '孤獨']
    },
    description: '金幣九代表透過努力獲得的獨立和成功。',
    keywords: ['獨立', '成功', '奢華', '自足'],
    imageUrl: '/cards/pentacles/nine-pentacles.jpg'
  },
  {
    id: 'ten-pentacles',
    name: '金幣十',
    nameEn: 'Ten of Pentacles',
    suit: 'pentacles',
    number: 10,
    meaning: {
      upright: ['財富', '家族', '傳承', '安全', '完成'],
      reversed: ['財務損失', '家族問題', '短期思維', '不穩定']
    },
    description: '金幣十象徵財富的累積和家族的傳承。',
    keywords: ['財富', '家族', '傳承', '安全'],
    imageUrl: '/cards/pentacles/ten-pentacles.jpg'
  },
  {
    id: 'page-pentacles',
    name: '金幣侍者',
    nameEn: 'Page of Pentacles',
    suit: 'pentacles',
    number: 11,
    meaning: {
      upright: ['學習', '新計劃', '實際性', '專注', '好消息'],
      reversed: ['缺乏進展', '不切實際', '拖延', '學習困難']
    },
    description: '金幣侍者代表學習新技能和實際計劃的開始。',
    keywords: ['學習', '計劃', '實際', '專注'],
    imageUrl: '/cards/pentacles/page-pentacles.jpg'
  },
  {
    id: 'knight-pentacles',
    name: '金幣騎士',
    nameEn: 'Knight of Pentacles',
    suit: 'pentacles',
    number: 12,
    meaning: {
      upright: ['勤奮', '可靠', '努力工作', '責任感', '保守'],
      reversed: ['懶惰', '拖延', '不負責任', '完美主義']
    },
    description: '金幣騎士象徵穩定可靠的努力和責任感。',
    keywords: ['勤奮', '可靠', '努力', '責任'],
    imageUrl: '/cards/pentacles/knight-pentacles.jpg'
  },
  {
    id: 'queen-pentacles',
    name: '金幣皇后',
    nameEn: 'Queen of Pentacles',
    suit: 'pentacles',
    number: 13,
    meaning: {
      upright: ['實用性', '安全感', '養育', '豐盛', '務實'],
      reversed: ['工作狂', '嫉妒', '不信任', '物質主義']
    },
    description: '金幣皇后代表實用智慧和養育他人的能力。',
    keywords: ['實用', '安全', '養育', '豐盛'],
    imageUrl: '/cards/pentacles/queen-pentacles.jpg'
  },
  {
    id: 'king-pentacles',
    name: '金幣國王',
    nameEn: 'King of Pentacles',
    suit: 'pentacles',
    number: 14,
    meaning: {
      upright: ['成功', '領導力', '財務智慧', '安全', '豐盛'],
      reversed: ['貪婪', '不道德', '財務不穩', '物質主義']
    },
    description: '金幣國王象徵物質世界的成功和領導能力。',
    keywords: ['成功', '領導', '財務', '豐盛'],
    imageUrl: '/cards/pentacles/king-pentacles.jpg'
  }
];

// 寶劍牌組 (Swords) - 14張
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
  },
  {
    id: 'two-swords',
    name: '寶劍二',
    nameEn: 'Two of Swords',
    suit: 'swords',
    number: 2,
    meaning: {
      upright: ['困難決定', '僵局', '迴避', '平衡', '兩難'],
      reversed: ['做出決定', '混亂', '資訊過載', '猶豫不決']
    },
    description: '寶劍二代表面臨困難選擇時的猶豫不決。',
    keywords: ['決定', '僵局', '迴避', '兩難'],
    imageUrl: '/cards/swords/two-swords.jpg'
  },
  {
    id: 'three-swords',
    name: '寶劍三',
    nameEn: 'Three of Swords',
    suit: 'swords',
    number: 3,
    meaning: {
      upright: ['心痛', '痛苦', '悲傷', '失落', '背叛'],
      reversed: ['治癒', '寬恕', '從痛苦中恢復', '釋放']
    },
    description: '寶劍三象徵心靈的痛苦和情感的創傷。',
    keywords: ['心痛', '痛苦', '悲傷', '背叛'],
    imageUrl: '/cards/swords/three-swords.jpg'
  },
  {
    id: 'four-swords',
    name: '寶劍四',
    nameEn: 'Four of Swords',
    suit: 'swords',
    number: 4,
    meaning: {
      upright: ['休息', '沉思', '恢復', '和平', '靜止'],
      reversed: ['焦慮', '缺乏休息', '活躍', '恢復行動']
    },
    description: '寶劍四代表需要休息和恢復的時期。',
    keywords: ['休息', '沉思', '恢復', '和平'],
    imageUrl: '/cards/swords/four-swords.jpg'
  },
  {
    id: 'five-swords',
    name: '寶劍五',
    nameEn: 'Five of Swords',
    suit: 'swords',
    number: 5,
    meaning: {
      upright: ['衝突', '失敗', '挫敗', '不公平', '敵意'],
      reversed: ['和解', '寬恕', '從衝突中學習', '承認失敗']
    },
    description: '寶劍五象徵衝突和不光彩的勝利。',
    keywords: ['衝突', '失敗', '挫敗', '敵意'],
    imageUrl: '/cards/swords/five-swords.jpg'
  },
  {
    id: 'six-swords',
    name: '寶劍六',
    nameEn: 'Six of Swords',
    suit: 'swords',
    number: 6,
    meaning: {
      upright: ['過渡', '移動', '離開困難', '平靜水域', '進步'],
      reversed: ['困在問題中', '抗拒變化', '無法前進', '動盪']
    },
    description: '寶劍六代表從困境中走向平靜的過渡期。',
    keywords: ['過渡', '移動', '離開', '進步'],
    imageUrl: '/cards/swords/six-swords.jpg'
  },
  {
    id: 'seven-swords',
    name: '寶劍七',
    nameEn: 'Seven of Swords',
    suit: 'swords',
    number: 7,
    meaning: {
      upright: ['欺騙', '策略', '偷竊', '逃避', '狡猾'],
      reversed: ['坦白', '承認錯誤', '回歸正道', '良心']
    },
    description: '寶劍七警告欺騙和不誠實的行為。',
    keywords: ['欺騙', '策略', '偷竊', '逃避'],
    imageUrl: '/cards/swords/seven-swords.jpg'
  },
  {
    id: 'eight-swords',
    name: '寶劍八',
    nameEn: 'Eight of Swords',
    suit: 'swords',
    number: 8,
    meaning: {
      upright: ['受困', '限制', '無力感', '束縛', '受害者心態'],
      reversed: ['自由', '解脫', '新觀點', '內在力量']
    },
    description: '寶劍八象徵感到被困但其實可以自由的狀態。',
    keywords: ['受困', '限制', '無力', '束縛'],
    imageUrl: '/cards/swords/eight-swords.jpg'
  },
  {
    id: 'nine-swords',
    name: '寶劍九',
    nameEn: 'Nine of Swords',
    suit: 'swords',
    number: 9,
    meaning: {
      upright: ['焦慮', '恐懼', '噩夢', '絕望', '內疚'],
      reversed: ['希望', '恢復', '尋求幫助', '克服恐懼']
    },
    description: '寶劍九代表極度的焦慮和內心的痛苦。',
    keywords: ['焦慮', '恐懼', '噩夢', '絕望'],
    imageUrl: '/cards/swords/nine-swords.jpg'
  },
  {
    id: 'ten-swords',
    name: '寶劍十',
    nameEn: 'Ten of Swords',
    suit: 'swords',
    number: 10,
    meaning: {
      upright: ['結束', '背叛', '痛苦', '失敗', '觸底'],
      reversed: ['恢復', '重生', '拒絕放棄', '內在力量']
    },
    description: '寶劍十象徵痛苦的結束和新開始的可能。',
    keywords: ['結束', '背叛', '痛苦', '失敗'],
    imageUrl: '/cards/swords/ten-swords.jpg'
  },
  {
    id: 'page-swords',
    name: '寶劍侍者',
    nameEn: 'Page of Swords',
    suit: 'swords',
    number: 11,
    meaning: {
      upright: ['好奇心', '新想法', '警覺', '溝通', '學習'],
      reversed: ['缺乏焦點', '口舌是非', '欺騙', '資訊不足']
    },
    description: '寶劍侍者代表新想法和求知的渴望。',
    keywords: ['好奇', '想法', '警覺', '溝通'],
    imageUrl: '/cards/swords/page-swords.jpg'
  },
  {
    id: 'knight-swords',
    name: '寶劍騎士',
    nameEn: 'Knight of Swords',
    suit: 'swords',
    number: 12,
    meaning: {
      upright: ['行動', '衝動', '雄心', '決心', '勇敢'],
      reversed: ['魯莽', '不耐煩', '缺乏方向', '侵略性']
    },
    description: '寶劍騎士象徵快速的行動和強烈的決心。',
    keywords: ['行動', '衝動', '雄心', '勇敢'],
    imageUrl: '/cards/swords/knight-swords.jpg'
  },
  {
    id: 'queen-swords',
    name: '寶劍皇后',
    nameEn: 'Queen of Swords',
    suit: 'swords',
    number: 13,
    meaning: {
      upright: ['智慧', '獨立', '清晰思考', '直接', '公正'],
      reversed: ['冷酷', '殘忍', '偏見', '缺乏同情心']
    },
    description: '寶劍皇后代表智慧的判斷和清晰的溝通。',
    keywords: ['智慧', '獨立', '清晰', '公正'],
    imageUrl: '/cards/swords/queen-swords.jpg'
  },
  {
    id: 'king-swords',
    name: '寶劍國王',
    nameEn: 'King of Swords',
    suit: 'swords',
    number: 14,
    meaning: {
      upright: ['權威', '智慧', '清晰思考', '公正', '理性'],
      reversed: ['濫用權力', '獨裁', '冷酷無情', '缺乏同情']
    },
    description: '寶劍國王象徵理性的領導和智慧的權威。',
    keywords: ['權威', '智慧', '理性', '公正'],
    imageUrl: '/cards/swords/king-swords.jpg'
  }
];

// 權杖牌組 (Wands) - 14張
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
  },
  {
    id: 'two-wands',
    name: '權杖二',
    nameEn: 'Two of Wands',
    suit: 'wands',
    number: 2,
    meaning: {
      upright: ['規劃', '進步', '個人力量', '控制', '展望未來'],
      reversed: ['缺乏規劃', '恐懼', '缺乏控制', '不良決策']
    },
    description: '權杖二象徵個人力量和未來規劃的重要性。',
    keywords: ['規劃', '進步', '力量', '控制'],
    imageUrl: '/cards/wands/two-wands.jpg'
  },
  {
    id: 'three-wands',
    name: '權杖三',
    nameEn: 'Three of Wands',
    suit: 'wands',
    number: 3,
    meaning: {
      upright: ['展望', '領導', '遠見', '進展', '機會'],
      reversed: ['缺乏遠見', '延遲', '缺乏進展', '挫折']
    },
    description: '權杖三代表展望未來和等待機會的到來。',
    keywords: ['展望', '領導', '遠見', '機會'],
    imageUrl: '/cards/wands/three-wands.jpg'
  },
  {
    id: 'four-wands',
    name: '權杖四',
    nameEn: 'Four of Wands',
    suit: 'wands',
    number: 4,
    meaning: {
      upright: ['慶祝', '和諧', '家庭', '穩定', '里程碑'],
      reversed: ['家庭問題', '缺乏支持', '不穩定', '衝突']
    },
    description: '權杖四象徵慶祝成就和家庭和諧。',
    keywords: ['慶祝', '和諧', '家庭', '穩定'],
    imageUrl: '/cards/wands/four-wands.jpg'
  },
  {
    id: 'five-wands',
    name: '權杖五',
    nameEn: 'Five of Wands',
    suit: 'wands',
    number: 5,
    meaning: {
      upright: ['競爭', '衝突', '不和', '挑戰', '緊張'],
      reversed: ['避免衝突', '內在衝突', '和解', '合作']
    },
    description: '權杖五代表競爭和意見分歧帶來的挑戰。',
    keywords: ['競爭', '衝突', '挑戰', '緊張'],
    imageUrl: '/cards/wands/five-wands.jpg'
  },
  {
    id: 'six-wands',
    name: '權杖六',
    nameEn: 'Six of Wands',
    suit: 'wands',
    number: 6,
    meaning: {
      upright: ['勝利', '成功', '公眾認可', '自信', '進步'],
      reversed: ['私人成就', '自我懷疑', '缺乏認可', '延遲成功']
    },
    description: '權杖六象徵勝利和公眾的認可。',
    keywords: ['勝利', '成功', '認可', '自信'],
    imageUrl: '/cards/wands/six-wands.jpg'
  },
  {
    id: 'seven-wands',
    name: '權杖七',
    nameEn: 'Seven of Wands',
    suit: 'wands',
    number: 7,
    meaning: {
      upright: ['防守', '挑戰', '毅力', '競爭', '堅持'],
      reversed: ['屈服壓力', '缺乏信心', '疲憊', '放棄']
    },
    description: '權杖七代表面對挑戰時的堅持和防守。',
    keywords: ['防守', '挑戰', '毅力', '堅持'],
    imageUrl: '/cards/wands/seven-wands.jpg'
  },
  {
    id: 'eight-wands',
    name: '權杖八',
    nameEn: 'Eight of Wands',
    suit: 'wands',
    number: 8,
    meaning: {
      upright: ['快速行動', '進展', '迅速變化', '旅行', '溝通'],
      reversed: ['延遲', '挫折', '缺乏進展', '內在變化']
    },
    description: '權杖八象徵快速的進展和變化。',
    keywords: ['快速', '進展', '變化', '溝通'],
    imageUrl: '/cards/wands/eight-wands.jpg'
  },
  {
    id: 'nine-wands',
    name: '權杖九',
    nameEn: 'Nine of Wands',
    suit: 'wands',
    number: 9,
    meaning: {
      upright: ['恢復力', '毅力', '防守', '警覺', '最後努力'],
      reversed: ['偏執', '固執', '缺乏勇氣', '放棄']
    },
    description: '權杖九代表在困難中堅持和最後的努力。',
    keywords: ['恢復', '毅力', '防守', '警覺'],
    imageUrl: '/cards/wands/nine-wands.jpg'
  },
  {
    id: 'ten-wands',
    name: '權杖十',
    nameEn: 'Ten of Wands',
    suit: 'wands',
    number: 10,
    meaning: {
      upright: ['負擔', '責任', '努力工作', '壓力', '完成'],
      reversed: ['釋放負擔', '委派', '休息', '重新評估']
    },
    description: '權杖十象徵承擔重責和即將完成的努力。',
    keywords: ['負擔', '責任', '努力', '完成'],
    imageUrl: '/cards/wands/ten-wands.jpg'
  },
  {
    id: 'page-wands',
    name: '權杖侍者',
    nameEn: 'Page of Wands',
    suit: 'wands',
    number: 11,
    meaning: {
      upright: ['靈感', '發現', '自由精神', '好消息', '探索'],
      reversed: ['缺乏方向', '拖延', '壞消息', '缺乏熱情']
    },
    description: '權杖侍者代表新的靈感和探索的精神。',
    keywords: ['靈感', '發現', '自由', '探索'],
    imageUrl: '/cards/wands/page-wands.jpg'
  },
  {
    id: 'knight-wands',
    name: '權杖騎士',
    nameEn: 'Knight of Wands',
    suit: 'wands',
    number: 12,
    meaning: {
      upright: ['行動', '冒險', '衝動', '熱情', '進步'],
      reversed: ['魯莽', '不耐煩', '缺乏自制', '延遲']
    },
    description: '權杖騎士象徵充滿熱情的行動和冒險精神。',
    keywords: ['行動', '冒險', '熱情', '進步'],
    imageUrl: '/cards/wands/knight-wands.jpg'
  },
  {
    id: 'queen-wands',
    name: '權杖皇后',
    nameEn: 'Queen of Wands',
    suit: 'wands',
    number: 13,
    meaning: {
      upright: ['自信', '活力', '獨立', '決心', '友善'],
      reversed: ['嫉妒', '報復', '自私', '缺乏自信']
    },
    description: '權杖皇后代表自信的領導和充滿活力的性格。',
    keywords: ['自信', '活力', '獨立', '決心'],
    imageUrl: '/cards/wands/queen-wands.jpg'
  },
  {
    id: 'king-wands',
    name: '權杖國王',
    nameEn: 'King of Wands',
    suit: 'wands',
    number: 14,
    meaning: {
      upright: ['領導', '遠見', '創業精神', '榮譽', '影響力'],
      reversed: ['專制', '控制慾', '缺乏方向', '魯莽']
    },
    description: '權杖國王象徵創業精神和天生的領導能力。',
    keywords: ['領導', '遠見', '創業', '影響'],
    imageUrl: '/cards/wands/king-wands.jpg'
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
