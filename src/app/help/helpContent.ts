import helpMarkdown from './pageHelp.md?raw'

const routeBlockPattern = /<!--\s*route:(.*?)\s*-->\s*([\s\S]*?)(?=<!--\s*route:|$)/g

const helpByRoute = Array.from(helpMarkdown.matchAll(routeBlockPattern)).reduce<
  Record<string, string>
>((sections, match) => {
  const route = match[1].trim()
  const markdown = match[2].trim()

  if (route && markdown) {
    sections[route] = markdown
  }

  return sections
}, {})

export function getHelpMarkdown(pathname: string) {
  const route = normalizeRoute(pathname)

  if (helpByRoute[route]) {
    return helpByRoute[route]
  }

  const fallbackRoute = Object.keys(helpByRoute)
    .filter((knownRoute) => knownRoute !== '*' && route.startsWith(`${knownRoute}/`))
    .sort((a, b) => b.length - a.length)[0]

  return helpByRoute[fallbackRoute] || helpByRoute['*'] || ''
}

function normalizeRoute(pathname: string) {
  const withoutBase = pathname.replace(/^\/demos(?=\/|$)/, '') || '/'
  const withoutTrailingSlash =
    withoutBase.length > 1 ? withoutBase.replace(/\/+$/, '') : withoutBase

  return withoutTrailingSlash || '/'
}
