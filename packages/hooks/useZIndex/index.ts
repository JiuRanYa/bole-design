import { computed, ComputedRef, getCurrentInstance, inject } from 'vue'

let counter = 0
let initZIndex = 2000

const PROVIDED_Z_INDEX = 'bl_z_index_provider'

export const globalZIndex = computed(() => initZIndex)

export function useZIndex() {
  const zIndex = getCurrentInstance()
    ? inject<ComputedRef<number>>(PROVIDED_Z_INDEX, globalZIndex)
    : globalZIndex

  // return computed(() => zIndex.value + counter++)
  return () => zIndex.value + counter++
}
