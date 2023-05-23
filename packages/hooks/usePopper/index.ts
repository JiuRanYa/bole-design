import type { Ref } from 'vue'
import { computePosition } from '@floating-ui/dom'
import type { Placement, VirtualElement } from '@floating-ui/dom'

interface UsePopperOptions {
  /*
   *	popper元素
   * */
  placement?: Ref<Placement>
  /**
   * popper 元素需要迁移至的目标选择器，为 true 时会迁移至 body
   */
  transfer?: Ref<boolean | string>
  /**
   * 参考元素，popper 元素的位置计算依据
   */
  referenceEl: Ref<HTMLElement | VirtualElement | null | undefined>
  /**
   * popper 元素
   */
  popperEl?: Ref<HTMLElement | null | undefined>
}

function usePopper(options: UsePopperOptions) {}

export default usePopper
