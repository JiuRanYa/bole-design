import { booleanProps } from './types'

export function buildProps<T>(props: T) {
  const common = {
    inherit: booleanProps,
  }

  return Object.freeze({ ...common, ...props }) as T
}
