import { booleanProps } from './types'

export const buildProps = (props: any) => {
  const common = {
    inherit: booleanProps,
  }

  return Object.freeze({ ...common, ...props })
}
