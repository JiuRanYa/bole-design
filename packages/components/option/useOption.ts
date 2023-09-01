import { computed, inject, reactive, toRefs } from 'vue'
import { selectKey } from '@bole-design/tokens/select'

export const useOption = (props: any) => {
  const select = inject(selectKey)

  const isSelected = computed(() => {
    return select?.props.value === props.value
  })

  const states = reactive({
    isSelected
  })
  return toRefs(states)
}
