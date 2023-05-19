import { computed, defineComponent } from 'vue'
import { toolTipProps } from './props'
import { useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { Popover } from '@bole-design/components'

export default defineComponent({
  name: 'Tooltip',
  props: toolTipProps,
  components: {
    Popover
  },
  setup: (_props, { slots }) => {
    const ns = useNamespace('tooltip')
    const props = useProps('tooltip', _props, {
      content: ''
    })
    const triggers = slots.trigger?.()

    const classNames = computed(() => {
      return [ns.b()]
    })

    return () => {
      return [<span>{triggers}</span>, <Popover to="body">{slots.default?.()}</Popover>]
    }
  }
})
