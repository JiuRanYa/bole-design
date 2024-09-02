export type FullScreenType = 'window' | 'browser'

export interface FullScreenExposed {
  toggle: (type: FullScreenType, zIndex?: number) => void
}
