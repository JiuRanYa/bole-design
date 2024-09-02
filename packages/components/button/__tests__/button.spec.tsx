import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import { Button } from '..'

const TEXT = 'Text'

describe('button', () => {
  it('render', () => {
    const wrapper = mount(() => <Button>{TEXT}</Button>)

    expect(wrapper.find('.bl-button').classes()).toContain('bl-button-vars')
    expect(wrapper.find('.bl-button').text()).toEqual(TEXT)
  })

  it('disabled', async () => {
    const wrapper = mount(() => <Button disabled />)

    expect(wrapper.classes()).toContain('bl-button--disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('handle click', async () => {
    const wrapper = mount(() => <Button>{TEXT}</Button>)

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
