import { useProps } from '@panda-ui/common'
import { useNamespace } from '@panda-ui/hooks'
import { computed, CSSProperties, defineComponent, h } from 'vue'
import { iconProps } from './props'

export default defineComponent({
  name: 'Icon',
  props: iconProps,
  setup(_props, { slots }) {
    const props = useProps('icon', _props, {
      icon: {
        default: null,
        static: true
      },
      title: '',
      scale: 1,
      size: null
    })
    const ns = useNamespace('icon')
    const className = computed(() => {
      return [ns.b()]
    })
    const computedScale = computed(() => {
      return Number(props.scale) || 1
    })
    const style = computed<CSSProperties>(() => {
      return computedScale.value === 1 ? {} : { fontSize: `${computedScale.value}em` }
    })
    const iAttrs = {
      class: className.value,
      title: props.title,
      style: style.value,
      'aria-label': props.label,
      'aria-hidden': !(props.label || props.title)
    }
    return () => {
      if (props.icon) {
        return (
          <i {...iAttrs}>
            <g>{h(props.icon)}</g>
          </i>
        )
      }

      if (slots.default) {
        return (
          <i {...iAttrs}>
            <g>{slots.default()}</g>
          </i>
        )
      }

      return <i {...iAttrs}></i>
    }
  }
})
