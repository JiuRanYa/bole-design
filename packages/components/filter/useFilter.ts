import type { SetupContext } from 'vue'
import { ref } from 'vue'
import { emitEvent } from '@panda-ui/common'
import type { FilterProps, RuleData, RuleDataVal, RuleOption, filterEmits } from './types'
import { Category, LogicalOperator } from './types'

export function useFilter(props: FilterProps, emit: SetupContext<typeof filterEmits>['emit']) {
  const visible = ref<boolean>(false)
  const currIndex = ref<number>(0)
  const editData = ref<RuleDataVal | null>(null)
  const currentRuleData = ref<RuleData | null>(props.ruleData || null)
  const currentOption = ref<RuleOption | null>(props.ruleOptions.find(op => op.field === editData.value?.field) || null)

  function setCurrentRuleData(ruleData: RuleData | null) {
    currentRuleData.value = ruleData
  }

  function setCurrentOption(option: RuleOption | null) {
    currentOption.value = option
  }

  function setEditData(data: RuleDataVal | null) {
    editData.value = data
  }

  function setVisible(value: boolean) {
    visible.value = value
  }

  function setRuleData() {
    emit('update:ruleData', currentRuleData.value)
    setVisible(false)
    emitEvent(props.onChange, currentRuleData.value)
  }

  function editRule(data: RuleDataVal) {
    if (currentRuleData.value?.category === Category.PRIMARY) {
      currentRuleData.value = data
    }
    else if (currentRuleData.value?.category === Category.LOGIGAL) {
      if (Array.isArray(currentRuleData.value.val)) {
        currentRuleData.value.val.splice(currIndex.value, 1, data)
        currentRuleData.value = { ...currentRuleData.value }
      }
    }
    setRuleData()
  }

  function addRule(data: RuleDataVal) {
    if (!currentRuleData.value) {
      currentRuleData.value = data
    }
    else if (currentRuleData.value?.category === Category.PRIMARY) {
      currentRuleData.value = {
        category: Category.LOGIGAL,
        operator: LogicalOperator.AND,
        val: [currentRuleData.value, data] as RuleDataVal[],
      }
    }
    else {
      if (Array.isArray(currentRuleData.value.val)) {
        currentRuleData.value.val.push(data)
        currentRuleData.value = { ...currentRuleData.value }
      }
    }
    setRuleData()
  }

  function removeRule(index: number) {
    if (!currentRuleData.value)
      return

    if (currentRuleData.value?.category === Category.PRIMARY) {
      currentRuleData.value = null
    }
    else if (currentRuleData.value?.category === Category.LOGIGAL) {
      if (Array.isArray(currentRuleData.value.val)) {
        currentRuleData.value.val.splice(index, 1)
        if (currentRuleData.value.val.length === 1)
          currentRuleData.value = { ...currentRuleData.value.val[0] }

        else
          currentRuleData.value = { ...currentRuleData.value }
      }
    }
    setRuleData()
  }

  function setCurrIndex(index: number) {
    currIndex.value = index
  }

  return {
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
  }
}
