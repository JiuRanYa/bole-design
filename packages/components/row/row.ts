import { computed, defineComponent, h, provide, reactive, toRef } from 'vue'
import { rowProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import { ROW_STATE } from './symbol'

export default defineComponent({
  name: 'Row',
  props: rowProps,
  setup(props, { slots }) {
    const ns = useNamespace('row')

    const classNames = computed(() => {
      return [ns.b(), [ns.bs('vars')]]
    })

    const styles = computed(() => {
      if (!props.gap) return null

      if (typeof props.gap === 'number') {
        return {
          [ns.cv('h-gap')]: `${props.gap}px`,
        }
      }

      if (Array.isArray(props.gap)) {
        const [horizontal, vertical] = props.gap

        return {
          [ns.cv('h-gap')]: `${horizontal}px`,
          [ns.cv('v-gap')]: `${vertical}px`,
        }
      }

      return null
    })

    provide(
      ROW_STATE,
      reactive({
        gap: toRef(props, 'gap'),
      })
    )

    return () =>
      h(
        props.tag || 'div',
        {
          class: classNames.value,
          style: styles.value,
        },
        {
          default: () => slots.default && slots.default(),
        }
      )
  },
})
