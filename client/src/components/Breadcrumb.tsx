import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href: string
}

interface Props {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="麵包屑導航" className="mb-4">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-purple-300/70 hover:text-amber-300 transition-colors duration-200"
          >
            首頁
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <span className="text-slate-600">/</span>
            {index === items.length - 1 ? (
              <span className="text-purple-200 font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-purple-300/70 hover:text-amber-300 transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
