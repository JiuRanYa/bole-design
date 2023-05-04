import { isObject, has, isFunction } from './utils'
import { ComputedRef, inject } from 'vue'

import { booleanProps } from './types'

const PROVIDED_PROPS = '__bl-provided-props'

export function buildProps<T>(props: T) {
  const common = {
    inherit: booleanProps
  }

  return Object.freeze({ ...common, ...props }) as T
}

interface PropsConfigOptions<T> {}

export function useProps<T extends Record<string, any>>(
  name: string,
  sourceProps: T,
  config: PropsConfigOptions<T> = {}
) {
  const props: {
    [P in keyof T]?: ComputedRef<T[P]>
  } = {}
  const providedProps = inject(PROVIDED_PROPS)[name]

  const keys = Object.keys(sourceProps)

  keys.forEach(key => {
    const def = config[key]

    const propsOption = isObject(def) && has(def, 'default') ? def : { default: def }

    const validator = isFunction(propsOption.validator) ? propsOption.validator : null

    validator &&
      watch(
        () => sourceProps[key],
        value => {
          const result = validator(value)

          if (result === false) {
            console.warn(
              `${toWarnPrefix(name)}: an invaild value is set to '${key as string}' prop`
            )
          }
        }
      )

    props[key] = propsOption
  })
}
