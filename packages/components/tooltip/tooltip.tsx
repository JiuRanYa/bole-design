import {
  Fragment,
  computed,
  defineComponent,
  mergeProps,
  ref,
  toRef,
  createTextVNode,
  watch
} from 'vue'
import { toolTipProps } from './props'
import { placementWhiteList, triggerWhiteList, useProps } from '@panda-ui/common'
import {
  useNamespace,
  useEventListener,
  useClickOutside,
  usePopper,
  useSetTimeout
} from '@panda-ui/hooks'
import { Popper, PopperExposed } from '@panda-ui/components'

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
      transfer: true,
      reverse: false,
      trigger: {
        default: 'hover',
        validator: value => triggerWhiteList.includes(value)
      },
      disabled: false,
      mouseEnterDelay: 100,
      mouseLeaveDelay: 100,
      noArrow: false,
      transition: 'fade-in'
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

    function handleClickOutside() {
      visible.value = false
    }

    const { x, y } = usePopper({
      referenceEl,
      transfer,
      popperEl,
      placement
    })

    const popperStyle = computed(() => {
      return {
        position: 'absolute',
        left: `${x.value || 0}px`,
        top: `${y.value || 0}px`
      }
    })

    useClickOutside(handleClickOutside, { ignore: [popperEl] }, originTriggerEl)

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
    useEventListener(trigger, 'pointerenter', handleTriggerEnter)
    useEventListener(trigger, 'pointerleave', handleTriggerLeave)
    useEventListener(popperEl, 'pointerenter', handleTriggerEnter)
    useEventListener(popperEl, 'pointerleave', handleTriggerLeave)

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
          transition={props.transition}
          data-placement={placement.value}
          style={popperStyle.value}
        >
          <div class={{ [ns.be('tip')]: true }}>
            {!props.noArrow && <div class={ns.be('arrow')}></div>}
            {content}
          </div>
        </Popper>
      ]
    }
  }
})
