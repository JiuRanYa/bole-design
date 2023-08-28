import { isNull } from '@bole-design/common'
import { onMounted, reactive, ref, defineEmits, toRefs, watch, computed } from 'vue'
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
    currentVisible: ref(props.visible),
    isSelected: {}
  })
}

export const useSelect = (props: any, emit: any) => {
  const states = useSelectStates(props)

  function initValueAndLabel(value: SelectValue) {
    if (isNull(value)) {
      return
    }
  }
  function handleOptionClick(value: string | number) {
    if (!isSameValue(value, states.emittedValue)) {
      emit('update:value', value)
    }
    states.currentVisible = false
  }
  function setVisible(visible: boolean) {
    states.currentVisible = visible
    emit('update:value')
  }
  const dropDownVisible = computed(() => {
    return states.currentVisible
  })
  onMounted(() => {})

  watch(
    () => props.value,
    value => {
      if (!states.emittedValue || !isSameValue(value, states.emittedValue)) {
        states.emittedValue = value
        console.log(value)
        initValueAndLabel(value)
      }
    }
  )

  return {
    setVisible,
    dropDownVisible,
    handleOptionClick
  }
}
