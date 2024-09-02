<script setup lang="ts">
import { ref, watch } from 'vue'
import { emitEvent, isObject, useProps } from '@panda-ui/common'
import { Filter, Icon } from '@panda-ui/components'
import { useNamespace } from '@panda-ui/hooks'
import { CustomM, Plus, TrashcanM } from '@panda-ui/icons'
import { filterGroupProps } from './props'
import { Category, InputType, LogicalOperator } from './types'
import type { FilterGroupItem, RuleData, RuleDataVal, RuleOption } from './types'

defineOptions({
  name: 'FilterGroup',
})

const _props = defineProps(filterGroupProps)

const emit = defineEmits(['update:ruleDataGroup'])

const props = useProps('filter', _props, {
  readonly: false,
  ruleOptions: {
    default: [],
    validator: (ruleOptions: RuleOption[]) => {
      return ruleOptions.every(rule => Object.values(InputType).includes(rule.inputType))
    },
  },
})

const ns = useNamespace('filter-group')

const filterElRefs = ref<any[]>([])
const filterGroup = ref<FilterGroupItem[]>(formatFilterGroupItem())

function getAddIconClass(index: number) {
  return [
    ns.bem('filters__actions', 'add'),
    {
      [ns.bem('filters__actions', 'disabled')]: filterGroup.value[index + 1] && !filterGroup.value[index + 1].ruleData,
    },
  ]
}

function setFilterElRefs(filterEl: any, index: number) {
  if (filterEl)
    filterElRefs.value[index] = filterEl
  else
    filterElRefs.value.splice(index, 1)
}

function formatFilterGroupItem(): FilterGroupItem[] {
  if (props.ruleDataGroup) {
    const topOperator = props.ruleDataGroup.operator
    if (topOperator === LogicalOperator.OR) {
      return props.ruleDataGroup.val.map((val: RuleDataVal | null) => ({
        ruleData: val,
        readonly: props.readonly,
      }))
    }
    return [{ ruleData: props.ruleDataGroup, readonly: props.readonly }]
  }
  else {
    return [{ ruleData: null, readonly: props.readonly }]
  }
}

function setRuleDataGroup() {
  const ruleDataGroupValue = filterGroup.value.length > 1
    ? {
        category: Category.LOGIGAL,
        operator: LogicalOperator.OR,
        val: [...filterGroup.value.map(filter => filter.ruleData)],
      }
    : filterGroup.value[0].ruleData

  emit('update:ruleDataGroup', ruleDataGroupValue)
  emitEvent(props.onChange, ruleDataGroupValue)
}

function addFilter(index: number) {
  if (filterGroup.value[index + 1] && !filterGroup.value[index + 1].ruleData)
    return

  filterGroup.value.splice(index + 1, 0, { ruleData: null })
  setRuleDataGroup()
}

function copyFilter(index: number) {
  const copyRuleData = filterGroup.value[index].ruleData as RuleData
  const copyFilterGroupItem: FilterGroupItem = {
    ruleData: { ...copyRuleData },
  }
  if (Array.isArray(copyRuleData.val))
    copyFilterGroupItem.ruleData = { ...copyRuleData, val: [...copyRuleData.val] }
  else if (isObject(copyRuleData.val))
    copyFilterGroupItem.ruleData = { ...copyRuleData, val: { ...copyRuleData.val } }

  filterGroup.value.splice(index + 1, 0, copyFilterGroupItem)
  setRuleDataGroup()
}

function removeFilter(index: number) {
  filterGroup.value.splice(index, 1)
  setRuleDataGroup()
}

watch(
  () => props.ruleDataGroup,
  () => {
    filterGroup.value = formatFilterGroupItem()
    filterElRefs.value.forEach(ref => ref.visible && ref.setVisible(false))
  },
)
</script>

<template>
  <div :class="ns.b()">
    <div v-if="filterGroup.length > 1" :class="ns.be('operator')">
      <div :class="ns.be('operator__line')">
        <div :class="ns.be('operator__text')">
          或
        </div>
      </div>
    </div>
    <div :class="ns.be('filters')">
      <div v-for="(filter, index) in filterGroup" :key="index" :class="filterGroup.length > 1 ? ns.be('filters__items') : ns.be('filters__single')">
        <slot name="filter" :index="index" :filter="filter">
          <Filter
            :ref="filterEl => setFilterElRefs(filterEl, index)" v-model:ruleData="filter.ruleData"
            :readonly="filter.readonly" :rule-options="ruleOptions" @change="setRuleDataGroup()"
          />
        </slot>

        <div v-if="!filter.readonly" :class="ns.be('filters__actions')">
          <slot
            name="actions" :index="index" :filter="filter" :add-filter="addFilter" :copy-filter="copyFilter"
            :remove-filter="removeFilter"
          >
            <Icon
              v-if="filter.ruleData" :class="getAddIconClass(index)" :icon="Plus" :scale="1.1" title="添加筛选组"
              @click.stop="addFilter(index)"
            />
            <Icon
              v-if="filter.ruleData" :class="ns.bem('filters__actions', 'copy')" :icon="CustomM" :scale="1.1"
              title="复制筛选组" @click.stop="copyFilter(index)"
            />
            <Icon
              v-if="filterGroup.length > 1" :class="ns.bem('filters__actions', 'delete')" :icon="TrashcanM"
              :scale="1.3" title="移除筛选组" @click.stop="removeFilter(index)"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
