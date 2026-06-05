import { Suspense } from 'react'
import { Link } from 'react-router'
import { PageHelp } from '../help/PageHelp'
import type { DemoRoute } from '../routes/demoRegistry'

interface DemoShellProps {
  demo: DemoRoute
}

export function DemoShell({ demo }: DemoShellProps) {
  const DemoComponent = demo.component

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link className="text-sm font-medium text-gray-700 hover:text-gray-950" to="/">
            DTC Demos
          </Link>
          <Link className="text-sm text-gray-500 hover:text-gray-950" to="/">
            返回目录
          </Link>
        </div>
      </div>
      <Suspense fallback={<DemoLoading />}>
        <DemoComponent />
      </Suspense>
      <PageHelp loadMarkdown={demo.help} />
    </div>
  )
}

function DemoLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-sm text-gray-500">
      Loading demo...
    </div>
  )
}
