import type { App, ComputedRef } from 'vue'
import { computed, getCurrentInstance, inject, provide, unref } from 'vue'
import { isDefined } from '../utils'

const PROVIDED_Z_INDEX = 'bl_ZIndex_provided'

let counter = 0
const initZIndex = 2000

const globalZIndex = computed(() => initZIndex)

function getOrDefault(num: number, def: number) {
  return isDefined(num) && !Number.isNaN(num) ? num : def
}

export function configZIndex(sourceZIndex: number, app: App) {
  // client-server
  if (app) {
    const zIndex = computed(() => {
      const originZIndex = unref(sourceZIndex)

      return getOrDefault(originZIndex, globalZIndex.value)
    })

    app.provide(PROVIDED_Z_INDEX, zIndex)
  }
  else {
    // support ssr
    const upstreamZIndex = inject<ComputedRef<number> | null>(PROVIDED_Z_INDEX, null)
    const zIndex = computed(() => {
      const zIndex = unref(sourceZIndex)

      return getOrDefault(
        zIndex,
        upstreamZIndex ? getOrDefault(upstreamZIndex.value, globalZIndex.value) : globalZIndex.value,
      )
    })

    provide(PROVIDED_Z_INDEX, zIndex)
  }
}

export function useZIndex() {
  const zIndex = getCurrentInstance()
    ? inject<ComputedRef<number>>(PROVIDED_Z_INDEX, globalZIndex)
    : globalZIndex

  return () => zIndex.value + counter++
}
