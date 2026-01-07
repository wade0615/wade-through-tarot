import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-slate-700/50'

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded',
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && 'w-3/4' // 最後一行較短
            )}
            style={{ width, height }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
      aria-busy="true"
      aria-live="polite"
    />
  )
}

// 便利元件
export function SkeletonCard() {
  return (
    <div className="w-24 h-36 rounded-lg animate-pulse bg-slate-700/50 border border-slate-600" />
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return <Skeleton variant="text" lines={lines} />
}

export function SkeletonAvatar() {
  return <Skeleton variant="circular" width={40} height={40} />
}
