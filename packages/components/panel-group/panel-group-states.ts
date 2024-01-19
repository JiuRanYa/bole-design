import { Ref } from 'vue'
import { PanelData } from '../panel/types'
import { PanelDirection } from './types'

export interface PanelGroupStates {
  layout: number[]
  gridLayout: number[]
  resizeHandleCount: number
  panelDataArray: Ref<PanelData>[]
  direction: PanelDirection
  gridColToFlexGrowMap: number[]
  showPreviewDots: boolean
}
