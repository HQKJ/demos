import { useEffect, useState } from 'react'
import { CircleHelp, X } from 'lucide-react'
import { useLocation } from 'react-router'
import { getHelpMarkdown } from './helpContent'
import { MarkdownContent } from './MarkdownContent'

export function PageHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const markdown = getHelpMarkdown(pathname)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <button
        aria-label="打开页面说明"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-900 text-white shadow-lg transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        onClick={() => setIsOpen((open) => !open)}
        title="页面说明"
        type="button"
      >
        <CircleHelp size={24} />
      </button>

      {isOpen && (
        <aside
          aria-label="页面说明"
          className="fixed bottom-20 right-6 z-50 max-h-[min(70vh,520px)] w-[min(calc(100vw-48px),420px)] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div className="text-sm font-semibold text-gray-900">页面说明</div>
            <button
              aria-label="关闭页面说明"
              className="rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X size={18} />
            </button>
          </div>
          <div className="max-h-[calc(min(70vh,520px)-57px)] overflow-y-auto px-5 py-4">
            <MarkdownContent markdown={markdown} />
          </div>
        </aside>
      )}
    </>
  )
}
