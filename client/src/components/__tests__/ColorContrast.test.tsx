/**
 * Color Contrast Tests - 驗證色彩對比度符合 WCAG 2.1 AA 標準
 *
 * WCAG 2.1 AA 標準要求:
 * - 正文文字: 最小對比度 4.5:1
 * - 大文字 (18pt+ 或 14pt+ 粗體): 最小對比度 3:1
 * - UI 元件: 最小對比度 3:1
 *
 * 色彩對比度參考:
 * - text-slate-300 on dark bg: ~8:1 (符合 AA)
 * - text-slate-400 on dark bg: ~3.5:1 (不符合正文 AA)
 * - text-slate-500 on dark bg: ~2.5:1 (不符合 AA)
 * - bg-red-900 + text-red-50: ~10:1 (符合 AAA)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { SetupView } from '../SetupView'
import { ReadingResult } from '../ReadingResult'
import { SpreadLayout } from '../SpreadLayout'
import { SelectedCard } from '@/store/tarotStore'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

const mockStore = {
  currentQuestion: '測試問題',
  setQuestion: vi.fn(),
  spreadType: 'single' as const,
  setSpreadType: vi.fn(),
  selectedCards: [] as SelectedCard[],
  isReadingComplete: () => false,
  getMaxCards: () => 1,
  canAddCard: () => true,
  clearSelection: vi.fn(),
}

vi.mock('@/store/tarotStore', () => ({
  useTarotStore: () => mockStore,
}))

vi.mock('@/components/GoogleAds', () => ({
  ResponsiveAd: () => null,
}))

vi.mock('@/config/ads', () => ({
  getAdSlot: () => 'test-slot',
}))

vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
  }),
}))

describe('Color Contrast - WCAG AA Compliance', () => {
  beforeEach(() => {
    // Reset mock store to default state
    mockStore.selectedCards = []
    mockStore.spreadType = 'single' as const
    mockStore.currentQuestion = '測試問題'
  })

  describe('SetupView Color Contrast', () => {
    it('should have sufficient contrast for card count text (text-slate-300)', () => {
      const { container } = render(<SetupView onQuestionSubmit={vi.fn()} />)

      // Find the "X 張牌" text elements
      const cardCountElements = Array.from(container.querySelectorAll('p')).filter(
        (p) => p.textContent?.includes('張牌')
      )

      expect(cardCountElements.length).toBeGreaterThan(0)
      cardCountElements.forEach((el) => {
        // Should use text-slate-300 (meets WCAG AA at ~8:1 contrast)
        expect(el.className).toContain('text-slate-300')
        // Should NOT use text-slate-500 (only ~2.5:1 contrast - fails AA)
        expect(el.className).not.toContain('text-slate-500')
      })
    })

    it('should have sufficient contrast for help text (text-slate-300)', () => {
      const { container } = render(<SetupView onQuestionSubmit={vi.fn()} />)

      const helpText = container.querySelector('#question-help')
      expect(helpText).toBeInTheDocument()
      expect(helpText?.textContent).toContain('輸入您的問題')

      // Should use text-slate-300 (meets WCAG AA)
      expect(helpText?.className).toContain('text-slate-300')
      // Should NOT use text-gray-400 or text-slate-400 (insufficient contrast)
      expect(helpText?.className).not.toContain('text-gray-400')
      expect(helpText?.className).not.toContain('text-slate-400')
    })
  })

  describe('ReadingResult Color Contrast', () => {
    const mockSelectedCards = [
      {
        card: {
          id: '0',
          name: '愚者',
          nameEn: 'The Fool',
          description: '測試描述',
          meaning: {
            upright: ['正位含義1'],
            reversed: ['逆位含義1'],
          },
          keywords: ['關鍵詞1'],
          image: '/test.jpg',
        },
        isReversed: true,
        position: 0,
      },
    ]

    it('should have high contrast for reversed badge (bg-red-900 text-red-50)', () => {
      mockStore.selectedCards = mockSelectedCards

      const { container } = render(<ReadingResult onNewReading={vi.fn()} />)

      const reversedBadge = Array.from(container.querySelectorAll('span')).find(
        (span) => span.textContent === '逆位'
      )

      expect(reversedBadge).toBeInTheDocument()

      // Should use bg-red-900 (solid background, not transparent)
      expect(reversedBadge?.className).toContain('bg-red-900')
      expect(reversedBadge?.className).not.toContain('bg-red-900/30')

      // Should use text-red-50 (high contrast white text)
      expect(reversedBadge?.className).toContain('text-red-50')
      expect(reversedBadge?.className).not.toContain('text-red-300')

      // Should use solid border border-red-600
      expect(reversedBadge?.className).toContain('border-red-600')
      expect(reversedBadge?.className).not.toContain('border-red-800/50')
    })

    it('should not show reversed badge for upright cards', () => {
      const uprightCards = [
        {
          ...mockSelectedCards[0],
          isReversed: false,
        },
      ]
      mockStore.selectedCards = uprightCards

      const { container } = render(<ReadingResult onNewReading={vi.fn()} />)

      const reversedBadge = Array.from(container.querySelectorAll('span')).find(
        (span) => span.textContent === '逆位'
      )

      // Badge should not exist for upright cards
      expect(reversedBadge).toBeUndefined()
    })
  })

  describe('SpreadLayout Color Contrast', () => {
    it('should have sufficient contrast for position descriptions in single card spread', () => {
      mockStore.spreadType = 'single' as const
      const { container } = render(<SpreadLayout />)

      // Find the description text element
      const descriptions = container.querySelectorAll('.text-xs')
      const descriptionElements = Array.from(descriptions).filter(
        (el) => el.className.includes('max-w-')
      )

      expect(descriptionElements.length).toBeGreaterThan(0)
      descriptionElements.forEach((el) => {
        // Should use text-slate-300 (meets WCAG AA)
        expect(el.className).toContain('text-slate-300')
        // Should NOT use text-slate-400 (insufficient contrast)
        expect(el.className).not.toContain('text-slate-400')
      })
    })

    it('should have sufficient contrast for position descriptions in three card spread', () => {
      mockStore.spreadType = 'three-card' as const
      const { container } = render(<SpreadLayout />)

      // Find description elements in three-card spread
      const descriptions = container.querySelectorAll('.text-xs')
      const descriptionElements = Array.from(descriptions).filter(
        (el) => el.className.includes('max-w-')
      )

      expect(descriptionElements.length).toBeGreaterThan(0)
      descriptionElements.forEach((el) => {
        // Should use text-slate-300 (meets WCAG AA)
        expect(el.className).toContain('text-slate-300')
        // Should NOT use text-slate-400 (insufficient contrast)
        expect(el.className).not.toContain('text-slate-400')
      })
    })
  })

  describe('Overall WCAG Compliance', () => {
    it('should not use text-slate-500 for small text anywhere', () => {
      const setupView = render(<SetupView onQuestionSubmit={vi.fn()} />)

      // Check that no small text elements use text-slate-500
      const allElements = setupView.container.querySelectorAll('*')
      const smallTextWithSlate500 = Array.from(allElements).filter(
        (el) =>
          (el.className.includes('text-xs') || el.className.includes('text-sm')) &&
          el.className.includes('text-slate-500')
      )

      expect(smallTextWithSlate500.length).toBe(0)
    })

    it('should not use transparent backgrounds with light text for badges', () => {
      const mockCards = [
        {
          card: {
            id: '0',
            name: '測試',
            nameEn: 'Test',
            description: '描述',
            meaning: { upright: ['正位'], reversed: ['逆位'] },
            keywords: ['關鍵詞'],
            image: '/test.jpg',
          },
          isReversed: true,
          position: 0,
        },
      ]
      mockStore.selectedCards = mockCards

      const { container } = render(<ReadingResult onNewReading={vi.fn()} />)

      // Check that reversed badge doesn't use transparent background
      const badges = container.querySelectorAll('span')
      const reversedBadge = Array.from(badges).find(
        (badge) => badge.textContent === '逆位'
      )

      if (reversedBadge) {
        // Should NOT use transparent backgrounds like bg-red-900/30
        expect(reversedBadge.className).not.toMatch(/bg-\w+-\d+\/\d+/)
      }
    })
  })
})
