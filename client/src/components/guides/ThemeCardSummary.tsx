import Image from "next/image"
import Link from "next/link"
import { TarotCard } from "@/data/tarotCards"

interface ReadingExcerpt {
  label: string
  text: string
  color: string
}

interface Props {
  card: TarotCard
  excerpts: ReadingExcerpt[]
  variant?: "featured" | "caution" | "default"
}

export function ThemeCardSummary({
  card,
  excerpts,
  variant = "default",
}: Props) {
  const borderColor =
    variant === "featured"
      ? "border-emerald-500/30 hover:border-emerald-400/40"
      : variant === "caution"
        ? "border-amber-500/30 hover:border-amber-400/40"
        : "border-purple-500/20 hover:border-purple-400/30"

  return (
    <Link
      href={`/cards/${card.id}`}
      className={`group bg-white/5 ${borderColor} border backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 block`}
    >
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-[68px] flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={card.imageUrl}
            alt={card.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-purple-100 font-medium text-sm group-hover:text-amber-300 transition-colors">
            {card.name}
            <span className="text-purple-400/60 text-xs ml-1">
              {card.nameEn}
            </span>
          </h4>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {card.meaning.upright.slice(0, 2).map((kw) => (
              <span
                key={kw}
                className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200/80"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {excerpts
        .filter((e) => e.text)
        .slice(0, 2)
        .map((excerpt) => (
          <div key={excerpt.label} className="mt-2">
            <p className={`text-xs font-medium mb-0.5 ${excerpt.color}`}>
              {excerpt.label}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
              {excerpt.text.substring(0, 80)}...
            </p>
          </div>
        ))}

      <span className="text-amber-400/70 text-xs mt-2 inline-block group-hover:text-amber-300 transition-colors">
        查看完整解析 →
      </span>
    </Link>
  )
}
