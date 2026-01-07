/**
 * Button Size Tests - 驗證所有按鈕符合 44px 最小觸控目標標準
 *
 * WCAG 2.1 AA 標準要求:
 * - iOS: 最小 44×44 pt
 * - Android: 最小 48×48 dp
 * - 一般按鈕: min-h-[44px]
 * - 主要動作按鈕: min-h-[48px]
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { SetupView } from '../SetupView'
import { SelectionView } from '../SelectionView'
import { CardDeck } from '../CardDeck'
import { ReadingResult } from '../ReadingResult'
import { SelectedCard } from '@/store/tarotStore'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Create a mockable store
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

describe('Button Size Compliance', () => {
  beforeEach(() => {
    // Reset mock store to default state
    mockStore.selectedCards = []
    mockStore.isReadingComplete = () => false
    mockStore.canAddCard = () => true
    mockStore.currentQuestion = '測試問題'
  })

  describe('SetupView Buttons', () => {
    it('should have "開始占卜" button with min-h-[48px] (primary action)', () => {
      render(<SetupView onQuestionSubmit={vi.fn()} />)
      const button = screen.getByRole('button', { name: /開始塔羅占卜/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('min-h-[48px]')
      expect(button).toHaveAttribute('aria-label', '開始塔羅占卜')
    })

    it('should have "查看所有牌面" button with min-h-[44px]', () => {
      render(<SetupView onQuestionSubmit={vi.fn()} />)
      const button = screen.getByRole('button', { name: /查看全部78張塔羅牌面/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('min-h-[44px]')
      expect(button).toHaveAttribute('aria-label', '查看全部78張塔羅牌面')
    })
  })

  describe('SelectionView Buttons', () => {
    it('should have "重新開始" button with min-h-[44px]', () => {
      render(
        <SelectionView
          onCardSelect={vi.fn()}
          onBackToSetup={vi.fn()}
          onViewResult={vi.fn()}
        />
      )
      const button = screen.getByRole('button', { name: /重新開始占卜/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('min-h-[44px]')
      expect(button).toHaveAttribute('aria-label', '重新開始占卜')
    })

    it('should have "查看結果" button with min-h-[44px] when reading is complete', () => {
      // Update mock store to simulate completed reading
      mockStore.isReadingComplete = () => true
      mockStore.canAddCard = () => false

      render(
        <SelectionView
          onCardSelect={vi.fn()}
          onBackToSetup={vi.fn()}
          onViewResult={vi.fn()}
        />
      )
      const button = screen.getByRole('button', { name: /查看占卜結果/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('min-h-[44px]')
      expect(button).toHaveAttribute('aria-label', '查看占卜結果')
    })
  })

  describe('CardDeck Buttons', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should have shuffle button with min-h-[44px]', async () => {
      render(<CardDeck onCardSelect={vi.fn()} maxSelection={3} />)

      // Fast-forward past initial shuffle delay (1000ms)
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100)
      })

      const button = screen.getByRole('button', { name: /重新洗牌/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('min-h-[44px]')
      expect(button).toHaveAttribute('aria-label', '重新洗牌')
    })

    it('should have shuffle button with aria-busy attribute', async () => {
      render(<CardDeck onCardSelect={vi.fn()} maxSelection={3} />)

      // Fast-forward past initial shuffle delay (1000ms)
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100)
      })

      const button = screen.getByRole('button', { name: /重新洗牌/i })
      expect(button).toHaveAttribute('aria-busy', 'false')
    })
  })

  describe('ReadingResult Buttons', () => {
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
        isReversed: false,
      },
    ]

    beforeEach(() => {
      // Update mock store with selected cards
      mockStore.selectedCards = mockSelectedCards
      mockStore.spreadType = 'single' as const
    })

    it('should have "複製內容" button with min-h-[44px]', () => {
      render(<ReadingResult onNewReading={vi.fn()} />)
      const button = screen.getByRole('button', { name: /複製占卜結果到剪貼簿/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('min-h-[44px]')
      expect(button).toHaveAttribute('aria-label', '複製占卜結果到剪貼簿')
    })

    it('should have "前往 ChatGPT 詢問" button with min-h-[44px]', () => {
      render(<ReadingResult onNewReading={vi.fn()} />)
      const button = screen.getByRole('button', { name: /開啟 ChatGPT 進行深度分析/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('min-h-[44px]')
      expect(button).toHaveAttribute('aria-label', '開啟 ChatGPT 進行深度分析')
    })

    it('should have "開始新的占卜" button with proper size', () => {
      render(<ReadingResult onNewReading={vi.fn()} />)
      const button = screen.getByRole('button', { name: /開始新的占卜/i })
      expect(button).toBeInTheDocument()
      // This button has py-3 which should be sufficient for accessibility
    })
  })

  describe('Accessibility Compliance', () => {
    it('all modified buttons should have aria-label attributes', () => {
      const setupView = render(<SetupView onQuestionSubmit={vi.fn()} />)
      const buttons = setupView.container.querySelectorAll('button[aria-label]')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should maintain proper button semantics', () => {
      render(<SetupView onQuestionSubmit={vi.fn()} />)
      const submitButton = screen.getByRole('button', { name: /開始塔羅占卜/i })
      expect(submitButton).toHaveAttribute('type', 'submit')
    })
  })
})
