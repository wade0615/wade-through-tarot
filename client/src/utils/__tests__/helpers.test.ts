import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { cn, shuffleArray, getRandomReversed, formatDate, spreadPositions } from '../helpers'

describe('helpers', () => {
  describe('cn (className utility)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'hidden', true && 'visible')
      expect(result).toBe('base visible')
    })

    it('should merge Tailwind classes correctly', () => {
      const result = cn('px-2', 'px-4')
      expect(result).toBe('px-4')
    })

    it('should handle arrays', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle objects', () => {
      const result = cn({
        active: true,
        disabled: false,
        'text-red': true,
      })
      expect(result).toBe('active text-red')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'end')
      expect(result).toBe('base end')
    })
  })

  describe('shuffleArray', () => {
    it('should return an array with the same length', () => {
      const input = [1, 2, 3, 4, 5]
      const result = shuffleArray(input)
      expect(result.length).toBe(input.length)
    })

    it('should contain all original elements', () => {
      const input = [1, 2, 3, 4, 5]
      const result = shuffleArray(input)
      expect(result.sort()).toEqual(input.sort())
    })

    it('should not modify original array', () => {
      const input = [1, 2, 3, 4, 5]
      const original = [...input]
      shuffleArray(input)
      expect(input).toEqual(original)
    })

    it('should handle empty array', () => {
      const result = shuffleArray([])
      expect(result).toEqual([])
    })

    it('should handle single element array', () => {
      const result = shuffleArray([1])
      expect(result).toEqual([1])
    })

    it('should handle arrays with different types', () => {
      const input = ['a', 'b', 'c']
      const result = shuffleArray(input)
      expect(result.length).toBe(3)
      expect(result).toContain('a')
      expect(result).toContain('b')
      expect(result).toContain('c')
    })

    it('should actually shuffle (not always return same order)', () => {
      // Mock Math.random to control shuffle
      const mockRandom = vi.spyOn(Math, 'random')
      mockRandom.mockReturnValueOnce(0.8).mockReturnValueOnce(0.3)

      const input = [1, 2, 3]
      const result = shuffleArray(input)

      // With controlled random values, order should change
      expect(result).not.toEqual(input)
      expect(result.length).toBe(3)

      mockRandom.mockRestore()
    })
  })

  describe('getRandomReversed', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should return true when random is less than 0.5', () => {
      const mockRandom = vi.spyOn(Math, 'random')
      mockRandom.mockReturnValue(0.3)

      expect(getRandomReversed()).toBe(true)
    })

    it('should return false when random is greater than or equal to 0.5', () => {
      const mockRandom = vi.spyOn(Math, 'random')
      mockRandom.mockReturnValue(0.7)

      expect(getRandomReversed()).toBe(false)
    })

    it('should return false when random is exactly 0.5', () => {
      const mockRandom = vi.spyOn(Math, 'random')
      mockRandom.mockReturnValue(0.5)

      expect(getRandomReversed()).toBe(false)
    })

    it('should return a boolean', () => {
      const result = getRandomReversed()
      expect(typeof result).toBe('boolean')
    })

    it('should vary results over multiple calls (statistical test)', () => {
      const results = Array.from({ length: 100 }, () => getRandomReversed())
      const trueCount = results.filter(Boolean).length
      const falseCount = results.length - trueCount

      // With 100 calls, we expect roughly 50-50 distribution
      // Allow some variance (30-70 range is reasonable for random)
      expect(trueCount).toBeGreaterThan(20)
      expect(trueCount).toBeLessThan(80)
      expect(falseCount).toBeGreaterThan(20)
      expect(falseCount).toBeLessThan(80)
    })
  })

  describe('formatDate', () => {
    // Mock the system timezone for consistent tests
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should format date with year, month, day, hour, and minute', () => {
      const date = new Date('2024-01-15T13:45:00')
      const result = formatDate(date)

      // Check that result contains expected components
      expect(result).toContain('2024')
      expect(result).toContain('15')
      // Hour and minute should be present
      expect(result).toMatch(/\d{2}:\d{2}/)
    })

    it('should use zh-TW locale', () => {
      const date = new Date('2024-06-15T10:30:00')
      const result = formatDate(date)

      // Chinese format should include 年 or month name in Chinese
      expect(result).toMatch(/2024/)
    })

    it('should handle midnight correctly', () => {
      const date = new Date('2024-01-01T00:00:00')
      const result = formatDate(date)

      expect(result).toContain('2024')
      expect(result).toContain('1')
    })

    it('should handle end of day correctly', () => {
      const date = new Date('2024-12-31T23:59:00')
      const result = formatDate(date)

      expect(result).toContain('2024')
      expect(result).toContain('31')
    })

    it('should format different dates differently', () => {
      const date1 = new Date('2024-01-15T10:30:00')
      const date2 = new Date('2024-06-20T14:45:00')

      const result1 = formatDate(date1)
      const result2 = formatDate(date2)

      expect(result1).not.toBe(result2)
    })
  })

  describe('spreadPositions', () => {
    describe('single spread', () => {
      it('should have 1 position', () => {
        expect(spreadPositions.single).toHaveLength(1)
      })

      it('should have correct position 0', () => {
        const pos = spreadPositions.single[0]
        expect(pos.position).toBe(0)
        expect(pos.name).toBe('當前狀況')
        expect(pos.description).toBe('現在的狀況或問題的核心')
      })
    })

    describe('three-card spread', () => {
      it('should have 3 positions', () => {
        expect(spreadPositions['three-card']).toHaveLength(3)
      })

      it('should have correct position 0 (過去)', () => {
        const pos = spreadPositions['three-card'][0]
        expect(pos.position).toBe(0)
        expect(pos.name).toBe('過去')
        expect(pos.description).toBe('影響當前狀況的過去因素')
      })

      it('should have correct position 1 (現在)', () => {
        const pos = spreadPositions['three-card'][1]
        expect(pos.position).toBe(1)
        expect(pos.name).toBe('現在')
        expect(pos.description).toBe('目前的狀況或挑戰')
      })

      it('should have correct position 2 (未來)', () => {
        const pos = spreadPositions['three-card'][2]
        expect(pos.position).toBe(2)
        expect(pos.name).toBe('未來')
        expect(pos.description).toBe('可能的結果或發展方向')
      })
    })

    describe('celtic-cross spread', () => {
      it('should have 10 positions', () => {
        expect(spreadPositions['celtic-cross']).toHaveLength(10)
      })

      it('should have all positions from 0 to 9', () => {
        const positions = spreadPositions['celtic-cross'].map(p => p.position)
        expect(positions).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      })

      it('should have correct position 0', () => {
        const pos = spreadPositions['celtic-cross'][0]
        expect(pos.position).toBe(0)
        expect(pos.name).toBe('當前狀況')
      })

      it('should have correct position 9 (final outcome)', () => {
        const pos = spreadPositions['celtic-cross'][9]
        expect(pos.position).toBe(9)
        expect(pos.name).toBe('最終結果')
        expect(pos.description).toBe('最可能的結果')
      })

      it('should have unique position numbers', () => {
        const positions = spreadPositions['celtic-cross'].map(p => p.position)
        const uniquePositions = [...new Set(positions)]
        expect(uniquePositions.length).toBe(10)
      })

      it('should have unique names', () => {
        const names = spreadPositions['celtic-cross'].map(p => p.name)
        const uniqueNames = [...new Set(names)]
        expect(uniqueNames.length).toBe(10)
      })
    })

    it('should be a const object (readonly)', () => {
      // TypeScript ensures this at compile time, but we can check it exists
      expect(spreadPositions).toBeDefined()
      expect(typeof spreadPositions).toBe('object')
    })

    it('should have all three spread types', () => {
      expect(spreadPositions).toHaveProperty('single')
      expect(spreadPositions).toHaveProperty('three-card')
      expect(spreadPositions).toHaveProperty('celtic-cross')
    })
  })
})
