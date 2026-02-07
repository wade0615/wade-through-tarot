export const readingTypeLabels: Record<string, Record<string, string>> = {
  love: {
    正位: "愛情正位",
    逆位: "愛情逆位",
    單身者: "愛情單身者建議",
    有伴侶者: "愛情有伴侶者建議",
    行動: "愛情行動建議",
  },
  career: {
    正位: "事業正位",
    逆位: "事業逆位",
    求職者: "事業求職者建議",
    在職者: "事業在職者建議",
    財務: "事業財務建議",
  },
  health: {
    身體: "健康身體",
    心理: "健康心理",
    生活習慣: "健康生活習慣",
    逆位: "健康逆位",
  },
}

export const themeReadingTypeLabels: Record<string, Record<string, string>> = {
  "upright-meanings": {}, // uprightDetail 不使用 【】 標記
  "reversed-meanings": {}, // reversedDetail 不使用 【】 標記
  "love-readings": {
    正位愛情: "愛情正位解析",
    逆位愛情: "愛情逆位解析",
    單身者: "單身者建議",
    有伴侶者: "有伴侶者建議",
    復合: "復合建議",
    行動: "行動建議",
  },
  "career-readings": {
    正位事業: "事業正位解析",
    逆位事業: "事業逆位解析",
    求職者: "求職者建議",
    在職者: "在職者建議",
    創業者: "創業者建議",
    財務: "財務建議",
  },
  "health-readings": {
    身體: "身體健康",
    心理: "心理健康",
    生活習慣: "生活習慣建議",
    壓力管理: "壓力管理",
    注意: "注意事項",
  },
}

export function formatReadingText(
  text: string,
  cardName?: string,
  readingType?: "love" | "career" | "health"
) {
  const segments = text.split(/(?=【)/).filter(Boolean)
  if (segments.length <= 1) {
    return <p className="text-slate-300 leading-relaxed">{text}</p>
  }

  const labels = readingType ? readingTypeLabels[readingType] : null

  return (
    <div className="space-y-3">
      {segments.map((segment, index) => {
        const markerMatch = segment.match(/^【([^】]+)】/)
        const marker = markerMatch?.[1] || ""
        const content = segment.replace(/^【[^】]+】/, "")

        const h3Text =
          cardName && labels && marker && labels[marker]
            ? `${cardName}${labels[marker]}`
            : null

        return (
          <div key={index}>
            {h3Text && (
              <h3 className="text-base font-semibold text-purple-300 mb-1">
                {h3Text}
              </h3>
            )}
            <p className="text-slate-300 leading-relaxed">
              {!h3Text && markerMatch && (
                <span className="text-purple-300 font-medium">
                  {markerMatch[0]}
                </span>
              )}
              {content}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function formatThemeReadingText(
  text: string,
  cardName: string,
  themeSlug: string
) {
  const segments = text.split(/(?=【)/).filter(Boolean)
  if (segments.length <= 1) {
    return <p className="text-slate-300 leading-relaxed whitespace-pre-line">{text}</p>
  }

  const labels = themeReadingTypeLabels[themeSlug] || {}

  return (
    <div className="space-y-6">
      {segments.map((segment, index) => {
        const markerMatch = segment.match(/^【([^】]+)】/)
        const marker = markerMatch?.[1] || ""
        const content = segment.replace(/^【[^】]+】/, "").trim()

        const h3Text =
          marker && labels[marker]
            ? `${cardName}${labels[marker]}`
            : marker
              ? `${cardName}${marker}`
              : null

        return (
          <div key={index}>
            {h3Text && (
              <h3 className="text-lg font-semibold text-purple-200 mb-2">
                {h3Text}
              </h3>
            )}
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {!h3Text && markerMatch && (
                <span className="text-purple-300 font-medium">
                  {markerMatch[0]}
                </span>
              )}
              {content}
            </p>
          </div>
        )
      })}
    </div>
  )
}
