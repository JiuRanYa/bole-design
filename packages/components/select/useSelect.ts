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
  const states = reactive({
    emittedValue: props.value as typeof props.value | null,
    currentVisible: ref(props.visible),
    isSelected: {}
  })
  return toRefs(states)
}

export const useSelect = (props: any, emit: any) => {
  const states = useSelectStates(props)

  function handleOptionClick(value: string | number) {
    if (!isSameValue(value, states.emittedValue.value)) {
      emit('update:value', value)
    }
    states.currentVisible.value = false
  }
  function setVisible(visible: boolean) {
    states.currentVisible.value = visible
    emit('update:visible')
  }
  const dropDownVisible = computed(() => {
    return states.currentVisible.value
  })
  onMounted(() => {})

  watch(
    () => props.value,
    value => {
      if (!states.emittedValue.value || !isSameValue(value, states.emittedValue.value)) {
        states.emittedValue.value = value
      }
    }
  )

  return {
    setVisible,
    dropDownVisible,
    handleOptionClick
  }
}
