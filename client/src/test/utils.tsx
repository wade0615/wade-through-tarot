import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function (can be extended with providers)
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options })
}

// Re-export everything from Testing Library
export * from '@testing-library/react'
export { customRender as render }

// Mock tarot card data for testing
export const mockTarotCard = {
  id: 'fool',
  name: '愚者',
  nameEn: 'The Fool',
  suit: 'major' as const,
  number: 0,
  meaning: {
    upright: ['新開始', '冒險精神', '純真'],
    reversed: ['魯莽', '缺乏經驗', '愚蠢決定'],
  },
  description: '愚者牌代表新的開始和無限的可能性',
  keywords: ['開始', '冒險', '純真', '自由'],
  imageUrl: '/cards/fool.webp',
}

export const mockTarotCards = [
  mockTarotCard,
  {
    id: 'magician',
    name: '魔術師',
    nameEn: 'The Magician',
    suit: 'major' as const,
    number: 1,
    meaning: {
      upright: ['創造力', '意志力', '技能'],
      reversed: ['操控', '缺乏計劃', '才能未發揮'],
    },
    description: '魔術師代表創造力和實現目標的能力',
    keywords: ['創造', '意志', '技能'],
    imageUrl: '/cards/magician.webp',
  },
]
