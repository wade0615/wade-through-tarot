import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 洗牌算法
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 隨機決定牌是否逆位
export function getRandomReversed(): boolean {
  return Math.random() < 0.5 // 50% 機率逆位
}

// 格式化日期
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// 牌陣位置說明
export const spreadPositions = {
  'single': [
    { position: 0, name: '當前狀況', description: '現在的狀況或問題的核心' }
  ],
  'three-card': [
    { position: 0, name: '過去', description: '影響當前狀況的過去因素' },
    { position: 1, name: '現在', description: '目前的狀況或挑戰' },
    { position: 2, name: '未來', description: '可能的結果或發展方向' }
  ],
  'celtic-cross': [
    { position: 0, name: '當前狀況', description: '問題的核心或目前狀況' },
    { position: 1, name: '挑戰', description: '面臨的阻礙或挑戰' },
    { position: 2, name: '遠程過去', description: '深層的過去影響' },
    { position: 3, name: '近期過去', description: '最近的過去事件' },
    { position: 4, name: '可能的未來', description: '可能的發展' },
    { position: 5, name: '近期未來', description: '即將發生的事' },
    { position: 6, name: '你的方法', description: '你處理問題的方式' },
    { position: 7, name: '外在影響', description: '周圍環境的影響' },
    { position: 8, name: '希望與恐懼', description: '內心的希望和恐懼' },
    { position: 9, name: '最終結果', description: '最可能的結果' }
  ]
} as const;
