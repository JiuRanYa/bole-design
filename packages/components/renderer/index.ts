import type { ComponentPublicInstance } from 'vue'
import Renderer from './renderer'

export { Renderer }
export { rendererProps } from './props'

export type RendererExposed = ComponentPublicInstance & InstanceType<typeof Renderer>
export type { RendererProps } from './props'
