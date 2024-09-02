import { reactive } from 'vue'
import type { tabsProps } from './props'

export function useTabsStates(props: typeof tabsProps) {
  return reactive({
    currentValue: props.value,
  })
}
