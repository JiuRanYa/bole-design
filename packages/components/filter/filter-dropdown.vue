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
      <ul :class="ns.be('list')">
        <li
          v-for="(option, index) in currentRuleOptions"
          :key="index"
          @click="openRulePanel(option)"
        >
          <Icon :icon="ComponentConfig[option.inputType]?.icon" :scale="1.6"></Icon>
          <span>{{ option.label }}</span>
        </li>
      </ul>
    </template>
    <template v-else>
      <component :is="currentComponent" @back="backPanel" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { Input, Icon } from '@panda-ui/components'
import { useNamespace } from '@panda-ui/hooks'
import { CaretLeftM, CustomSegmentsM } from '@panda-ui/icons'
import {
  InputFilterPanel,
  CheckboxFilterPanel,
  SelectFilterPanel,
  DateFilterPanel,
  MultiInputFilterPanel,
  BooleanFilterPanel
} from './panels'
import { ComponentConfig, InputType, RuleOption, FILTER_INJECTION_KEY } from './types'
import { filterDropdownProps } from './props'

const { editData, currentOption, setCurrentOption } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'FilterDropdown',
  components: {
    InputFilterPanel,
    CheckboxFilterPanel,
    SelectFilterPanel,
    DateFilterPanel,
    MultiInputFilterPanel,
    BooleanFilterPanel
  }
})
const props = defineProps(filterDropdownProps)
const ns = useNamespace('filter')

const searchText = ref()
const inEditState = ref(!!editData.value)
const currentComponent = ref(
  editData.value ? ComponentConfig[editData.value.inputType]?.component : ''
)
const currentRuleOptions = ref(props.ruleOptions.filter(option => !option.parentField))

const className = computed(() => [ns.be('dropdown')])

const openRulePanel = (ruleOption: RuleOption) => {
  if (ruleOption.inputType !== InputType.CUSTOM) {
    inEditState.value = true
    currentComponent.value = ComponentConfig[ruleOption.inputType]?.component
  }
  setCurrentOption(ruleOption)
}

const backPanel = () => {
  inEditState.value = false
}

const backDropdownList = () => {
  setCurrentOption()
}

watch([() => props.ruleOptions, searchText, currentOption], () => {
  const currentOptions = props.ruleOptions.filter(option =>
    currentOption.value?.inputType === InputType.CUSTOM
      ? option.parentField === currentOption.value.field
      : !option.parentField
  )
  currentRuleOptions.value = searchText.value
    ? currentOptions.filter((option: RuleOption) => {
        return option.label.toLowerCase().includes(searchText.value.toLowerCase())
      })
    : currentOptions
})

watch(
  editData,
  () => {
    if (editData.value) {
      setCurrentOption(props.ruleOptions.find(op => op.field === editData.value?.field))
      currentComponent.value = ComponentConfig[editData.value.inputType]?.component
    }
    inEditState.value = !!editData.value
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
