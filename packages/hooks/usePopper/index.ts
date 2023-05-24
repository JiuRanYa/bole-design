import { computed, nextTick, onMounted, ref, Ref } from 'vue'
import { autoUpdate, computePosition } from '@floating-ui/dom'
import type { Placement, VirtualElement } from '@floating-ui/dom'
import { watch } from 'fs'

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

export default function usePopper(options: UsePopperOptions) {
  const { placement } = options
  const referenceEl = options.referenceEl ?? ref(null)
  const popperEl = options.popperEl ?? ref(null)

  function createPopper() {
    const refEl = referenceEl.value
    const popEl = popperEl.value

    if (!refEl || !popEl) return

    autoUpdate(refEl, popEl, () => {
      computePosition(refEl, popEl, {
        placement: placement.value
      }).then(({ x, y }) => {
        assignStyle(popperEl.value, x, y)
      })
    })
  }

  function assignStyle(el: HTMLElement | null | undefined, x: number, y: number) {
    if (!el) return

    Object.assign(el.style, {
      left: `${x}px`,
      top: `${y}px`,
      position: 'absolute'
    })

    el.dataset.placement = placement.value
  }

  onMounted(() => {
    nextTick(createPopper)
  })
}
