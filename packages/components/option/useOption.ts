import type { ExtractPropTypes } from 'vue'
import { computed, inject, reactive, toRaw, toRefs } from 'vue'
import { selectKey } from '@panda-ui/tokens/select'
import type { optionProps } from './props'

export function useOption(props: ExtractPropTypes<typeof optionProps>) {
  const select = inject(selectKey)

  const isSelected = computed(() => {
    const createdOptions = select?.states.createdOptions
    if (createdOptions?.length && Array.isArray(select?.props.value))
      return select?.props.value.some(op => toRaw(props.value === toRaw(op.value)))

    return toRaw(select?.props.value) === toRaw(props.value)
  })

  const isHovering = computed(() => {
    return select?.states.currentIdx === props.index
  })

  function hoverItem() {
    if (!select)
      return

    select.states.currentIdx = props.index as number
  }

  const states = reactive({
    isSelected,
    isHovering,
  })

  return {
    ...toRefs(states),
    hoverItem,
  }
}
