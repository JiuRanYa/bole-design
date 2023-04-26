import { computed, provide, inject, unref } from 'vue'

import type { App, ComputedRef } from 'vue'
import type { MaybeRef } from './types'

// export const PROVIDED_NAMESPACE = '__bl-provided-namespace'
export const globalNamespace = computed(() => 'bl')

// export function configNamespace(sourceNamespace: MaybeRef<string>, app?: App) {
//   if (app) {
//     const namespace = computed(() => {
//       const namespace = unref(sourceNamespace)
//
//       return namespace || globalNamespace.value
//     })
//
//     app.provide(PROVIDED_NAMESPACE, namespace)
//   } else {
//     const upstreamNamespace = inject<ComputedRef<string> | null>(
//       PROVIDED_NAMESPACE,
//       null
//     )
//     const namespace = computed(() => {
//       return (
//         unref(sourceNamespace) ||
//         upstreamNamespace?.value ||
//         globalNamespace.value
//       )
//     })
//
//     provide(PROVIDED_NAMESPACE, namespace)
//   }
// }

// export function useNamespace() {
//   return inject(PROVIDED_NAMESPACE, globalNamespace)
// }

/**
 * Create a name helper for BEM.
 *
 * For css vars name, the namespace is fixed to 'bl'
 */
export function useNamespace(
  block: string,
  namespace: MaybeRef<string> = globalNamespace
) {
  /**
   * @returns `${namespace}-${block}`
   */
  const b = () => `${unref(namespace)}-${block}`
  /**
   * @returns `${namespace}-${block}__${element}`
   */
  const be = (element: string) => `${b()}__${element}`
  /**
   * @returns `${namespace}-${block}--${modifier}`
   */
  const bm = (modifier: string | number) => `${b()}--${modifier}`
  /**
   * @returns `${namespace}-${block}__${element}--${modifier}`
   */
  const bem = (element: string, modifier: string | number) =>
    `${b()}__${element}--${modifier}`
  /**
   * @returns `${namespace}-${block}-${suffix}`
   */
  const bs = (suffix: string) => `${b()}-${suffix}`
  /**
   * @returns `${namespace}-${suffix}`
   */
  const ns = (suffix: string) => `${unref(namespace)}-${suffix}`
  /**
   * @returns `--bl-${block}-${name}`
   */
  const cv = (name: string) => `--bl-${block}-${name}`
  /**
   * @returns a map that is transformed origin style map's key to cv(key)
   */
  const cvm = (
    map: Record<string, string>,
    style: Record<string, string> = {}
  ) => {
    Object.keys(map).forEach((name) => {
      style[cv(name)] = map[name]
    })

    return style
  }
  /**
   * @returns `var(--bl-${block}-${name})`
   */
  const gcv = (name: string) => `var(--bl-${block}-${name})`
  /**
   * @returns `--bl-${name}`
   */
  const nv = (name: string) => `--bl-${name}`
  /**
   * @returns `var(--bl-${name})`
   */
  const gnv = (name: string) => `var(--bl-${name})`

  return {
    b,
    be,
    bm,
    bem,
    bs,
    ns,
    cv,
    cvm,
    gcv,
    nv,
    gnv,
  }
}

export type Namespace = ReturnType<typeof useNamespace>
