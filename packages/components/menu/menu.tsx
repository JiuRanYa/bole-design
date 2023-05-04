import { useProps } from '@bole-design/common/props'
import { defineComponent } from 'vue'
import { menuProps } from './props'

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup: (_props) => {
    const props = useProps('menu', _props, {})

    console.log(_props)

    console.log(_props)

    return () => {
      return <div>menu</div>
    }
  },
})
