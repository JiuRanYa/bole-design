import type {
  ExtractPropTypes,
} from 'vue'
import {
  computed,
  nextTick,
  reactive,
  ref,
  toRaw,
  toRef,
  watch,
  watchEffect,
} from 'vue'
import type { Placement } from '@floating-ui/dom'
import { useHover, usePopper } from '@panda-ui/hooks'
import { emitEvent, flatTree, transformTree } from '@panda-ui/common'
import type { PopperExposed } from '../popper'
import type { cascaderProps } from './props'
import type { CascaderKeyConfig, CascaderOptionState, CascaderValue } from './symbol'

const defaultKeyConfig: Required<CascaderKeyConfig> = {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  hasChild: 'hasChild',
}

export function useCascader(
  props: ExtractPropTypes<typeof cascaderProps>,
  { emit }: { emit: any },
) {
  const popper = ref<PopperExposed>()
  const referenceEl = computed(() => reference.value)
  const popperEl = computed(() => popper.value?.wrapper)
  const placement = ref<Placement>(props.placement ?? 'bottom-start')

  const { reference, transferTo, updatePopper } = usePopper({
    popper: popperEl,
    placement,
    transfer: toRef(props, 'to'),
    isDrop: true,
  })
  const { isHover } = useHover(reference)
  const showClearIcon = computed(() => isHover.value && props.clearable && currentValues.value[0]?.length)

  const ID_KEY = Symbol('id_key')
  const PARENT_KEY = Symbol('parent_key')

  let flattedOptions: Record<any, any>[] = []

  let optionIdMap: Map<number, CascaderOptionState> = null!
  let optionValueMap: Map<string, CascaderOptionState> = null!

  const updateTrigger = ref(1)
  const optionTree = ref<CascaderOptionState[]>([])

  const openedIds = ref<number[]>([])
  const optionsList = computed(() => {
    return [
      optionTree.value,
      ...openedIds.value.map(id => optionIdMap.get(id)?.children).filter(Boolean),
    ]
  })

  const currentVisible = ref(props.visible)
  const currentLabels = ref<string[]>([])
  const currentValues = ref<string[]>([])
  const hasValue = computed(() => !!currentValues.value[0])

  const usingHover = computed(() => props.trigger === 'hover')

  function createOptionStates(rawOptions: Record<string | symbol, any>[]) {
    const {
      value: valueKey,
      label: labelKey,
      disabled: disabledKey,
      hasChild: hasChildKey,
    } = { ...defaultKeyConfig, ...props.keyConfig }

    return rawOptions.map((rawOption) => {
      const {
        [ID_KEY]: id,
        [PARENT_KEY]: parent,
        [valueKey]: value,
        [labelKey]: label,
        [disabledKey]: disabled,
        [hasChildKey]: hasChild,
      } = rawOption

      return reactive<CascaderOptionState>({
        id,
        parent,
        value,
        disabled,
        hasChild,
        label: label || String(value),
        fullValue: '',
        fullLabel: '',
        children: [],
        checked: false,
        data: rawOption,
      })
    })
  }

  function initOptionsList() {
    flattedOptions = flatTree(props.options as Record<any, any>[], {
      keyField: ID_KEY,
      parentField: PARENT_KEY,
    })

    updateTrigger.value++
  }

  function initOptionsStates() {
    const optionList = createOptionStates(flattedOptions)

    optionIdMap = new Map()
    optionValueMap = new Map()

    for (let i = 0; i < optionList.length; ++i) {
      const option = optionList[i]

      initOptionFull(option, props.separator!)
      optionIdMap.set(option.id, toRaw(option))
      optionValueMap.set(option.fullValue, toRaw(option))
    }

    optionTree.value = transformTree(optionList, { callback: initOptionFull })
  }

  function toggleVisible(visible = !currentVisible.value) {
    updatePopper()
    if (props.disabled || props.readonly)
      return

    if (currentVisible.value !== visible) {
      currentVisible.value = visible
      emit('update:visible', visible)
      emitEvent(props.onToggle!, visible)
    }
  }

  function handleOptionSelect(option: CascaderOptionState, depth: number) {
    if (!option || option.disabled)
      return

    if (props.cascadedCount && depth + 1 === props.cascadedCount)
      handleSingleSelect(option)

    if (option.hasChild || option.children?.length)
      handlePanelOpen(option, depth)
    else
      handleSingleSelect(option)
  }

  function handlePanelOpen(option: CascaderOptionState, depth: number) {
    if (!option.children.length)
      return

    if (depth < openedIds.value.length)
      openedIds.value = openedIds.value.slice(0, depth)

    openedIds.value.push(option.id)
  }

  function initOptionFull(option: CascaderOptionState, separator: string = props.separator!) {
    let value = option.value as string
    let label = option.label
    let parent = optionIdMap.get(option.parent)

    while (parent) {
      value = `${parent.value}${separator}${value}`
      label = `${parent.label}${separator}${label}`
      parent = optionIdMap.get(parent.parent)
    }

    option.fullValue = value
    option.fullLabel = label
  }

  function handleSingleSelect(option: CascaderOptionState) {
    currentValues.value[0] = option.fullValue
    currentLabels.value[0] = !props.briefLabel ? option.fullLabel : option.label

    toggleVisible(false)

    const values = parseFullValueToArray(option.fullValue)
    emittedValue.value = option.fullValue

    emitEvent(props.onSelect!, values)
    emitEvent(props.onChange!, option.fullValue, values)
    emit(
      'update:value',
      values.map(x => x.value),
    )
  }

  function parseFullValueToArray(fullValue: string): Array<CascaderOptionState> {
    const option = optionValueMap.get(fullValue)!
    const values = [option!]

    let parent = optionIdMap.get(option.parent)

    while (parent) {
      values.unshift(parent)
      parent = optionIdMap.get(parent.parent)
    }

    return values
  }

  function handleClearEmitValue() {
    emit(
      'update:value',
      [],
    )
    emitEvent(props.onChange!, '', [])
    openedIds.value = []
  }

  function initValueAndLabel(value: CascaderValue | undefined) {
    if (!value)
      return

    const stringValue = value?.join(props.separator)
    const option = optionValueMap.get(stringValue)

    if (option) {
      currentValues.value = [stringValue]
      currentLabels.value = [!props.briefLabel ? option.fullLabel : option.label]
    }
    else {
      currentValues.value = []
      currentLabels.value = []
    }

    const firstValue = currentValues.value[0]

    if (firstValue) {
      const option = optionValueMap.get(firstValue)!
      const ids = []

      let parent = optionIdMap.get(option.parent)

      while (parent) {
        ids.unshift(parent.id)
        parent = optionIdMap.get(parent.parent)
      }

      openedIds.value = ids
    }
  }

  const emittedValue = ref()

  watchEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    props.separator

    initOptionsList()
  })

  let outsideChanged = false

  watch(emittedValue, () => {
    outsideChanged = true
  })

  watch(updateTrigger, initOptionsStates, {
    immediate: true,
  })

  watch(
    () => props.value,
    (value) => {
      if (value !== emittedValue.value || outsideChanged) {
        emittedValue.value = value
        initValueAndLabel(value)

        nextTick(() => {
          outsideChanged = false
        })
      }
    },
    { immediate: true },
  )
  watch(() => props.visible, () => {
    if (props.visible)
      updatePopper()

    currentVisible.value = props.visible
  }, {
    immediate: true,
  })

  return {
    popper,
    popperEl,
    reference,
    transferTo,
    hasValue,
    usingHover,
    currentValues,
    currentLabels,
    showClearIcon,
    referenceEl,
    optionsList,
    currentVisible,
    openedIds,
    toggleVisible,
    handlePanelOpen,
    handleOptionSelect,
    handleClearEmitValue,
  }
}
