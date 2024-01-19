<template>
  <div :class="ns.b()">
    <div v-for="(filter, index) in filters" :key="index">
      <div :class="filtersClass">
        <slot name="filter" :filter="filter">
          <Filter
            :readonly="filter.readonly"
            :ruleOptions="ruleOptions"
            :visible="filter.visible"
            v-model:rules="filter.rules"
          />
        </slot>

        <div v-if="!filter.readonly" :class="ns.be('item__actions')">
          <slot
            name="actions"
            :index="index"
            :filter="filter"
            :addFilter="addFilter"
            :copyFilter="copyFilter"
            :removeFilter="removeFilter"
          >
            <Icon
              v-if="filter.rules.length > 0"
              :icon="Plus"
              :scale="1.1"
              :class="[
                ns.bem('item__actions', 'add'),
                filters[index + 1] && !filters[index + 1].rules.length
                  ? ns.bem('item__actions', 'disabled')
                  : ''
              ]"
              title="添加筛选组"
              @click.stop="addFilter(index)" />
            <Icon
              v-if="filter.rules.length > 0"
              :class="ns.bem('item__actions', 'copy')"
              :icon="CustomM"
              :scale="1.1"
              title="复制筛选组"
              @click.stop="copyFilter(index)" />

            <Icon
              v-if="filters.length > 1"
              :class="ns.bem('item__actions', 'delete')"
              :icon="TrashcanM"
              :scale="1.3"
              title="移除筛选组"
              @click.stop="removeFilter(index)"
          /></slot>
        </div>
      </div>
    </div>

    <div v-if="filters.length > 1" :class="ns.be('operator')">
      <div :class="ns.be('operator__line')" />
      <div :class="ns.be('operator__text')">或</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useProps } from '@panda-ui/common'
import { Filter, Icon } from '@panda-ui/components'
import { useNamespace } from '@panda-ui/hooks'
import { Plus, CustomM, TrashcanM } from '@panda-ui/icons'
import { filterGroupProps } from './props'
import { FilterGroupItem, InputType, RuleOption } from './types'

defineOptions({
  name: 'FilterGroup'
})
const emit = defineEmits(['update:rulesGroup'])
const _props = defineProps(filterGroupProps)
const props = useProps('filter', _props, {
  visible: false,
  readonly: false,
  ruleOptions: {
    default: [],
    validator: (ruleOptions: RuleOption[]) => {
      return ruleOptions.every(rule => Object.values(InputType).includes(rule.inputType))
    }
  }
})

const filters = ref<FilterGroupItem[]>(
  props.rulesGroup.length > 0
    ? props.rulesGroup.map(rules => ({
        rules,
        visible: rules.length ? false : props.visible,
        readonly: props.readonly
      }))
    : [{ rules: [], readonly: props.readonly, visible: !props.readonly && props.visible }]
)

const setFiltersVisible = (visible: boolean) => {
  filters.value.forEach(filter => {
    filter.visible = visible
  })
}

const addFilter = (index: number) => {
  if (filters.value[index + 1] && !filters.value[index + 1].rules.length) {
    return
  }
  setFiltersVisible(false)
  filters.value.splice(index + 1, 0, { rules: [], visible: props.visible })
}

const copyFilter = (index: number) => {
  setFiltersVisible(false)
  filters.value.splice(index + 1, 0, { rules: [...filters.value[index].rules], visible: false })
}

const removeFilter = (index: number) => {
  setFiltersVisible(false)
  filters.value.splice(index, 1)
}

const ns = useNamespace('filter-group')
const filtersClass = computed(() => {
  return [
    ns.be('item'),
    {
      [ns.be('groups')]: filters.value.length > 1
    }
  ]
})

watch(
  () => filters.value,
  () => {
    emit(
      'update:rulesGroup',
      filters.value.map(filter => filter.rules)
    )
  },
  {
    deep: true
  }
)
</script>
