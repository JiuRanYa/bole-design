import type { ExtractPropTypes, PropType } from 'vue'

export const rendererProps = Object.freeze({
  renderer: {
    type: Function,
    default: null,
  },
  data: {
    type: Object as PropType<Record<string, any>>,
    default: undefined,
  },
})

export type RendererProps = ExtractPropTypes<typeof rendererProps>
