import type { PanelGroupProps } from 'packages/components/panel-group/props'
import type { DragStates } from 'packages/components/panel-group/types'
import type { PanelData } from 'packages/components/panel/types'
import type { CSSProperties, InjectionKey, Ref } from 'vue'

export interface PanelGroupContext {
  groupId: string
  groupProps: PanelGroupProps
  dragStates: Ref<DragStates>
  registerPanel: (panelData: Ref<PanelData>) => void
  getPanelStyle: (panelData: Ref<PanelData>) => CSSProperties
  startDragging: (event: MouseEvent, resizeHandleId: string) => void
  stopDragging: (event: MouseEvent, resizeHandleId: string) => void
  registerResizeHandler: (resizeHandleId: string) => (event: MouseEvent) => void
}
export const panelGroupKey: InjectionKey<PanelGroupContext> = Symbol('BlPanelGroup')
