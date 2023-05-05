import { useProps } from '@bole-design/common/props'
import { useNamespace } from '@bole-design/hooks'
import { computed, defineComponent } from 'vue'
import { menuProps } from './props'

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup: (_props, { slots }) => {
    const props = useProps('menu', _props, {})

    const ns = useNamespace('menu')

    const classNames = computed(() => {
      return [
        ns.b(),
        ns.bs('vars'),
        {
          [ns.bm('inherit')]: props.inherit
        }
      ]
    })

    function renderMenus() {
      return <li>MenuItem</li>
    }

    return () => {
      return (
        <ul class={classNames.value} role={'menu'} tabindex={-1}>
          {slots.default ? slots.default() : renderMenus()}
        </ul>
      )
    }
  }
})
