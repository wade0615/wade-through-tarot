import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast, useToastStore } from '../useToast'

describe('useToast', () => {
  beforeEach(() => {
    useToastStore.getState().clearAll()
  })

  it('should add success toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('成功訊息')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('success')
    expect(toasts[0].message).toBe('成功訊息')
  })

  it('should add error toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.error('錯誤訊息')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts[0].type).toBe('error')
    expect(toasts[0].message).toBe('錯誤訊息')
  })

  it('should add warning toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.warning('警告訊息')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts[0].type).toBe('warning')
    expect(toasts[0].message).toBe('警告訊息')
  })

  it('should add info toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.info('資訊訊息')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts[0].type).toBe('info')
    expect(toasts[0].message).toBe('資訊訊息')
  })

  it('should add toast with custom duration', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('測試', 5000)
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts[0].duration).toBe(5000)
  })

  it('should remove toast by id', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('測試')
    })

    const toastId = useToastStore.getState().toasts[0].id

    act(() => {
      result.current.close(toastId)
    })

    expect(useToastStore.getState().toasts).toHaveLength(0)
  })

  it('should add multiple toasts', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('成功 1')
      result.current.error('錯誤 2')
      result.current.info('資訊 3')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(3)
  })

  it('should generate unique IDs for toasts', async () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('測試 1')
    })

    // Wait 1ms to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 1))

    act(() => {
      result.current.success('測試 2')
    })

    const toasts = useToastStore.getState().toasts
    expect(toasts[0].id).not.toBe(toasts[1].id)
  })
})

describe('useToastStore', () => {
  beforeEach(() => {
    useToastStore.getState().clearAll()
  })

  it('should clear all toasts', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.success('測試 1')
      result.current.error('測試 2')
    })

    expect(useToastStore.getState().toasts).toHaveLength(2)

    act(() => {
      useToastStore.getState().clearAll()
    })

    expect(useToastStore.getState().toasts).toHaveLength(0)
  })
})
