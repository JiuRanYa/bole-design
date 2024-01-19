import { Ref } from 'vue'
import { PanelData } from '../panel/types'

export type PanelDirection = 'horizontal' | 'vertical'

export interface PanelGroupStates {
  layout: number[]
  panelDataArray: Ref<PanelData>[]
}
export interface DragStates {
  initialCursorPosition?: number
  isDragging: boolean
  dragHandleId: string
  initialLayout: number[]
  pivotIndice: number[]
}

export type ResizeEvent = MouseEvent
