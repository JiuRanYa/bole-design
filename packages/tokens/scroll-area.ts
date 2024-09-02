import type { InjectionKey } from 'vue'

export interface ScrollAreaContext {
  handleTrackPointerDown: (e: PointerEvent) => void
  handleThumbPointerDown: (e: PointerEvent) => void
}
export const scrollAreaKey: InjectionKey<ScrollAreaContext> = Symbol('BlScrollArea')
