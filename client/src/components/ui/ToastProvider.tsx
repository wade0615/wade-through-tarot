'use client'

import { ToastContainer } from './Toast'
import { useToastStore } from '@/hooks/useToast'

export function ToastProvider() {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  return (
    <ToastContainer
      toasts={toasts.map((toast) => ({
        ...toast,
        onClose: removeToast,
      }))}
    />
  )
}
