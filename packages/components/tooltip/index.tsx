import {
  Fragment,
  computed,
  defineComponent,
  mergeProps,
  ref,
  toRef,
  createTextVNode,
  onMounted,
  nextTick,
  watch
} from 'vue'
import { toolTipProps } from './props'
import { placementWhiteList, triggerWhiteList, useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { Popper, PopperExposed } from '@bole-design/components'
import usePopper from '@bole-design/hooks/usePopper'
import useEventListener from '@bole-design/hooks/useEventListener'
import useSetTimeout from '@bole-design/hooks/useSetTimeout'

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
      visible: false,
      transfer: false,
      reverse: false,
      trigger: {
        default: 'hover',
        validator: value => triggerWhiteList.includes(value)
      },
      disabled: false,
      mouseEnterDelay: 100,
      mouseLeaveDelay: 100
    })

    const visible = ref(props.visible)
    const triggers = slots.default?.()
    const content = props.content ? <span>{props.content}</span> : slots.content?.()
    const triggerVNode = triggers ? triggers[0] : null

    const popper = ref<PopperExposed>()
    const popperEl = computed(() => popper.value?.wrapper)

    const originTriggerEl = ref<HTMLElement>()
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const trigger = computed(() => {
      return originTriggerEl.value
    })
    const referenceEl = computed(() => {
      return originTriggerEl.value
    })

    usePopper({
      referenceEl,
      transfer,
      popperEl,
      placement
    })

    const classNames = computed(() => {
      return [ns.b(), ns.bs('vars'), props.inherit && ns.bm('inherit')]
    })

    function syncTriggerRef(el?: HTMLElement | null) {
      if (el) {
        originTriggerEl.value = el.nextElementSibling as HTMLElement | undefined
      } else {
        originTriggerEl.value = undefined
      }
    }

    watch(
      () => props.visible,
      value => {
        visible.value = value
      }
    )

    const { timer } = useSetTimeout()

    function handleToggerClick() {
      if (props.disabled) return

      if (props.trigger === 'click') {
        visible.value = !visible.value
      }
    }

    function handleTriggerEnter() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        timer.hover = setTimeout(() => {
          visible.value = true
        }, props.mouseEnterDelay)
      }
    }

    function handleTriggerLeave() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        timer.hover = setTimeout(() => {
          visible.value = false
        }, props.mouseLeaveDelay)
      }
    }

    useEventListener(trigger, 'click', handleToggerClick)
    useEventListener(trigger, 'mouseenter', handleTriggerEnter)
    useEventListener(trigger, 'mouseleave', handleTriggerLeave)
    useEventListener(popperEl, 'mouseenter', handleTriggerEnter)
    useEventListener(popperEl, 'mouseleave', handleTriggerLeave)

    const transferTarget = computed(() => {
      if (props.transfer === true) {
        return 'body'
      }
      if (typeof props.transfer === 'string') {
        return props.transfer
      }
      return ''
    })

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
          <CustomTag class={classNames} ref={originTriggerEl}>
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
          visible={visible.value}
          role={'tooltip'}
          tabindex={-1}
          to={transferTarget.value}
        >
          <div class={{ [ns.be('tip')]: true }}>{content}</div>
        </Popper>
      ]
    }
  }
})
