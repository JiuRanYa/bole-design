import { computed, CSSProperties, defineComponent, h, inject } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { colProps } from './props'
import { ROW_STATE } from '../row/symbol'

export default defineComponent({
  name: 'Col',
  props: colProps,
  setup(props, { slots }) {
    const ns = useNamespace('col')

    const classNames = computed(() => {
      return [
        ns.b(),
        ns.bs('vars'),
        {
          [ns.bm(props.span || 24)]: true,
        },
      ]
    })

    const rowState = inject(ROW_STATE)

    const style = computed(() => {
      const style: CSSProperties = {}

      if (rowState) {
        if (typeof rowState.gap === 'number') {
          style.paddingLeft = style.paddingRight = `${rowState.gap / 2}px`
        }
        if (Array.isArray(rowState.gap)) {
          style.paddingLeft = style.paddingRight = `${rowState.gap[0] / 2}px`
        }
      }

      return style
    })

    return () =>
      h(
        props.tag || 'div',
        {
          class: classNames.value,
          style: style.value,
        },
        {
          default: () => slots.default && slots.default(),
        }
      )
  },
})
