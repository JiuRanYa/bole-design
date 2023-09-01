import { reactive } from 'vue'
import { tabsProps } from './props'

export const useTabsStates = (props: typeof tabsProps) => {
  return reactive({
    currentValue: props.value
  })
}
