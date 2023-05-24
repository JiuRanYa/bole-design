import { Fragment, computed, defineComponent, ref, toRef } from 'vue'
import { toolTipProps } from './props'
import { placementWhiteList, useProps } from '@bole-design/common'
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
      wrap: true,
      placement: {
        default: 'bottom-start',
        validator: value => placementWhiteList.includes(value)
      }
    })
    const triggers = slots.trigger?.()
    const triggerVNode = triggers ? triggers[0] : null

    const popperEl = ref<HTMLElement>()
    const originTriggerEl = ref<HTMLElement>()
    const referenceEl = computed(() => {})
    const placement = toRef(props, 'placement')

    usePopper({
      referenceEl: originTriggerEl,
      popperEl,
      placement
    })

    const classNames = computed(() => {
      return [ns.b()]
    })

    return () => {
      const CustomTag = props.wrap ? (props.wrap === true ? 'span' : (props.wrap as any)) : null

      return [
        triggerVNode && CustomTag ? (
          <CustomTag ref={originTriggerEl}>{triggers}</CustomTag>
        ) : (
          triggers
        ),
        <Popover ref={popperEl} to="body">
          {slots.default?.()}
        </Popover>
      ]
    }
  }
})
