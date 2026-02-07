import Link from "next/link"

interface ThemeLink {
  slug: string
  titleSuffix: string
}

interface Props {
  cardId: string
  cardName: string
  currentTheme: string
  themes: ThemeLink[]
}

export function CrossThemeLinks({
  cardId,
  cardName,
  currentTheme,
  themes,
}: Props) {
  const otherThemes = themes.filter((t) => t.slug !== currentTheme)

  return (
    <section className="mt-8 mb-8">
      <h2 className="text-xl font-semibold text-purple-200 mb-4">
        {cardName}其他主題解讀
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {otherThemes.map((t) => (
          <Link
            key={t.slug}
            href={`/cards/${cardId}/${t.slug}`}
            className="glass-card-subtle p-4 hover:bg-purple-500/15 hover:border-purple-400/40 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all duration-300 block"
          >
            <h3 className="text-purple-100 text-sm font-medium mb-1">
              {cardName}
              {t.titleSuffix}
            </h3>
            <p className="text-slate-400 text-xs">
              深入了解{cardName}的{t.titleSuffix}完整解析
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
