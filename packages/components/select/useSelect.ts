import { isNull } from '@bole-design/common'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { SelectValue } from './.symbol'

function isSameValue(newValue: SelectValue, oldValue: SelectValue) {
  const isNewArray = Array.isArray(newValue)
  const isOldArray = Array.isArray(oldValue)

  if (isNewArray !== isOldArray) return false

  if (isNewArray && isOldArray) {
    if (newValue.length !== oldValue.length) return false

    for (let i = 0, len = newValue.length; i < len; ++i) {
      if (newValue[i] !== oldValue[i]) return false
    }

    return true
  }

  if (isNull(newValue)) return isNull(oldValue)

  return newValue === oldValue
}
export const useSelectStates = (props: any) => {
  return reactive({
    emittedValue: props.value as typeof props.value | null,
    currentVisible: props.visible,
    selectedLabel: '',
    isSelected: {}
  })
}

// pass the same states in order to get same reference for dom react
export const useSelect = (props: any, states: ReturnType<typeof useSelectStates>, emit: any) => {
  function handleOptionClick(value: string | number) {
    if (!isSameValue(value, states.emittedValue.value)) {
      setSelectedLabel(value)
      emit('update:value', value)
    }
    states.currentVisible = false
  }
  function setSelectedLabel(value: string | number) {
    states.selectedLabel = props.options.find((option: any) => option.value === value)?.label
  }
  function setVisible(visible: boolean) {
    states.currentVisible = visible
    emit('update:visible')
  }
  onMounted(() => {
    setSelectedLabel(props.value)
  })

  watch(
    () => props.value,
    value => {
      if (!states.emittedValue || !isSameValue(value, states.emittedValue)) {
        setSelectedLabel(value)
        states.emittedValue = value
      }
    }
  )

  return {
    setVisible,
    handleOptionClick
  }
}
