import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合併 className，支援條件判斷與 Tailwind 衝突解決
 * @param inputs - className 陣列或物件
 * @returns 合併後的 className 字串
 * @example
 * ```ts
 * cn('p-4', 'text-blue-500')
 * cn('p-4', { 'bg-red-500': isError })
 * cn('px-2', 'px-4') // 結果: 'px-4' (Tailwind 衝突解決)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
