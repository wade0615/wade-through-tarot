'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  type: ToastType
  message: string
  duration?: number
  onClose: (id: string) => void
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-900 border-green-600 text-green-50',
  error: 'bg-red-900 border-red-600 text-red-50',
  warning: 'bg-yellow-900 border-yellow-600 text-yellow-50',
  info: 'bg-blue-900 border-blue-600 text-blue-50',
}

const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

export function Toast({ id, type, message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [id, duration, onClose])

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        flex items-center gap-3 min-w-[320px] max-w-md p-4 rounded-lg border-2
        shadow-lg animate-slide-in-right
        ${toastStyles[type]}
      `}
    >
      <span className="text-xl flex-shrink-0" aria-hidden="true">
        {toastIcons[type]}
      </span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors min-w-[24px] min-h-[24px]"
        aria-label="關閉通知"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
