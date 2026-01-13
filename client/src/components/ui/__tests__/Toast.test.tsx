import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@/test/utils'
import { Toast, ToastContainer } from '../Toast'
import { act } from 'react'

describe('Toast', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render toast with message', () => {
    render(
      <Toast
        id="test-1"
        type="success"
        message="操作成功"
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('操作成功')).toBeInTheDocument()
  })

  it('should auto-close after duration', () => {
    render(
      <Toast
        id="test-1"
        type="success"
        message="測試"
        duration={3000}
        onClose={mockOnClose}
      />
    )

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    // Should have been called after advancing time
    expect(mockOnClose).toHaveBeenCalledWith('test-1')
  })

  it('should close when close button clicked', () => {
    render(
      <Toast
        id="test-1"
        type="error"
        message="錯誤"
        onClose={mockOnClose}
      />
    )

    const closeButton = screen.getByLabelText('關閉通知')
    closeButton.click()

    expect(mockOnClose).toHaveBeenCalledWith('test-1')
  })

  it('should render different toast types with correct styles', () => {
    const types: Array<'success' | 'error' | 'warning' | 'info'> = [
      'success',
      'error',
      'warning',
      'info',
    ]

    types.forEach((type) => {
      const { container, unmount } = render(
        <Toast id={type} type={type} message="測試" onClose={mockOnClose} />
      )

      const toast = container.firstChild as HTMLElement

      // Check if toast has the correct color class for each type
      if (type === 'success') {
        expect(toast.className).toContain('bg-green-900')
      } else if (type === 'error') {
        expect(toast.className).toContain('bg-red-900')
      } else if (type === 'warning') {
        expect(toast.className).toContain('bg-yellow-900')
      } else if (type === 'info') {
        expect(toast.className).toContain('bg-blue-900')
      }

      unmount()
    })
  })

  it('should have correct ARIA attributes', () => {
    render(
      <Toast
        id="test-1"
        type="info"
        message="資訊"
        onClose={mockOnClose}
      />
    )

    const toast = screen.getByRole('alert')
    expect(toast).toHaveAttribute('aria-live', 'assertive')
  })

  it('should not auto-close if duration is 0', () => {
    render(
      <Toast
        id="test-1"
        type="success"
        message="測試"
        duration={0}
        onClose={mockOnClose}
      />
    )

    // Fast forward time - should not close
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    // Should not have been called
    expect(mockOnClose).not.toHaveBeenCalled()
  })
})

describe('ToastContainer', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render multiple toasts', () => {
    const toasts = [
      { id: '1', type: 'success' as const, message: '成功 1', onClose: mockOnClose },
      { id: '2', type: 'error' as const, message: '錯誤 2', onClose: mockOnClose },
      { id: '3', type: 'info' as const, message: '資訊 3', onClose: mockOnClose },
    ]

    render(<ToastContainer toasts={toasts} />)

    expect(screen.getByText('成功 1')).toBeInTheDocument()
    expect(screen.getByText('錯誤 2')).toBeInTheDocument()
    expect(screen.getByText('資訊 3')).toBeInTheDocument()
  })

  it('should render empty container when no toasts', () => {
    const { container } = render(<ToastContainer toasts={[]} />)

    const toastContainer = container.firstChild as HTMLElement
    expect(toastContainer.children).toHaveLength(0)
  })

  it('should have correct ARIA attributes for container', () => {
    const { container } = render(<ToastContainer toasts={[]} />)

    const toastContainer = container.firstChild as HTMLElement
    expect(toastContainer).toHaveAttribute('aria-live', 'polite')
    expect(toastContainer).toHaveAttribute('aria-atomic', 'false')
  })
})
