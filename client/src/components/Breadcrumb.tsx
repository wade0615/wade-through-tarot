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
            className="text-blue-300 hover:text-blue-100 transition-colors"
          >
            首頁
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <span className="text-slate-300">/</span>
            {index === items.length - 1 ? (
              <span className="text-white font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-blue-300 hover:text-blue-100 transition-colors"
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
