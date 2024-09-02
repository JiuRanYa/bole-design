import type { ExtractPropTypes } from 'vue'
import { computed } from 'vue'
import type { SelectOption } from '../option/props'
import type { selectProps } from './props'
import type { SelectStates } from './useSelect'

export function useCreatable(props: ExtractPropTypes<typeof selectProps>, states: SelectStates) {
  // const cachedSelectedOption = ref<OptionState>()

  const toggleCreatableMode = computed(() => {
    return props.filterable && props.creatable
  })

  function hasExistingOption(label: string) {
    const hasValue = (option: SelectOption) => option.value === label
    return props.options && props.options.some(hasValue)
  }

  function createNewOption(label: string) {
    if (!toggleCreatableMode.value)
      return

    if (!label || label.length <= 0 || hasExistingOption(label)) {
      states.createdOption = {}
      return
    }

    const newOption = {
      value: label,
      label,
      created: true,
      disabled: false,
    }

    states.createdOption = newOption
  }

  return {
    createNewOption,
  }
}
