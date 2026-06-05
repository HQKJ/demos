import type { ReactNode } from 'react'

interface MarkdownContentProps {
  markdown: string
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return <div className="space-y-3">{renderMarkdown(markdown)}</div>
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/)
  const blocks: ReactNode[] = []
  let paragraph: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return

    blocks.push(
      <p className="text-sm leading-6 text-gray-600" key={`p-${blocks.length}`}>
        {paragraph.join(' ')}
      </p>,
    )
    paragraph = []
  }

  const flushList = () => {
    if (list.length === 0) return

    blocks.push(
      <ul
        className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600"
        key={`ul-${blocks.length}`}
      >
        {list.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>,
    )
    list = []
  }

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      flushParagraph()
      flushList()
      return
    }

    if (trimmedLine.startsWith('### ')) {
      flushParagraph()
      flushList()
      blocks.push(
        <h3 className="pt-2 text-base font-semibold text-gray-800" key={`h3-${blocks.length}`}>
          {trimmedLine.slice(4)}
        </h3>,
      )
      return
    }

    if (trimmedLine.startsWith('## ')) {
      flushParagraph()
      flushList()
      blocks.push(
        <h2 className="pt-2 text-lg font-semibold text-gray-900" key={`h2-${blocks.length}`}>
          {trimmedLine.slice(3)}
        </h2>,
      )
      return
    }

    if (trimmedLine.startsWith('# ')) {
      flushParagraph()
      flushList()
      blocks.push(
        <h1 className="text-xl font-semibold text-gray-950" key={`h1-${blocks.length}`}>
          {trimmedLine.slice(2)}
        </h1>,
      )
      return
    }

    if (trimmedLine.startsWith('- ')) {
      flushParagraph()
      list.push(trimmedLine.slice(2))
      return
    }

    flushList()
    paragraph.push(trimmedLine)
  })

  flushParagraph()
  flushList()

  return blocks
}
