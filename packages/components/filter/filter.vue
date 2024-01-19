<template>
  <div :class="ns.b()" ref="filterRef">
    <div :class="ns.be('filters')">
      <div
        v-for="(data, index) in currentRules"
        :key="data.field + index"
        :class="$slots.rule ? '' : getFiltersDataClass(index)"
        :ref="el => setFilterRefs(el as HTMLElement, index)"
        @click="triggerEdit(data, index)"
      >
        <slot name="rule" :rule="data">
          <Icon :icon="ComponentConfig[data.inputType]?.icon" :scale="1.8"></Icon>
          <span>{{ `${data.label}  ${data.operator.label} ${filterValue(data)}` }}</span>
          <Icon
            v-if="!readonly"
            :class="ns.bem('filters__data', 'delete')"
            :icon="Xmark"
            :scale="1"
            @click.stop="removeRule(index)"
          />
        </slot>
      </div>
      <div v-if="!readonly" ref="filterBtn" :class="filterBtnClass" @click="showFilterDropdown">
        <slot name="filter">
          <Icon :icon="FilterIcon"></Icon>
          <span> 筛选 </span>
        </slot>
      </div>
    </div>
  </div>

  <Popper ref="filterPopperRef" :visible="visible" :style="popperStyle" :class="popperClassName">
    <FilterDropdown :ruleOptions="ruleOptions" />
  </Popper>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue'
import { useProps } from '@panda-ui/common'
import { Filter as FilterIcon, Xmark } from '@panda-ui/icons'
import { Popper, PopperExposed, Icon } from '@panda-ui/components'
import { useNamespace, useClickOutside, usePopper } from '@panda-ui/hooks'
import type { Placement } from '@floating-ui/dom'
import {
  RuleData,
  RuleOption,
  InputType,
  ComponentConfig,
  filterEmits,
  FILTER_INJECTION_KEY
} from './types'
import { filterProps } from './props'
import FilterDropdown from './filter-dropdown.vue'
import { useFilter } from './useFilter'

defineOptions({
  name: 'Filter'
})

const emit = defineEmits(filterEmits)
const _props = defineProps(filterProps)
const props = useProps('filter', _props, {
  ruleOptions: {
    default: [],
    validator: (ruleOptions: RuleOption[]) => {
      return ruleOptions.every(rule => Object.values(InputType).includes(rule.inputType))
    }
  },
  visible: false,
  readonly: false
})

const {
  visible,
  currentRules,
  editData,
  currIndex,
  currentOption,
  setVisible,
  setCurrentRules,
  setEditData,
  setCurrIndex,
  setCurrentOption,
  editRule,
  addRule,
  removeRule
} = useFilter(props, emit)

const ns = useNamespace('filter')

const filterPopperRef = ref<PopperExposed>()
const filterPlace = ref<Placement>('bottom-start')
const placement = ref<Placement>(filterPlace.value)
const filterRef = ref<HTMLElement>()
const filterBtn = ref<HTMLElement>()
const filtersRef = ref<HTMLElement[]>([])
const setFilterRefs = (el: HTMLElement, index: number) => {
  if (el) {
    filtersRef.value[index] = el
  } else {
    filtersRef.value.splice(index, 1)
  }
}
const referenceEl = computed(() =>
  editData.value ? filtersRef.value[currIndex.value] : filterBtn.value
)
const popperEl = computed(() => filterPopperRef.value?.wrapper)
const { x, y } = usePopper({
  referenceEl,
  popperEl,
  placement
})

const popperStyle = computed(() => {
  return {
    position: 'absolute',
    left: `${x.value || 0}px`,
    top: `${y.value || 0}px`
  }
})

const popperClassName = computed(() => {
  return [ns.bs('vars')]
})

const filterBtnClass = computed(() => {
  return [
    ns.be('button'),
    {
      [ns.bem('button', 'trigger')]: visible.value && !editData.value
    }
  ]
})

const getFiltersDataClass = (index: number) => {
  return [
    ns.be('filters__data'),
    {
      [ns.bem('filters__data', 'trigger')]:
        visible.value && editData.value && index === currIndex.value
    }
  ]
}

const filterValue = (data: RuleData) => {
  if (Array.isArray(data.value)) {
    if (data.inputType === InputType.DATE) {
      return data.value.join(' - ')
    }

    if (data.inputType === InputType.MULTIINPUT) {
      if (data.value.length > 3) {
        return data.value.slice(0, 3).join(',') + ` or ${data.value.length - 3} more`
      } else {
        return data.value.join(', ')
      }
    }

    if (data.inputType === InputType.CHECKBOX) {
      return (
        data.value
          .map(val => val.label)
          .slice(0, 3)
          .join(',') + (data.value.length > 3 ? ` or ${data.value.length - 3} more` : '')
      )
    }
  }

  if (data.inputType === InputType.BOOLEAN) {
    return ''
  }

  return data.value + ''
}

const triggerEdit = (data: RuleData, index: number) => {
  if (props.readonly) return
  setVisible(true)
  setEditData(data)
  setCurrIndex(index)
}

const showFilterDropdown = () => {
  setVisible(true)
  setEditData(null)
}

const handleClickOutside = () => {
  setVisible(false)
  setEditData(null)
}

provide(FILTER_INJECTION_KEY, {
  editData,
  currentOption,
  editRule,
  addRule,
  setCurrentOption,
  setEditData
})

useClickOutside(handleClickOutside, { ignore: [popperEl] }, referenceEl)

watch(
  () => props.rules,
  () => {
    setCurrentRules([...props.rules])
  },
  {
    deep: true
  }
)

watch(
  [() => props.visible, () => props.readonly],
  () => {
    setVisible(!props.readonly && props.visible)
  },
  {
    deep: true
  }
)
</script>
