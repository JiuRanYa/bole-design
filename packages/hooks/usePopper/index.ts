import { watch, onMounted, ref, Ref, WatchStopHandle, watchEffect } from 'vue'
import { computePosition } from '@floating-ui/dom'
import type { Placement, VirtualElement } from '@floating-ui/dom'

interface UsePopperOptions {
  /*
   *	弹出位置
   * */
  placement: Ref<Placement>
  /**
   * popper 元素需要迁移至的目标选择器，为 true 时会迁移至 body
   */
  transfer?: Ref<boolean | string>
  /**
   * 参考元素，popper 元素的位置计算依据
   */
  referenceEl: Ref<Element | VirtualElement | null | undefined>
  /**
   * popper 元素
   */
  popperEl: Ref<HTMLElement | null | undefined>
}

export function usePopper(options: UsePopperOptions) {
  const { placement } = options
  const referenceEl = options.referenceEl ?? ref(null)
  const popperEl = options.popperEl ?? ref(null)
  const x = ref<number>()
  const y = ref<number>()

  let stopWatchPopper: WatchStopHandle | null = null

  const state = {
    x,
    y
  }
  function createPopper() {
    const cancelWatchReference = watch(referenceEl, update, { immediate: true })
  }
  async function update() {
    const refEl = referenceEl.value
    const popEl = popperEl.value
    const middleware = ref({})

    if (!refEl || !popEl) return

    const data = await computePosition(refEl, popEl, {
      strategy: 'absolute',
      placement: placement.value,
      middleware: []
    })

    state.x.value = data.x
    state.y.value = data.y
  }

  onMounted(() => {
    watchEffect(() => {
      createPopper()
    })
  })

  return {
    ...state,
    update
  }
}
