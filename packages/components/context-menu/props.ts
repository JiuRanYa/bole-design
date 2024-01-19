import { PropType } from 'vue'
import { booleanProps, buildProps } from '@panda-ui/common'

type ContextMenuParam = {
  x: number
  y: number
}
export const contextMenuProps = buildProps({
  active: booleanProps,
  transitionName: String,
  onShow: Function as PropType<(params: ContextMenuParam) => void>,
  onClose: Function as PropType<(params: ContextMenuParam) => void>
})
