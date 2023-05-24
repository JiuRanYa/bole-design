import { Fragment, computed, defineComponent, ref, toRef } from 'vue'
import { toolTipProps } from './props'
import { placementWhiteList, useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { Popper, PopperExposed } from '@bole-design/components'
import usePopper from '@bole-design/hooks/usePopper'

export default defineComponent({
  name: 'Tooltip',
  props: toolTipProps,
  components: {
    Popper
  },
  setup: (_props, { slots }) => {
    const ns = useNamespace('tooltip')
    const props = useProps('tooltip', _props, {
      content: '',
      wrap: true,
      placement: {
        default: 'bottom-start',
        validator: value => placementWhiteList.includes(value)
      },
      transfer: false
    })
    const triggers = slots.trigger?.()
    const triggerVNode = triggers ? triggers[0] : null

    const popper = ref<PopperExposed>()
    const popperEl = computed(() => popper.value?.wrapper)

    const originTriggerEl = ref<HTMLElement>()
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')

    usePopper({
      referenceEl: originTriggerEl,
      transfer,
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
        <Popper ref={popper} to="body">
          {slots.default?.()}
        </Popper>
      ]
    }
  }
})
