import { nextTick, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import { Tabs } from '..'
import { TabsTrigger } from '../../tabs-trigger/index'
import { TabsPane } from '../../tabs-pane/index'

describe('tabs', () => {
  it('render', async () => {
    const wrapper = mount(() => (
      <Tabs defaultValue="account" tab-position="top" />
    ), {
      slots: {
        trigger: () => {
          return (
            <>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </>
          )
        },
        default: () => {
          return (
            <>
              <TabsPane value="account">Make changes to your account here.</TabsPane>
              <TabsPane value="password">Change your password here.</TabsPane>
            </>
          )
        },
      },
    })

    expect(wrapper.find('.bl-tabs').exists()).toBeTruthy()
  })

  it('disabled', async () => {
    const activeName = ref('account')
    const wrapper = mount(() => (
      <Tabs v-model:value={activeName.value}>
        {{
          trigger: () => (
            <>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password" disabled>Password</TabsTrigger>
            </>
          ),
        }}
      </Tabs>
    ))

    const triggers = wrapper.findAll('.bl-tabs-trigger')
    expect(triggers[1].classes().includes('bl-tabs-trigger__disabled')).toBeTruthy()

    // if trigger is disabled, active value should't be modified
    await triggers[1].trigger('click')
    expect(activeName.value).equals('account')
  })

  it('onTabClick event', async () => {
    const onTabClick = vi.fn()
    const activeName = ref('account')
    const wrapper = mount(() => (
      <Tabs v-model:value={activeName.value} onTabClick={onTabClick}>
        {{
          trigger: () => (
            <>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password" disabled>Password</TabsTrigger>
            </>
          ),
        }}
      </Tabs>
    ))

    const triggers = wrapper.findAll('.bl-tabs-trigger')
    expect(triggers[1].classes().includes('bl-tabs-trigger__disabled')).toBeTruthy()

    // if trigger is disabled, active value should't be modified
    await triggers[1].trigger('click')

    await nextTick()
    expect(onTabClick).toHaveBeenCalled()
    expect(onTabClick).toHaveBeenCalledTimes(1)
    expect(onTabClick).toHaveBeenCalledWith({
      name: 'password',
      disabled: true,
    })
    expect(activeName.value).toBe('account')

    await triggers[0].trigger('click')

    await nextTick()
    expect(onTabClick).toHaveBeenCalledTimes(2)
    expect(onTabClick).toHaveBeenCalledWith({
      name: 'account',
      disabled: false,
    })
    expect(activeName.value).toBe('account')
  })
})
