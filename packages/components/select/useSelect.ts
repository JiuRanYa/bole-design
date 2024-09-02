import type { Placement } from '@floating-ui/dom'
import { emitEvent, isNull } from '@panda-ui/common'
import { useHover, usePopper } from '@panda-ui/hooks'
import type {
  ExtractPropTypes,
} from 'vue'
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRaw,
  toRef,
  watch,
} from 'vue'
import type { SelectOption } from '../option/props'
import type { PopperExposed } from '../popper'
import type { SelectRawOption, SelectValue } from './.symbol'
import type { selectProps } from './props'
import { useCreatable } from './useCreatable'

export const DEFAULT_INPUT_PLACEHOLDER = '请填写'

function isSameValue(newValue?: SelectValue, oldValue?: SelectValue) {
  const isNewArray = Array.isArray(newValue)
  const isOldArray = Array.isArray(oldValue)

  if (isNewArray !== isOldArray)
    return false

  if (isNewArray && isOldArray) {
    if (newValue.length !== oldValue.length)
      return false

    for (let i = 0, len = newValue.length; i < len; ++i) {
      if (newValue[i] !== oldValue[i])
        return false
    }

    return true
  }

  if (isNull(newValue))
    return isNull(oldValue)

  return newValue === oldValue
}

export interface SelectStates {
  inputValue: string
  selectedLabel: string
  emittedValue: any
  currentVisible: boolean
  createdOption: Partial<SelectOption>
  // filterable模式下搜索的关键字
  searchKey: string
  currentIdx: number
}

export function useSelect(props: ExtractPropTypes<typeof selectProps>, emit: any) {
  const wrapper = ref()

  const input = ref()
  const popper = ref<PopperExposed>()
  const popperEl = computed(() => popper.value?.wrapper)
  const placement = ref<Placement>(props.placement ?? 'bottom')

  const { reference, updatePopper, transferTo } = usePopper({
    popper: popperEl,
    placement,
    transfer: toRef(props, 'to'),
    isDrop: true,
  })

  const { isHover } = useHover(reference)

  const states = reactive<SelectStates>({
    inputValue: props.value,
    selectedLabel: props.placeholder ?? DEFAULT_INPUT_PLACEHOLDER,
    emittedValue: props.value as typeof props.value | null,
    currentVisible: props.visible,
    createdOption: {},
    searchKey: '',
    currentIdx: props.defaultFirstOption ? 0 : -1,
  })

  const { createNewOption } = useCreatable(props, states)

  const filteredOptions = computed(() => {
    if (!props.filterable)
      return props.options

    const currentOptions = states.createdOption.label
      ? [states.createdOption].concat(props.options)
      : props.options
    return currentOptions.filter((option: any) => option.label?.includes(states.searchKey))
  })

  const showClearIcon = computed(() => isHover.value && states.emittedValue && props.clearable)

  function handleOptionClick(option: SelectOption, isClick = true) {
    const value = option.value

    if (isClick)
      setVisible(false)

    if (!isSameValue(value, states.emittedValue)) {
      setSelectedLabel(option.label)
      emit('update:value', value)
      emitEvent(props.onSelect!, option)
      states.emittedValue = value
    }

    states.createdOption = {}
    states.searchKey = ''
  }

  function emitChangeEvent(newValue: SelectValue | undefined, oldValue: SelectValue | undefined) {
    if (props.onChange)
      emitEvent(props.onChange, newValue, oldValue)
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

    const selectedOption = filteredOptions.value.find((opt: any) => opt.value === val)

    if (!label && selectedOption)
      emit('select', selectedOption)

    states.selectedLabel
      = label ?? selectedOption?.label ?? props.placeholder ?? DEFAULT_INPUT_PLACEHOLDER
    states.inputValue = ''
  }

  function setVisible(visible: boolean) {
    states.currentVisible = visible
  }

  function isSelected(option: SelectRawOption | SelectOption) {
    return states.emittedValue === option.value
  }

  function onKeyboardSelect() {
    const option = filteredOptions.value[states.currentIdx]

    if (!option)
      return

    if (!states.currentVisible) {
      setVisible(true)
      return
    }
    if (option.created)
      states.createdOption = option

    updatePopper()
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

  function onKeyboardDelete() {
    if (states.searchKey.length === 0) {
      if (states.createdOption.label) {
        updatePopper()
        states.createdOption = {}
      }
    }
  }

  function onInput(event: any) {
    const value = event.target.value
    states.inputValue = value

    onInputChange()
  }

  function onInputChange() {
    if (props.filterable)
      states.searchKey = states.inputValue

    if (props.creatable) {
      requestAnimationFrame(() => {
        createNewOption(states.inputValue)
      })
    }
  }

  function initCurrentIdx() {
    states.currentIdx = props.defaultFirstOption ? 0 : -1
  }
  function syncInputValue() {
    if (!input.value)
      return

    const visible = states.currentVisible

    input.value.value = visible ? '' : states.selectedLabel || ''

    visible ? input.value.focus() : input.value.blur()
  }

  watch(
    () => props.value,
    (value, oldValue) => {
      if (!oldValue || !isSameValue(value, oldValue)) {
        emitChangeEvent(value, oldValue)
        states.inputValue = props.options.find(i => i.value === value)?.label ?? ''
        states.emittedValue = value
        setSelectedLabel()
        syncInputValue()
      }
    },
  )
  watch(
    () => states.currentVisible,
    (value) => {
      value && initCurrentIdx()
    },
  )

  onMounted(() => {
    syncInputValue()
    props.value && setSelectedLabel()
  })

  return {
    states,
    input,
    wrapper,
    reference,
    popper,
    popperEl,
    transferTo,
    showClearIcon,
    filteredOptions,

    onInput,
    setVisible,
    isSelected,
    updatePopper,
    onKeyboardUp,
    onKeyboardDown,
    onKeyboardDelete,
    onKeyboardSelect,
    handleOptionClick,
    handleClickOutSide,
    handleClearEmitValue,
  }
}
