import { ComputedRef, computed, getCurrentInstance, inject } from 'vue'

const PROVIDED_Z_INDEX = 'bl_ZIndex_provided'

let counter = 0
let initZIndex = 2000

const globalZIndex = computed(() => initZIndex)

export function configZIndex() {}

export function useZIndex() {
  const zIndex = getCurrentInstance()
    ? inject<ComputedRef<number>>(PROVIDED_Z_INDEX, globalZIndex)
    : globalZIndex

  return () => zIndex.value + counter++
}
