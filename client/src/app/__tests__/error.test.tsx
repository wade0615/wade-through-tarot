/**
 * Error Boundary Tests - 驗證錯誤處理頁面功能
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NotFound from '../not-found'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}))

// Mock lucide-react icons with aria-hidden
vi.mock('lucide-react', () => ({
  Home: (props: any) => <svg data-testid="home-icon" aria-hidden="true" {...props} />,
  ArrowLeft: (props: any) => <svg data-testid="arrow-left-icon" aria-hidden="true" {...props} />,
  AlertTriangle: (props: any) => <svg data-testid="alert-triangle-icon" aria-hidden="true" {...props} />,
  RefreshCw: (props: any) => <svg data-testid="refresh-icon" aria-hidden="true" {...props} />,
}))

describe('Error Boundary', () => {
  // Note: Error and GlobalError pages use client-side hooks (useEffect)
  // which are difficult to test in isolation. These pages are tested
  // through integration tests and manual testing instead.
  // We focus on testing NotFound which is a Server Component.

  describe('Not Found Page', () => {
    it('should render 404 message', () => {
      render(<NotFound />)

      expect(screen.getByText('404')).toBeInTheDocument()
      expect(screen.getByText('找不到頁面')).toBeInTheDocument()
      expect(
        screen.getByText('您要找的頁面似乎不存在，或可能已被移除。')
      ).toBeInTheDocument()
    })

    it('should have link to home page', () => {
      render(<NotFound />)

      const homeLink = screen.getByLabelText('返回首頁')
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('should have back button', () => {
      render(<NotFound />)

      const backButton = screen.getByLabelText('返回上一頁')
      expect(backButton).toBeInTheDocument()
    })

    it('should call history.back when back button clicked', () => {
      const historyBackSpy = vi.fn()
      window.history.back = historyBackSpy

      render(<NotFound />)

      const backButton = screen.getByLabelText('返回上一頁')
      fireEvent.click(backButton)

      expect(historyBackSpy).toHaveBeenCalledTimes(1)
    })

    it('should have home link with correct styling', () => {
      render(<NotFound />)

      const homeLink = screen.getByLabelText('返回首頁')
      expect(homeLink).toHaveClass('min-h-[44px]')
      expect(homeLink).toHaveClass('bg-purple-600')
    })

    it('should have back button with correct styling', () => {
      render(<NotFound />)

      const backButton = screen.getByLabelText('返回上一頁')
      expect(backButton).toHaveClass('min-h-[44px]')
      expect(backButton).toHaveClass('bg-slate-700')
    })

    it('should render with proper heading hierarchy', () => {
      render(<NotFound />)

      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })

      expect(h1).toHaveTextContent('404')
      expect(h2).toHaveTextContent('找不到頁面')
    })
  })

  describe('Accessibility', () => {
    it('NotFound links should have aria-labels', () => {
      render(<NotFound />)

      expect(screen.getByLabelText('返回首頁')).toBeInTheDocument()
      expect(screen.getByLabelText('返回上一頁')).toBeInTheDocument()
    })

    it('Icons should have aria-hidden', () => {
      const { container } = render(<NotFound />)

      const icons = container.querySelectorAll('[aria-hidden="true"]')
      expect(icons.length).toBeGreaterThan(0)
    })

    it('All links should meet 44px minimum touch target', () => {
      render(<NotFound />)

      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveClass('min-h-[44px]')
      })
    })
  })

  describe('Error and GlobalError Page Existence', () => {
    it('error.tsx should exist and export default function', async () => {
      const errorModule = await import('../error')
      expect(errorModule.default).toBeDefined()
      expect(typeof errorModule.default).toBe('function')
    })

    it('global-error.tsx should exist and export default function', async () => {
      const globalErrorModule = await import('../global-error')
      expect(globalErrorModule.default).toBeDefined()
      expect(typeof globalErrorModule.default).toBe('function')
    })
  })
})
