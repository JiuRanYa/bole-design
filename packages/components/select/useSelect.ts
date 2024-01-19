import { Placement } from '@floating-ui/dom'
import { emitEvent, isNull, warnWithPrefix } from '@panda-ui/common'
import { useHover, usePopper } from '@panda-ui/hooks'
import { onMounted, reactive, nextTick, watch, computed, ExtractPropTypes, ref, toRaw } from 'vue'
import { OptionState } from '../option/props'
import { PopperExposed } from '../popper'
import { SelectRawOption, SelectValue } from './.symbol'
import { selectProps } from './props'
import { useCreatable } from './useCreatable'

export const DEFAULT_INPUT_PLACEHOLDER = '请填写'

function isSameValue(newValue?: SelectValue, oldValue?: SelectValue) {
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

export interface SelectStates {
  inputValue: string
  selectedLabel: string
  emittedValue: any
  currentVisible: boolean
  createdOption: Partial<OptionState>
  // filterable模式下搜索的关键字
  searchKey: string
  currentIdx: number
}

export const useSelect = (props: ExtractPropTypes<typeof selectProps>, emit: any) => {
  const wrapper = ref()
  const reference = ref()
  const popper = ref<PopperExposed>()
  const referenceEl = computed(() => reference.value)
  const popperEl = computed(() => popper.value?.wrapper)
  const placement = ref<Placement>(props.placement ?? 'bottom')
  const { x, y, update } = usePopper({ referenceEl, popperEl, placement })

  const { isHover } = useHover(reference)

  const states = reactive<SelectStates>({
    inputValue: '',
    selectedLabel: props.placeholder ?? DEFAULT_INPUT_PLACEHOLDER,
    emittedValue: props.value as typeof props.value | null,
    currentVisible: false,
    createdOption: {},
    searchKey: '',
    currentIdx: props.defaultFirstOption ? 0 : -1
  })

  const { createNewOption } = useCreatable(props, states)

  const filteredOptions = computed(() => {
    if (!props.filterable) return props.options

    const currentOptions = states.createdOption.label
      ? [states.createdOption].concat(props.options)
      : props.options
    return currentOptions.filter(option => option.label?.includes(states.inputValue))
  })

  const showClearIcon = computed(() => isHover.value && states.emittedValue && props.clearable)

  function handleOptionClick(option: OptionState, isClick = true) {
    const value = option.value

    if (isClick) {
      setVisible(false)
    }

    if (!isSameValue(value, states.emittedValue)) {
      setSelectedLabel(option.label)
      emit('update:value', value)
    }

    states.createdOption = {}
    states.searchKey = ''
  }

  function emitChangeEvent(newValue: SelectValue | undefined, oldValue: SelectValue | undefined) {
    if (props.onChange) {
      emitEvent(props.onChange, newValue, oldValue)
    }
  }

  function handleClearEmitValue() {
    setSelectedLabel(props.placeholder ?? DEFAULT_INPUT_PLACEHOLDER)
    emit('update:value', '')
  }

  function handleClickOutSide() {
    setVisible(false)
  }

  function setSelectedLabel(label?: string) {
    const val = toRaw(props.value)

    const selectedOption = filteredOptions.value.find(opt => opt.value === val)

    states.selectedLabel =
      label ?? selectedOption?.label ?? props.placeholder ?? DEFAULT_INPUT_PLACEHOLDER
    states.inputValue = ''
  }

  function setVisible(visible: boolean) {
    states.currentVisible = visible
  }

  function isSelected(option: SelectRawOption) {
    return states.emittedValue === option.value
  }

  function onKeyboardSelect() {
    const option = filteredOptions.value[states.currentIdx]

    if (!option) {
      return
    }
    if (!states.currentVisible) {
      setVisible(true)
      return
    }
    if (option.created) {
      states.createdOption = option
    }

    update()
    handleOptionClick(option, false)
  }

  function onKeyboardUp() {
    const idx = states.currentIdx
    states.currentIdx = idx <= 0 ? filteredOptions.value.length - 1 : states.currentIdx - 1
  }

  function onKeyboardDown() {
    const idx = states.currentIdx
    states.currentIdx = idx < filteredOptions.value.length - 1 ? states.currentIdx + 1 : 0
  }

  function onKeyboardDelete(e: KeyboardEvent) {
    if (states.searchKey.length === 0) {
      if (states.createdOption.label) {
        update()
        states.createdOption = {}
      }
    }
  }

  function onInput(event: any) {
    const value = event.target.value
    states.inputValue = value

    return onInputChange()
  }

  function onInputChange() {
    if (props.filterable) {
      states.searchKey = states.inputValue
    }

    if (props.creatable) {
      return nextTick(() => {
        createNewOption(states.inputValue)
      })
    }
  }

  function initCurrentIdx() {
    states.currentIdx = props.defaultFirstOption ? 0 : -1
  }

  watch(
    () => props.value,
    value => {
      if (!states.emittedValue || !isSameValue(value, states.emittedValue)) {
        emitChangeEvent(value, states.emittedValue)
        states.emittedValue = value
      }
    }
  )
  watch(
    () => states.currentVisible,
    value => {
      value && initCurrentIdx()
    }
  )

  onMounted(() => {
    props.value && setSelectedLabel()
  })

  return {
    x,
    y,
    wrapper,
    reference,
    popper,
    popperEl,
    referenceEl,
    showClearIcon,

    states,
    onInput,
    setVisible,
    isSelected,
    filteredOptions,
    onKeyboardUp,
    onKeyboardDown,
    onKeyboardDelete,
    onKeyboardSelect,
    handleOptionClick,
    handleClickOutSide,
    handleClearEmitValue
  }
}
