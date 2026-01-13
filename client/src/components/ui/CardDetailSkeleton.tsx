import { Skeleton, SkeletonCard, SkeletonText } from './Skeleton'

export function CardDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 麵包屑 */}
      <Skeleton className="w-32 h-4 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 卡牌圖片 */}
        <div className="flex justify-center">
          <SkeletonCard />
        </div>

        {/* 卡牌資訊 */}
        <div className="space-y-6">
          {/* 標題 */}
          <div>
            <Skeleton className="w-48 h-8 mb-2" />
            <Skeleton className="w-32 h-6" />
          </div>

          {/* 正位 */}
          <div>
            <Skeleton className="w-20 h-6 mb-2" />
            <SkeletonText lines={4} />
          </div>

          {/* 逆位 */}
          <div>
            <Skeleton className="w-20 h-6 mb-2" />
            <SkeletonText lines={4} />
          </div>

          {/* 按鈕 */}
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
