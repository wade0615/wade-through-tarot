import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { TarotCardComponent } from '../TarotCard'
import { mockTarotCard } from '@/test/utils'

describe('TarotCardComponent', () => {
  describe('Card Back Display', () => {
    it('should show card back when showBack is true', () => {
      render(
        <TarotCardComponent card={mockTarotCard} showBack={true} />
      )

      expect(screen.getByText('TAROT')).toBeInTheDocument()
      expect(screen.getByText('✨')).toBeInTheDocument()
    })

    it('should show card back when card is undefined', () => {
      render(<TarotCardComponent />)

      expect(screen.getByText('TAROT')).toBeInTheDocument()
      expect(screen.getByText('✨')).toBeInTheDocument()
    })
  })

  describe('Card Face Display', () => {
    it('should render card image with correct props', () => {
      render(<TarotCardComponent card={mockTarotCard} />)

      const image = screen.getByAltText(`${mockTarotCard.name} (${mockTarotCard.nameEn})`)
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src')
    })

    it('should show fallback content in DOM (hidden by default)', () => {
      const { container } = render(<TarotCardComponent card={mockTarotCard} />)

      // Fallback content should exist but be hidden
      const fallbackContent = container.querySelector('.fallback-content')
      expect(fallbackContent).toBeInTheDocument()
      expect(fallbackContent).toHaveClass('hidden')
    })
  })

  describe('Reversed State', () => {
    it('should apply rotation when isReversed is true', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} isReversed={true} />
      )

      const cardElement = container.querySelector('.rotate-180')
      expect(cardElement).toBeInTheDocument()
    })

    it('should show reversed indicator when isReversed is true', () => {
      render(<TarotCardComponent card={mockTarotCard} isReversed={true} />)

      expect(screen.getByText('↻')).toBeInTheDocument()
    })

    it('should not show reversed indicator when isReversed is false', () => {
      render(<TarotCardComponent card={mockTarotCard} isReversed={false} />)

      expect(screen.queryByText('↻')).not.toBeInTheDocument()
    })
  })

  describe('Selected State', () => {
    it('should apply selection ring when isSelected is true', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} isSelected={true} />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('ring-2')
      expect(wrapper.className).toContain('ring-blue-400')
    })

    it('should not apply selection ring when isSelected is false', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} isSelected={false} />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).not.toContain('ring-2')
    })
  })

  describe('Flipped State', () => {
    it('should apply pulse animation when isFlipped is true', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} isFlipped={true} />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('animate-pulse')
    })

    it('should not apply pulse animation when isFlipped is false', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} isFlipped={false} />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).not.toContain('animate-pulse')
    })
  })

  describe('Size Variants', () => {
    it('should apply small size classes', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} size="sm" />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('w-16')
      expect(wrapper.className).toContain('h-24')
    })

    it('should apply medium size classes by default', () => {
      const { container } = render(<TarotCardComponent card={mockTarotCard} />)

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('w-24')
      expect(wrapper.className).toContain('h-36')
    })

    it('should apply large size classes', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} size="lg" />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('w-32')
      expect(wrapper.className).toContain('h-48')
    })
  })

  describe('Click Interaction', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = vi.fn()
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} onClick={handleClick} />
      )

      const wrapper = container.firstChild as HTMLElement
      wrapper.click()

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not throw error when clicked without onClick handler', () => {
      const { container } = render(<TarotCardComponent card={mockTarotCard} />)

      const wrapper = container.firstChild as HTMLElement
      expect(() => wrapper.click()).not.toThrow()
    })

    it('should apply hover brightness when onClick is provided', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} onClick={() => {}} />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('hover:brightness-110')
    })
  })

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} className="custom-class" />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('custom-class')
    })

    it('should merge custom className with base classes', () => {
      const { container } = render(
        <TarotCardComponent
          card={mockTarotCard}
          className="custom-class"
          isSelected={true}
        />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('custom-class')
      expect(wrapper.className).toContain('ring-2')
    })
  })

  describe('Combined States', () => {
    it('should handle multiple states simultaneously', () => {
      const handleClick = vi.fn()
      const { container } = render(
        <TarotCardComponent
          card={mockTarotCard}
          isReversed={true}
          isSelected={true}
          isFlipped={true}
          onClick={handleClick}
          size="lg"
          className="custom"
        />
      )

      const wrapper = container.firstChild as HTMLElement

      // Check all applied classes
      expect(wrapper.className).toContain('w-32') // large size
      expect(wrapper.className).toContain('ring-2') // selected
      expect(wrapper.className).toContain('animate-pulse') // flipped
      expect(wrapper.className).toContain('custom') // custom class

      // Check reversed indicator
      expect(screen.getByText('↻')).toBeInTheDocument()

      // Check click handler works
      wrapper.click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should have proper alt text for card image', () => {
      render(<TarotCardComponent card={mockTarotCard} />)

      const image = screen.getByAltText(`${mockTarotCard.name} (${mockTarotCard.nameEn})`)
      expect(image).toBeInTheDocument()
    })

    it('should be keyboard accessible when onClick is provided', () => {
      const { container } = render(
        <TarotCardComponent card={mockTarotCard} onClick={() => {}} />
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain('cursor-pointer')
    })
  })
})
