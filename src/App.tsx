import { ArrowUpRight, Boxes, Github, LayoutGrid } from 'lucide-react'
import { Link, Navigate, Route, Routes } from 'react-router'
import { demos } from './demoRegistry'

function DemoGallery() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#20211f]">
      <section className="border-b border-[#d8d5cc] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cac6bb] bg-[#f7f7f2] px-3 py-1 text-sm text-[#5c5f56]">
              <Boxes size={16} />
              DTC Prototype Demos
            </div>
            <h1 className="text-4xl font-semibold tracking-normal md:text-5xl">
              DTC 需求原型工作台
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#62655f]">
              用一个 GitHub Pages 项目集中管理所有 DTC 原型。每个 demo 使用独立路由，方便评审、分享和持续迭代。
            </p>
          </div>
          <a
            className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#252824] bg-[#252824] px-4 text-sm font-medium text-white transition hover:bg-[#3b4039]"
            href="https://github.com/HQKJ/demos"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#62655f]">
          <LayoutGrid size={16} />
          已登记原型
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {demos.map((demo) => (
            <Link
              className="group rounded border border-[#d8d5cc] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#9b8f74] hover:shadow-sm"
              key={demo.path}
              to={demo.path}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex rounded border border-[#d9e2d1] bg-[#eef5e9] px-2 py-1 text-xs font-medium text-[#3d6332]">
                    {demo.status}
                  </div>
                  <h2 className="text-xl font-semibold">{demo.title}</h2>
                </div>
                <ArrowUpRight
                  className="mt-1 text-[#7a7d75] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={20}
                />
              </div>
              <p className="mt-3 min-h-12 text-sm leading-6 text-[#62655f]">{demo.summary}</p>
              <div className="mt-5 border-t border-[#ece9e0] pt-4 text-sm text-[#7a7d75]">
                路由：{demo.path}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function DemoShell({ component: DemoComponent }: { component: React.ComponentType }) {
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
      <DemoComponent />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<DemoGallery />} path="/" />
      {demos.map((demo) => (
        <Route
          element={<DemoShell component={demo.component} />}
          key={demo.path}
          path={demo.path}
        />
      ))}
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}
