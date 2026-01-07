import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-purple-400 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-2">找不到頁面</h2>
          <p className="text-slate-300">
            您要找的頁面似乎不存在，或可能已被移除。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 min-h-[44px] bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            aria-label="返回首頁"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            返回首頁
          </Link>

          <Link
            href="javascript:history.back()"
            className="px-6 py-3 min-h-[44px] bg-slate-700 text-white hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
            aria-label="返回上一頁"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            返回上一頁
          </Link>
        </div>
      </div>
    </div>
  )
}
