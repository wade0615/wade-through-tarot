import Image from "next/image"

interface Props {
  cardName: string
  cardNameEn: string
  suitName: string
  number?: number
  imageUrl: string
  titleSuffix: string
}

export function CardThemeHeader({
  cardName,
  cardNameEn,
  suitName,
  number,
  imageUrl,
  titleSuffix,
}: Props) {
  return (
    <header className="flex items-center gap-4 mb-8">
      <div className="flex-shrink-0 w-16 h-[106px] relative rounded-lg overflow-hidden border border-purple-400/30 shadow-lg shadow-purple-500/10">
        <Image
          src={imageUrl}
          alt={cardName}
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-amber-200 mb-1">
          {cardName}
          {titleSuffix}
        </h1>
        <div className="flex flex-wrap gap-2 text-sm text-slate-400">
          <span className="text-purple-300">{suitName}</span>
          {number !== undefined && (
            <span>
              • 編號 <span className="text-amber-400">{number}</span>
            </span>
          )}
          <span>• {cardNameEn}</span>
        </div>
      </div>
    </header>
  )
}
