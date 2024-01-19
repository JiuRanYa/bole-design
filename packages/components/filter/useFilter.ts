import { RuleData, RuleOption, FilterProps, filterEmits } from './types'
import { ref, SetupContext } from 'vue'

export function useFilter(props: FilterProps, emit: SetupContext<typeof filterEmits>['emit']) {
  const visible = ref(!props.readonly && props.visible)
  const editData = ref<RuleData | null>(null)
  const currentRules = ref<RuleData[]>(props.rules ? [...props.rules] : [])
  const currIndex = ref(0)
  const currentOption = ref(
    editData.value ? props.ruleOptions.find(op => op.field === editData.value?.field) : null
  )

  function setCurrentRules(rules: RuleData[]) {
    currentRules.value = rules
  }

  function setCurrentOption(option: RuleOption | null) {
    currentOption.value = option
  }

  function setEditData(data: RuleData | null) {
    editData.value = data
  }

  function setVisible(value: boolean) {
    visible.value = value
  }

  function setRules() {
    emit('update:rules', currentRules.value)
    setVisible(false)
  }

  function editRule(data: RuleData) {
    currentRules.value.splice(currIndex.value, 1, data)
    setRules()
  }

  function addRule(data: RuleData) {
    currentRules.value.push(data)
    setRules()
  }

  function removeRule(index: number) {
    if (!currentRules.value.length) return
    currentRules.value.splice(index, 1)
    setRules()
  }

  function setCurrIndex(index: number) {
    currIndex.value = index
  }

  return {
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
  }
}
