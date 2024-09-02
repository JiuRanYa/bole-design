<script setup lang="ts">
import { computed, inject, ref, watch, watchEffect } from 'vue'
import { Icon, Input, ScrollArea } from '@panda-ui/components'
import { useNamespace } from '@panda-ui/hooks'
import { CaretLeftM, CustomSegmentsM } from '@panda-ui/icons'
import { useIcons } from '@panda-ui/common'
import { ComponentConfig, FILTER_INJECTION_KEY, InputType } from './types'
import {
  BooleanFilterPanel,
  CascaderFilterPanel,
  CheckboxFilterPanel,
  DateFilterPanel,
  InputFilterPanel,
  InputNumberFilterPanel,
  MultiInputFilterPanel,
  MultiInputNumberFilterPanel,
  RadioFilterPanel,
  SelectFilterPanel,
} from './panels'
import type { RuleOption } from './types'
import { filterDropdownProps } from './props'

defineOptions({
  name: 'FilterDropdown',
  components: {
    InputFilterPanel,
    CheckboxFilterPanel,
    SelectFilterPanel,
    DateFilterPanel,
    MultiInputFilterPanel,
    RadioFilterPanel,
    BooleanFilterPanel,
    CascaderFilterPanel,
    InputNumberFilterPanel,
    MultiInputNumberFilterPanel,
  },
})

const props = defineProps(filterDropdownProps)
const { editData, currentOption, setCurrentOption } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter')
const icons = useIcons()

const searchText = ref()
const inEditState = ref(!!editData.value)
const currentComponent = ref(
  editData.value ? ComponentConfig[editData.value.inputType]?.component : '',
)
const currentRuleOptions = ref(props.ruleOptions.filter(option => !option.parentField))

const className = computed(() => [ns.be('dropdown')])

function openRulePanel(ruleOption: RuleOption) {
  if (ruleOption.inputType !== InputType.CUSTOM) {
    inEditState.value = true
    currentComponent.value = ComponentConfig[ruleOption.inputType]?.component
  }
  setCurrentOption(ruleOption)
}

function backPanel() {
  inEditState.value = false
}

function backDropdownList() {
  setCurrentOption(null)
}

watchEffect(() => {
  const currentOptions = props.ruleOptions.filter(option =>
    currentOption.value?.inputType === InputType.CUSTOM
      ? option.parentField === currentOption.value.field
      : !option.parentField,
  )
  if (!searchText.value) {
    currentRuleOptions.value = currentOptions
    return
  }
  currentRuleOptions.value = currentOptions.filter((option: RuleOption) => {
    return option.label.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

watch(
  editData,
  () => {
    if (editData.value) {
      setCurrentOption(props.ruleOptions.find(op => op.field === editData.value?.field) || null)
      currentComponent.value = ComponentConfig[editData.value.inputType]?.component
    }
    inEditState.value = !!editData.value
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div :class="className">
    <template v-if="!inEditState">
      <div v-if="currentOption?.inputType === InputType.CUSTOM" :class="ns.be('panel__title')">
        <Icon
          :icon="CaretLeftM"
          :scale="2"
          :class="ns.be('panel__back')"
          @click="backDropdownList"
        />
        <Icon :icon="CustomSegmentsM" :scale="1.8" />
        <span>{{ currentOption?.label }}</span>
      </div>
      <div :class="ns.be('search')">
        <Input v-model:value="searchText" placeholder="Search..." />
      </div>
      <ScrollArea>
        <ul :class="ns.be('list')">
          <li
            v-for="(option, index) in currentRuleOptions"
            :key="index"
            @click="openRulePanel(option)"
          >
            <Icon
              v-bind="icons[ComponentConfig[option.inputType]?.icon!]"
            />
            <span>{{ option.label }}</span>
          </li>
        </ul>
      </ScrollArea>
    </template>
    <template v-else>
      <component :is="currentComponent" @back="backPanel" />
    </template>
  </div>
</template>
