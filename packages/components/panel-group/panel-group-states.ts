import type { Ref } from 'vue'
import type { PanelData } from '../panel/types'
import type { PanelDirection } from './types'

export interface PanelGroupStates {
  layout: number[]
  gridLayout: number[]
  resizeHandleCount: number
  panelDataArray: Ref<PanelData>[]
  direction: PanelDirection
  gridColToFlexGrowMap: number[]
  showPreviewDots: boolean
  previewDots: number[]
}
