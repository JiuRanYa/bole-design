import { Fragment, computed, defineComponent } from 'vue'
import { toolTipProps } from './props'
import { useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { Popover } from '@bole-design/components'
import usePopper from '@bole-design/hooks/usePopper'

export default defineComponent({
  name: 'Tooltip',
  props: toolTipProps,
  components: {
    Popover
  },
  setup: (_props, { slots }) => {
    const ns = useNamespace('tooltip')
    const props = useProps('tooltip', _props, {
      content: '',
      wrap: true
    })
    const triggers = slots.trigger?.()
    const triggerNode = triggers ? triggers[0] : null

    const referenceEl = computed(() => {})
    usePopper({})

    const classNames = computed(() => {
      return [ns.b()]
    })

    return () => {
      const CustomTag = props.wrap ? (props.wrap === true ? 'span' : (props.wrap as any)) : null

      return [
        triggerNode && CustomTag ? <CustomTag>{triggers}</CustomTag> : triggers,
        <Popover to="body">{slots.default?.()}</Popover>
      ]
    }
  }
})
