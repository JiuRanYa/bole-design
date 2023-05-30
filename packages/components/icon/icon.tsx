import { useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { computed, defineComponent, h } from 'vue'
import { iconProps } from './props'

export default defineComponent({
  name: 'Icon',
  props: iconProps,
  setup(_props) {
    const props = useProps('icon', _props, {
      title: '',
      label: ''
    })
    const ns = useNamespace('icon')
    const className = computed(() => {
      return [ns.b()]
    })
    const iAttrs = {
      class: className.value,
      title: props.title,
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

      return () => <i {...iAttrs}></i>
    }
  }
})
