import Image from "next/image"
import Link from "next/link"
import { TarotCard } from "@/data/tarotCards"

interface Props {
  cards: TarotCard[]
  type: "upright" | "reversed"
  suitTitle: string
}

export function CardSummaryList({ cards, type, suitTitle }: Props) {
  return (
    <section className="mb-10">
      <h3 className="text-xl font-semibold text-purple-200 mb-4">
        {suitTitle}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const keywords =
            type === "upright" ? card.meaning.upright : card.meaning.reversed
          const description = card.description.substring(0, 80) + "..."

          return (
            <Link
              key={card.id}
              href={`/cards/${card.id}`}
              className="group bg-white/5 border border-purple-500/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 hover:-translate-y-1"
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
                    {keywords.slice(0, 3).map((kw) => (
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
              <p className="text-slate-400 text-xs mt-3 leading-relaxed line-clamp-2">
                {description}
              </p>
              <span className="text-amber-400/70 text-xs mt-2 inline-block group-hover:text-amber-300 transition-colors">
                查看完整解析 →
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
