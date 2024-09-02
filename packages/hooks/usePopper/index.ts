import type { Ref } from 'vue'
import { computed, onMounted, ref, shallowRef, unref, watchEffect } from 'vue'
import { computePosition, flip, hide } from '@floating-ui/dom'
import type { Middleware, Placement, VirtualElement } from '@floating-ui/dom'
import { isClient } from '@panda-ui/common'

interface UsePopperOptions {
  /*
   * 弹出位置
   * */
  placement: Ref<Placement>
  /**
   * popper 元素需要迁移至的目标选择器，为 true 时会迁移至 body
   */
  transfer?: Ref<boolean | string>
  /**
   * 参考元素，popper 元素的位置计算依据
   */
  reference?: Ref<Element | VirtualElement | null | undefined>
  /**
   * popper 元素
   */
  popper?: Ref<HTMLElement | null | undefined>
  /**
   * 是否是下拉元素，需要处理transition-origin
   */
  isDrop?: boolean
}

export function usePopper(options: UsePopperOptions) {
  const { placement, transfer, popper, isDrop } = options
  const reference: Ref<HTMLElement | null | undefined>
    = (options.reference as any) ?? shallowRef(null)
  const popperEl = options.popper ?? ref(null)
  const middleware: Middleware[] = [
    flip(),
    hide({
      strategy: 'escaped', // 'referenceHidden' by default
    }),
  ]

  const transferTo = computed(() => {
    return typeof transfer?.value === 'boolean' ? (transfer.value ? 'body' : '') : transfer?.value
  })

  if (isDrop) {
    middleware.push({
      name: 'origin',
      fn({ placement, elements }) {
        const origin = setPopperDropOrigin(placement)

        if (origin)
          elements.floating.style.transformOrigin = origin

        return {}
      },
    })
  }

  async function update() {
    const refEl = unref(reference)
    const popEl = popperEl.value

    if (!refEl || !popEl)
      return

    const { strategy, x, y } = await computePosition(refEl, popEl, {
      placement: placement.value,
      middleware,
    })

    const style: Partial<CSSStyleDeclaration> = {
      position: strategy,
      top: `${y}px`,
      left: `${x}px`,
    }

    Object.assign(popEl.style, style)
  }

  const updatePopper = () => {
    if (!isClient)
      return

    return new Promise<void>((resolve) => {
      requestAnimationFrame(() =>
        update().then(resolve),
      )
    })
  }

  onMounted(() => {
    requestAnimationFrame(() => {
      watchEffect(update)
    })
  })

  function setPopperDropOrigin(placement: Placement) {
    if (placement !== 'left' && placement !== 'right') {
      const [start, end] = placement.split('-')

      return start === 'bottom' || (start !== 'top' && end === 'start')
        ? 'center top'
        : 'center bottom'
    }
  }

  return {
    updatePopper,
    reference,
    popper,
    transferTo,
  }
}
