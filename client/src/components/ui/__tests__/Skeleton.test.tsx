import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils'
import { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar } from '../Skeleton'

describe('Skeleton', () => {
  it('should render basic skeleton', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('bg-slate-700/50')
  })

  it('should render text variant with multiple lines', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />)
    const skeletons = container.querySelectorAll('.animate-pulse')

    expect(skeletons).toHaveLength(3)
  })

  it('should render last line shorter for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />)
    const lines = container.querySelectorAll('.animate-pulse')
    const lastLine = lines[lines.length - 1] as HTMLElement

    expect(lastLine).toHaveClass('w-3/4')
  })

  it('should render circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('rounded-full')
  })

  it('should render rectangular variant by default', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('rounded')
    expect(skeleton).not.toHaveClass('rounded-full')
  })

  it('should apply custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('custom-class')
  })

  it('should have accessibility attributes', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveAttribute('aria-busy', 'true')
    expect(skeleton).toHaveAttribute('aria-live', 'polite')
  })

  it('should apply custom width and height', () => {
    const { container } = render(<Skeleton width={100} height={50} />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton.style.width).toBe('100px')
    expect(skeleton.style.height).toBe('50px')
  })
})

describe('SkeletonCard', () => {
  it('should render card skeleton with correct dimensions', () => {
    const { container } = render(<SkeletonCard />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('w-24')
    expect(skeleton).toHaveClass('h-36')
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('should have border and rounded corners', () => {
    const { container } = render(<SkeletonCard />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('rounded-lg')
    expect(skeleton).toHaveClass('border')
    expect(skeleton).toHaveClass('border-slate-600')
  })
})

describe('SkeletonText', () => {
  it('should render text skeleton with default 3 lines', () => {
    const { container } = render(<SkeletonText />)
    const skeletons = container.querySelectorAll('.animate-pulse')

    expect(skeletons).toHaveLength(3)
  })

  it('should render text skeleton with custom number of lines', () => {
    const { container } = render(<SkeletonText lines={5} />)
    const skeletons = container.querySelectorAll('.animate-pulse')

    expect(skeletons).toHaveLength(5)
  })
})

describe('SkeletonAvatar', () => {
  it('should render circular skeleton', () => {
    const { container } = render(<SkeletonAvatar />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toHaveClass('rounded-full')
  })

  it('should have correct dimensions', () => {
    const { container } = render(<SkeletonAvatar />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton.style.width).toBe('40px')
    expect(skeleton.style.height).toBe('40px')
  })
})
