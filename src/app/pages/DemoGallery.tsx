import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import { Link } from 'react-router'
import { demos } from '../routes/demoRegistry'

export function DemoGallery() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#20211f]">
      <section className="border-b border-[#d8d5cc] bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <h1 className="text-4xl font-semibold tracking-normal md:text-5xl">
            DTC 需求原型列表
          </h1>
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
                  className="mt-1 text-[#7a7d75] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
