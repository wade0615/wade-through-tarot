'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 記錄全域錯誤到監控服務
    console.error('Global Error:', error)
  }, [error])

  return (
    <html lang="zh-TW">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 text-center">
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" aria-hidden="true" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              應用程式錯誤
            </h1>

            <p className="text-slate-300 mb-6">
              發生了嚴重錯誤，請重新載入頁面。
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300 mb-2">
                  顯示錯誤詳情 (開發模式)
                </summary>
                <pre className="text-xs text-red-300 bg-slate-900/50 p-4 rounded overflow-auto max-h-40">
                  {error.message}
                  {error.digest && `\n\nError Digest: ${error.digest}`}
                  {error.stack && `\n\nStack Trace:\n${error.stack}`}
                </pre>
              </details>
            )}

            <button
              onClick={reset}
              className="px-6 py-3 min-h-[44px] bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium mx-auto"
              aria-label="重新載入"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              重新載入
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
