<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { useIcons, useProps } from '@panda-ui/common'
import { Xmark } from '@panda-ui/icons'
import type { PopperExposed } from '@panda-ui/components'
import { Icon, Popper } from '@panda-ui/components'
import { useClickOutside, useNamespace, usePopper } from '@panda-ui/hooks'
import type { Placement } from '@floating-ui/dom'
import Button from '../button/index.vue'
import { Category, ComponentConfig, FILTER_INJECTION_KEY, InputType, filterEmits } from './types'
import type {
  RuleDataVal,
  RuleOption,
} from './types'
import { filterProps } from './props'
import FilterDropdown from './filter-dropdown.vue'
import { useFilter } from './useFilter'

defineOptions({
  name: 'Filter',
})

const _props = defineProps(filterProps)
const emit = defineEmits(filterEmits)
const props = useProps('filter', _props, {
  ruleOptions: {
    default: [],
    validator: (ruleOptions: RuleOption[]) => {
      return ruleOptions.every(rule => Object.values(InputType).includes(rule.inputType))
    },
  },
  readonly: false,
  transitionName: () => ns.ns('drop'),
})

const {
  visible,
  currentRuleData,
  editData,
  currIndex,
  currentOption,
  setVisible,
  setCurrentRuleData,
  setEditData,
  setCurrIndex,
  setCurrentOption,
  editRule,
  addRule,
  removeRule,
} = useFilter(props, emit)

const ns = useNamespace('filter')
const icons = useIcons()

const filterPopperRef = ref<PopperExposed>()
const placement = ref<Placement>('bottom-start')
const filterBtn = ref()
const filtersRef = ref<HTMLElement[]>([])

const currentRuleList = computed<RuleDataVal[]>(() => {
  if (!currentRuleData.value)
    return []
  else if (currentRuleData.value?.category === Category.PRIMARY)
    return [currentRuleData.value] as RuleDataVal[]
  else
    return currentRuleData.value.val as RuleDataVal[]
})

const referenceEl = computed(() =>
  editData.value ? filtersRef.value[currIndex.value] : filterBtn.value?.el,
)
const popperEl = computed(() => filterPopperRef.value?.wrapper)
const { updatePopper } = usePopper({
  reference: referenceEl,
  popper: popperEl,
  placement,
  isDrop: true,
})

const popperClassName = computed(() => {
  return [ns.bs('popper')]
})

const filterBtnClass = computed(() => {
  return [
    ns.be('button'),
    {
      [ns.bem('button', 'trigger')]: visible.value && !editData.value,
    },
  ]
})
function setFilterRefs(el: HTMLElement | null, index: number) {
  if (el)
    filtersRef.value[index] = el
  else
    filtersRef.value.splice(index, 1)
}

function getFiltersDataClass(index: number) {
  return [
    ns.be('filters__data'),
    {
      [ns.bem('filters__data', 'trigger')]:
        visible.value && editData.value && index === currIndex.value,
    },
  ]
}

function formatPlaceholder(data: RuleDataVal) {
  if (Array.isArray(data.val)) {
    if (data.inputType === InputType.DATE)
      return data.val.join(' ~ ')

    if (data.inputType === InputType.MULTIINPUT) {
      if (data.val.length > 3)
        return `${data.val.slice(0, 3).join(',')} or ${data.val.length - 3} more`
      else
        return data.val.join(', ')
    }

    if (data.inputType === InputType.CHECKBOX) {
      return (
        data.val
          .map(val => val.label)
          .slice(0, 3)
          .join(',') + (data.val.length > 3 ? ` or ${data.val.length - 3} more` : '')
      )
    }
  }

  if (data.inputType === InputType.BOOLEAN)
    return ''

  if (data.inputType === InputType.SELECT || data.inputType === InputType.CASCADER)
    return data.val.label

  return `${data.val}`
}

function triggerEdit(data: RuleDataVal, index: number) {
  if (props.readonly)
    return
  setVisible(true)
  setEditData(data)
  setCurrIndex(index)
  updatePopper()
}

function showFilterDropdown() {
  setVisible(true)
  setEditData(null)
  updatePopper()
}

function onAfterPopperLeave() {
  setEditData(null)
}

function handleClickOutside() {
  setVisible(false)
}

provide(FILTER_INJECTION_KEY, {
  editData,
  currentOption,
  editRule,
  addRule,
  setCurrentOption,
  setEditData,
})

useClickOutside(handleClickOutside, { ignore: [popperEl] }, referenceEl)

watch(
  () => props.ruleData,
  () => {
    setCurrentRuleData(props.ruleData)
  },
  {
    deep: true,
  },
)

defineExpose({
  visible,
  setVisible,
})
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.be('filters')">
      <template v-if="currentRuleList.length">
        <div
          v-for="(data, index) in currentRuleList"
          :key="data.field + index"
          :ref="el => setFilterRefs(el as HTMLElement, index)"
          :class="$slots.rule ? '' : getFiltersDataClass(index)"
          @click="triggerEdit(data, index)"
        >
          <slot name="rule" :rule="data">
            <Icon v-bind="icons[ComponentConfig[data.inputType]?.icon!]" />

            <span>{{ `${data.label} ${data.operator.label} ${formatPlaceholder(data)}` }}</span>

            <Icon
              v-if="!readonly"
              :class="ns.bem('filters__data', 'delete')"
              :icon="Xmark" :scale="1"
              @click.stop="removeRule(index)"
            />
          </slot>
        </div>
      </template>

      <Button v-if="!readonly" ref="filterBtn" :class="filterBtnClass" type="ghost" @click="showFilterDropdown">
        <slot name="trigger">
          <Icon v-bind="icons.filter" />
          <span> 筛选 </span>
        </slot>
      </Button>
    </div>
  </div>

  <Popper
    ref="filterPopperRef"
    :to="props.to"
    :visible="visible"
    :class="popperClassName"
    :transition="props.transitionName"
    :on-after-leave="onAfterPopperLeave"
  >
    <FilterDropdown :rule-options="ruleOptions" />
  </Popper>
</template>
