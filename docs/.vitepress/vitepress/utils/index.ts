export const HASH_RE = /#.*$/
export const EXT_RE = /(index)?\.(md|html)$/

export const inBrowser = typeof document !== 'undefined'

export const throttleAndDebounce = (fn: () => any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>
  let called = false
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else {
      timeout = setTimeout(fn, delay)
    }
  }
}
export function isActive(
  currentPath: string,
  matchPath?: string,
  asRegex: boolean = false
): boolean {
  if (matchPath === undefined) {
    return false
  }

  currentPath = normalize(currentPath)

  if (asRegex) {
    return new RegExp(matchPath).test(currentPath)
  }

  if (normalize(matchPath) !== currentPath) {
    return false
  }

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch) {
    return (inBrowser ? location.hash : '') === hashMatch[0]
  }

  return true
}

export function normalize(path: string): string {
  return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '')
}
