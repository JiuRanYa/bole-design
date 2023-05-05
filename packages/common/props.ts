import { App, ComponentPropsOptions, unref } from 'vue'
import { isObject, has, isFunction, isNull, warnWithPrefix } from './utils'
import { computed, ComputedRef, inject, reactive, watch } from 'vue'

import { booleanProps, EnsureValue, Expand, MaybeRef } from './types'

const eventPropRE = /^on[A-Z]/
const PROVIDED_PROPS = '__bl-provided-props'

export function buildProps<T extends ComponentPropsOptions>(props: T) {
  const common = {
    inherit: booleanProps
  }

  return Object.freeze({ ...common, ...props }) as Expand<typeof common & T>
}

export function configProps<T>(props: MaybeRef<T>, app: App) {
  if (app) {
    app.provide(
      PROVIDED_PROPS,
      computed(() => unref(props))
    )
  } else {
    // TODO: support SSR
  }
}

interface PropsConfig<T = any> {
  default: T | (() => T) | null
  isFunc?: boolean
  static?: boolean
  validator?: (value: T) => any
}

type PropsConfigOptions<T> = {
  [K in keyof T]?:
    | PropsConfig<EnsureValue<T[K]>>
    | EnsureValue<T[K]>
    | (() => EnsureValue<T[K]>)
    | null
}

/*
 * static: 标记该属性不可被全局配置
 * validator: 属性校验函数，失败则全局warn
 * */
export function useProps<T extends Record<string, any>>(
  name: string,
  sourceProps: T,
  config: PropsConfigOptions<T> = {}
) {
  const props: {
    [P in keyof T]?: ComputedRef<T[P]>
  } = {}
  const providedProps = inject<ComputedRef<Record<string, PropsConfigOptions<T>>> | null>(
    PROVIDED_PROPS,
    null
  )

  // all comps default config
  const commonProps = computed<PropsConfigOptions<T>>(() => {
    return providedProps?.value?.default ?? {}
  })
  // single comp config
  const configProps = computed<PropsConfigOptions<T>>(() => {
    return providedProps?.value?.[name] ?? {}
  })

  const keys = Object.keys(sourceProps) as (keyof T)[]

  keys.forEach(key => {
    const defP = config[key]

    const propsOptions = (
      isObject(defP) && has(defP, 'default') ? defP : { default: defP }
    ) as PropsConfig<T[keyof T]>
    const validator = isFunction(propsOptions.validator) ? propsOptions.validator : null
    const defaultValue = propsOptions.default

    const getValue = (value: PropsConfigOptions<T>[keyof T]) =>
      !isFunc && isFunction(value) ? value() : value
    const getDefault = () =>
      (!isFunc && isFunction(defaultValue) ? defaultValue() : defaultValue) as T[keyof T]

    const isFunc = isNull(propsOptions.isFunc) ? eventPropRE.test(String(key)) : propsOptions.isFunc

    validator &&
      watch(
        () => sourceProps[key],
        value => {
          const result = validator(value)

          if (result === false) {
            warnWithPrefix(name, `an invalid value is set to '${key as string}' prop`)
          }
        }
      )

    if (props.static) {
      props[key] = computed(() => sourceProps[key] ?? getDefault())
    } else {
      props[key] = computed(() => {
        if (isNull(sourceProps[key])) {
          if (!isNull(configProps.value[key])) {
            return getValue(configProps.value[key])
          }
          if (!isNull(commonProps.value[key])) {
            return getValue(commonProps.value[key])
          }

          return getDefault()
        }

        return sourceProps[key]
      })
    }
  })

  return reactive(props) as {
    [P in keyof T]-?: Exclude<T[P], undefined>
  }
}
