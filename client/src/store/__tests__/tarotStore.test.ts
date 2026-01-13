import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTarotStore } from '../tarotStore'
import { mockTarotCard, mockTarotCards } from '@/test/utils'

describe('tarotStore', () => {
  // Reset store before each test
  beforeEach(() => {
    const store = useTarotStore.getState()
    store.clearSelection()
    store.endReading()
    store.setSpreadType('three-card')
    store.setAvailableCards([])
    // Clear reading history
    useTarotStore.setState({ readingHistory: [] })
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useTarotStore.getState()
      expect(state.currentQuestion).toBe('')
      expect(state.selectedCards).toEqual([])
      expect(state.availableCards).toEqual([])
      expect(state.isReading).toBe(false)
      expect(state.spreadType).toBe('three-card')
      expect(state.readingHistory).toEqual([])
    })
  })

  describe('setQuestion', () => {
    it('should set the current question', () => {
      const store = useTarotStore.getState()
      store.setQuestion('測試問題')
      expect(useTarotStore.getState().currentQuestion).toBe('測試問題')
    })

    it('should update question multiple times', () => {
      const store = useTarotStore.getState()
      store.setQuestion('第一個問題')
      expect(useTarotStore.getState().currentQuestion).toBe('第一個問題')

      store.setQuestion('第二個問題')
      expect(useTarotStore.getState().currentQuestion).toBe('第二個問題')
    })
  })

  describe('setSpreadType', () => {
    it('should set spread type to single', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('single')
      expect(useTarotStore.getState().spreadType).toBe('single')
    })

    it('should set spread type to three-card', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('three-card')
      expect(useTarotStore.getState().spreadType).toBe('three-card')
    })

    it('should set spread type to celtic-cross', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('celtic-cross')
      expect(useTarotStore.getState().spreadType).toBe('celtic-cross')
    })

    it('should clear selected cards when changing spread type', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCard, 0)
      expect(useTarotStore.getState().selectedCards.length).toBe(1)

      store.setSpreadType('single')
      expect(useTarotStore.getState().selectedCards.length).toBe(0)
    })
  })

  describe('getMaxCards', () => {
    it('should return 1 for single spread', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('single')
      expect(store.getMaxCards()).toBe(1)
    })

    it('should return 3 for three-card spread', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('three-card')
      expect(store.getMaxCards()).toBe(3)
    })

    it('should return 10 for celtic-cross spread', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('celtic-cross')
      expect(store.getMaxCards()).toBe(10)
    })
  })

  describe('selectCard', () => {
    it('should add a card to selected cards', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCard, 0)

      const state = useTarotStore.getState()
      expect(state.selectedCards.length).toBe(1)
      expect(state.selectedCards[0].card).toEqual(mockTarotCard)
      expect(state.selectedCards[0].position).toBe(0)
      expect(state.selectedCards[0].isReversed).toBe(false)
    })

    it('should add a reversed card', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCard, 0, true)

      const state = useTarotStore.getState()
      expect(state.selectedCards[0].isReversed).toBe(true)
    })

    it('should sort cards by position', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCards[0], 2)
      store.selectCard(mockTarotCards[1], 0)

      const state = useTarotStore.getState()
      expect(state.selectedCards[0].position).toBe(0)
      expect(state.selectedCards[1].position).toBe(2)
    })

    it('should not add card when max cards reached', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('single')
      store.selectCard(mockTarotCards[0], 0)
      store.selectCard(mockTarotCards[1], 1)

      const state = useTarotStore.getState()
      expect(state.selectedCards.length).toBe(1)
    })

    it('should not add card to already occupied position', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCards[0], 0)
      store.selectCard(mockTarotCards[1], 0)

      const state = useTarotStore.getState()
      expect(state.selectedCards.length).toBe(1)
      expect(state.selectedCards[0].card).toEqual(mockTarotCards[0])
    })
  })

  describe('removeCard', () => {
    it('should remove a card by position', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCards[0], 0)
      store.selectCard(mockTarotCards[1], 1)

      expect(useTarotStore.getState().selectedCards.length).toBe(2)

      store.removeCard(0)
      const state = useTarotStore.getState()
      expect(state.selectedCards.length).toBe(1)
      expect(state.selectedCards[0].position).toBe(1)
    })

    it('should do nothing if position does not exist', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCard, 0)
      store.removeCard(5)

      expect(useTarotStore.getState().selectedCards.length).toBe(1)
    })
  })

  describe('clearSelection', () => {
    it('should clear all selected cards', () => {
      const store = useTarotStore.getState()
      store.selectCard(mockTarotCards[0], 0)
      store.selectCard(mockTarotCards[1], 1)

      expect(useTarotStore.getState().selectedCards.length).toBe(2)

      store.clearSelection()
      expect(useTarotStore.getState().selectedCards.length).toBe(0)
    })

    it('should keep current question when clearing selection', () => {
      const store = useTarotStore.getState()
      store.setQuestion('測試問題')
      store.selectCard(mockTarotCard, 0)
      store.clearSelection()

      expect(useTarotStore.getState().currentQuestion).toBe('測試問題')
    })
  })

  describe('startReading and endReading', () => {
    it('should set isReading to true when starting', () => {
      const store = useTarotStore.getState()
      store.startReading()
      expect(useTarotStore.getState().isReading).toBe(true)
    })

    it('should set isReading to false and clear state when ending', () => {
      const store = useTarotStore.getState()
      store.setQuestion('測試問題')
      store.selectCard(mockTarotCard, 0)
      store.startReading()

      store.endReading()
      const state = useTarotStore.getState()
      expect(state.isReading).toBe(false)
      expect(state.selectedCards.length).toBe(0)
      expect(state.currentQuestion).toBe('')
    })
  })

  describe('saveReading', () => {
    it('should save a reading to history', () => {
      const store = useTarotStore.getState()
      store.setQuestion('我的未來如何？')
      store.selectCard(mockTarotCard, 0)
      store.saveReading()

      const state = useTarotStore.getState()
      expect(state.readingHistory.length).toBe(1)
      expect(state.readingHistory[0].question).toBe('我的未來如何？')
      expect(state.readingHistory[0].selectedCards.length).toBe(1)
      expect(state.readingHistory[0].spreadType).toBe('three-card')
    })

    it('should not save reading with no cards', () => {
      const store = useTarotStore.getState()
      store.setQuestion('測試問題')
      store.saveReading()

      expect(useTarotStore.getState().readingHistory.length).toBe(0)
    })

    it('should generate unique IDs for readings', async () => {
      const store = useTarotStore.getState()
      store.setQuestion('問題1')
      store.selectCard(mockTarotCards[0], 0)
      store.saveReading()

      // Wait 1ms to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1))

      store.setQuestion('問題2')
      store.selectCard(mockTarotCards[1], 0)
      store.saveReading()

      const state = useTarotStore.getState()
      expect(state.readingHistory[0].id).not.toBe(state.readingHistory[1].id)
    })

    it('should add new readings to the beginning of history', () => {
      const store = useTarotStore.getState()

      store.setQuestion('第一個問題')
      store.selectCard(mockTarotCards[0], 0)
      store.saveReading()

      store.clearSelection()
      store.setQuestion('第二個問題')
      store.selectCard(mockTarotCards[1], 0)
      store.saveReading()

      const state = useTarotStore.getState()
      expect(state.readingHistory.length).toBe(2)
      expect(state.readingHistory[0].question).toBe('第二個問題')
      expect(state.readingHistory[1].question).toBe('第一個問題')
    })
  })

  describe('setAvailableCards and shuffleCards', () => {
    it('should set available cards', () => {
      const store = useTarotStore.getState()
      store.setAvailableCards(mockTarotCards)

      expect(useTarotStore.getState().availableCards).toEqual(mockTarotCards)
    })

    it('should shuffle cards', () => {
      const store = useTarotStore.getState()

      // Mock Math.random to control shuffle behavior
      const mockRandom = vi.spyOn(Math, 'random')
      mockRandom.mockReturnValueOnce(0.5).mockReturnValueOnce(0.3)

      const originalCards = [...mockTarotCards]
      store.setAvailableCards(originalCards)
      store.shuffleCards()

      const state = useTarotStore.getState()
      // Should have same cards
      expect(state.availableCards.length).toBe(originalCards.length)
      expect(state.availableCards).toContainEqual(originalCards[0])
      expect(state.availableCards).toContainEqual(originalCards[1])

      mockRandom.mockRestore()
    })

    it('should not modify original array when shuffling', () => {
      const store = useTarotStore.getState()
      const originalCards = [...mockTarotCards]
      store.setAvailableCards(originalCards)
      store.shuffleCards()

      // Original array should remain unchanged
      expect(mockTarotCards[0]).toEqual(originalCards[0])
      expect(mockTarotCards[1]).toEqual(originalCards[1])
    })
  })

  describe('isReadingComplete', () => {
    it('should return false when no cards selected', () => {
      const store = useTarotStore.getState()
      expect(store.isReadingComplete()).toBe(false)
    })

    it('should return false when cards selected but not complete', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('three-card')
      store.selectCard(mockTarotCards[0], 0)
      expect(store.isReadingComplete()).toBe(false)
    })

    it('should return true when all cards selected for single spread', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('single')
      store.selectCard(mockTarotCard, 0)
      expect(store.isReadingComplete()).toBe(true)
    })

    it('should return true when all cards selected for three-card spread', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('three-card')
      store.selectCard(mockTarotCards[0], 0)
      store.selectCard(mockTarotCards[1], 1)
      store.selectCard(mockTarotCards[0], 2)
      expect(store.isReadingComplete()).toBe(true)
    })
  })

  describe('canAddCard', () => {
    it('should return true when can add more cards', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('three-card')
      store.selectCard(mockTarotCard, 0)
      expect(store.canAddCard()).toBe(true)
    })

    it('should return false when max cards reached', () => {
      const store = useTarotStore.getState()
      store.setSpreadType('single')
      store.selectCard(mockTarotCard, 0)
      expect(store.canAddCard()).toBe(false)
    })

    it('should return true initially', () => {
      const store = useTarotStore.getState()
      expect(store.canAddCard()).toBe(true)
    })
  })
})
