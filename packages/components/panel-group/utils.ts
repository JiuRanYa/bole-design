let uid = 0

export function useUniqueId() {
  const id = uid++

  return `:bl:${id}`
}
