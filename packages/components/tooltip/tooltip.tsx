import {
  Fragment,
  computed,
  createTextVNode,
  defineComponent,
  mergeProps,
  ref,
  toRef,
  watch,
} from 'vue'
import { placementWhiteList, triggerWhiteList, useProps } from '@panda-ui/common'
import {
  useClickOutside,
  useEventListener,
  useNamespace,
  usePopper,
  useSetTimeout,
} from '@panda-ui/hooks'
import type { PopperExposed } from '../popper/index'
import { Popper } from '../popper/index'
import { toolTipProps } from './props'

const TEXT_VNODE = createTextVNode('').type

export default defineComponent({
  name: 'Tooltip',
  inheritAttrs: true,
  props: toolTipProps,
  components: {
    Popper,
  },
  setup: (_props, { attrs, slots }) => {
    const ns = useNamespace('tooltip')
    const props = useProps('tooltip', _props, {
      content: '',
      wrap: false,
      placement: {
        default: 'bottom',
        validator: value => placementWhiteList.includes(value),
      },
      visible: false,
      transfer: null,
      reverse: false,
      trigger: {
        default: 'hover',
        validator: value => triggerWhiteList.includes(value),
      },
      disabled: false,
      mouseEnterDelay: 100,
      mouseLeaveDelay: 100,
      noArrow: false,
      transition: 'fade-in',
    })

    const visible = ref(props.visible)
    // const triggers = slots.default?.()
    const content = props.content ? <span>{props.content}</span> : slots.content?.()

    const popper = ref<PopperExposed>()
    const popperEl = computed(() => popper.value?.wrapper)

    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const trigger = computed(() => {
      return reference.value
    })

    function handleClickOutside() {
      visible.value = false
    }

    const { reference, updatePopper, transferTo } = usePopper({
      transfer,
      popper: popperEl,
      placement,
    })

    useClickOutside(handleClickOutside, { ignore: [popperEl] }, reference)

    const classNames = computed(() => {
      return [ns.b(), ns.bs('vars'), props.inherit && ns.bm('inherit')]
    })

    function syncTriggerRef(el?: HTMLElement | null) {
      if (el)
        reference.value = el.nextElementSibling as HTMLElement | undefined
      else
        reference.value = undefined
    }

    watch(
      () => props.visible,
      (value) => {
        updatePopper()
        visible.value = value
      },
    )

    const { timer } = useSetTimeout()

    function handleToggerClick() {
      if (props.disabled)
        return

      if (props.trigger === 'click')
        toggleVisible(!visible.value)
    }

    function toggleVisible(value: boolean) {
      if (value)
        updatePopper()

      visible.value = value
    }

    function handleTriggerEnter() {
      if (props.disabled)
        return

      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        timer.hover = setTimeout(() => {
          toggleVisible(true)
        }, props.mouseEnterDelay)
      }
    }

    function handleTriggerLeave() {
      if (props.disabled)
        return

      if (props.trigger === 'hover') {
        clearTimeout(timer.hover)

        timer.hover = setTimeout(() => {
          toggleVisible(false)
        }, props.mouseLeaveDelay)
      }
    }

    useEventListener(trigger, 'click', handleToggerClick)
    useEventListener(trigger, 'pointerenter', handleTriggerEnter)
    useEventListener(trigger, 'pointerleave', handleTriggerLeave)
    useEventListener(popperEl, 'pointerenter', handleTriggerEnter)
    useEventListener(popperEl, 'pointerleave', handleTriggerLeave)

    return () => {
      const CustomTag = props.wrap ? (props.wrap === true ? 'span' : (props.wrap as any)) : null
      const triggers = slots.default?.()
      const triggerVNode = triggers ? triggers[0] : null

      const renderTrigger = () => {
        if (!triggerVNode)
          return null

        if (triggerVNode.type === TEXT_VNODE)
          return CustomTag ? <span>{triggerVNode}</span> : <span {...attrs}>{triggerVNode}</span>

        if (!CustomTag)
          triggerVNode.props = mergeProps(triggerVNode.props || {}, attrs)

        return triggerVNode
      }

      return [
        triggerVNode
        && (CustomTag
          ? (
            <CustomTag {...attrs} class={classNames} ref={reference}>
              {triggers}
            </CustomTag>
            )
          : (
            <Fragment ref={syncTriggerRef as any}>{renderTrigger()}</Fragment>
            )),
        <Popper
          ref={popper}
          class={{
            [ns.be('popper')]: true,
            [ns.bs('vars')]: true,
            [ns.bem('popper', props.reverse ? 'dark' : 'light')]: true,
          }}
          to={transferTo.value}
          visible={visible.value}
          role="tooltip"
          tabindex={-1}
          transition={props.transition}
          data-placement={placement.value}
        >
          <div class={{ [ns.be('tip')]: true }}>
            {!props.noArrow && <div class={ns.be('arrow')}></div>}
            {content}
          </div>
        </Popper>,
      ]
    }
  },
})
