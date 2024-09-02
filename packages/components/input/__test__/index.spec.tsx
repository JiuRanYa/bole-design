import { nextTick, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Input } from '..'

describe('input', () => {
  it('create', async () => {
    const input = ref('input')
    const wrapper = mount(() => <Input placeholder="请输入内容" value={input.value} />)

    const inputElm = wrapper.find('input')
    const nativeInput = inputElm.element

    await inputElm.trigger('focus')

    expect(inputElm.exists()).toBe(true)
    expect(nativeInput.placeholder).toMatchInlineSnapshot(`"请输入内容"`)
    expect(nativeInput.value).toMatchInlineSnapshot(`"input"`)

    input.value = 'text'
    await nextTick()
    expect(inputElm.element.value).toMatchInlineSnapshot(`"text"`)
  })
})
