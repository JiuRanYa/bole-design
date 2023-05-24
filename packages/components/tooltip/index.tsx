import { Fragment, computed, defineComponent, mergeProps, ref, toRef, createTextVNode } from 'vue'
import { toolTipProps } from './props'
import { placementWhiteList, useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { Popper, PopperExposed } from '@bole-design/components'
import usePopper from '@bole-design/hooks/usePopper'

const TEXT_VNODE = createTextVNode('').type

export default defineComponent({
  name: 'Tooltip',
  inheritAttrs: false,
  props: toolTipProps,
  components: {
    Popper
  },
  setup: (_props, { attrs, slots }) => {
    const ns = useNamespace('tooltip')
    const props = useProps('tooltip', _props, {
      content: '',
      wrap: false,
      placement: {
        default: 'bottom',
        validator: value => placementWhiteList.includes(value)
      },
      transfer: false,
      reverse: false
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

    function syncTriggerRef(el?: HTMLElement | null) {
      if (el) {
        console.log(el, el.nextElementSibling)
        originTriggerEl.value = el.nextElementSibling as HTMLElement | undefined
      } else {
        originTriggerEl.value = undefined
      }
    }

    return () => {
      const CustomTag = props.wrap ? (props.wrap === true ? 'span' : (props.wrap as any)) : null

      const renderTrigger = () => {
        if (!triggerVNode) return null

        if (triggerVNode.type === TEXT_VNODE) {
          return CustomTag ? <span>{triggerVNode}</span> : <span {...attrs}>{triggerVNode}</span>
        }

        if (!CustomTag) {
          triggerVNode.props = mergeProps(triggerVNode.props || {}, attrs)
        }

        return triggerVNode
      }

      return [
        triggerVNode && CustomTag ? (
          <CustomTag
            class={[ns.b(), ns.bs('vars'), props.inherit && ns.bm('inherit')]}
            ref={originTriggerEl}
          >
            {triggers}
          </CustomTag>
        ) : (
          <Fragment ref={syncTriggerRef as any}>{renderTrigger()}</Fragment>
        ),
        <Popper
          ref={popper}
          class={{
            [ns.be('popper')]: true,
            [ns.bs('vars')]: true,
            [ns.bem('popper', props.reverse ? 'dark' : 'light')]: true
          }}
          role={'tooltip'}
          tabindex={-1}
          to=""
        >
          <div class={{ [ns.be('tip')]: true }}>{slots.default?.()}</div>
        </Popper>
      ]
    }
  }
})
