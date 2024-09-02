import { nextTick, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import type { DOMWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { InputNumber } from '..'

vi.useFakeTimers()

function getValue(wrapper: DOMWrapper<Element>) {
  return (wrapper.element as HTMLInputElement).value
}

function emitInput(wrapper: DOMWrapper<Element>, value: number) {
  const input = wrapper.element as HTMLInputElement
  input.value = String(value)
  input.dispatchEvent(new Event('input'))
}

function emitChange(wrapper: DOMWrapper<Element>, value: number) {
  const input = wrapper.element as HTMLInputElement
  input.value = String(value)
  input.dispatchEvent(new Event('change'))
}

describe('inputNumber', () => {
  it('render', async () => {
    const input = ref()
    const wrapper = mount(() => <InputNumber placeholder="请输入内容" value={input.value} />)

    expect(wrapper.find('.bl-input-number').exists()).toBeTruthy()
    expect(wrapper.find('.bl-input-number-vars').exists()).toBeTruthy()
  })

  it('change placeholder', async () => {
    const input = ref()
    const wrapper = mount(() => <InputNumber placeholder="请输入内容" value={input.value} />)

    const inputElm = wrapper.find('input')
    const nativeInput = inputElm.element

    await inputElm.trigger('focus')

    expect(inputElm.exists()).toBe(true)
    expect(nativeInput.placeholder).toMatchInlineSnapshot(`"请输入内容"`)
  })

  it('scientific notation', async () => {
    const value = 1.112381280125e-10
    const wrapper = mount(InputNumber, {
      props: { value },
    })

    expect(getValue(wrapper.find('input'))).toEqual(String(value))

    await wrapper.setProps({ value: null as any })
    expect(getValue(wrapper.find('input'))).toEqual('')
  })

  it('disabled', async () => {
    const input = ref()
    const wrapper = mount(() => (
      <InputNumber disabled placeholder="请输入内容" value={input.value} />
    ))

    expect(wrapper.find('.bl-input-number--disabled').exists()).toBeTruthy()
    const inputElm = wrapper.find('input')
    const nativeInput = inputElm.element

    await inputElm.trigger('focus')

    expect(inputElm.exists()).toBe(true)
    expect(nativeInput.disabled).toMatchInlineSnapshot(`true`)
  })

  it('change event', async () => {
    const onChange = vi.fn()
    const wrapper = mount(InputNumber, {
      props: { onChange },
    })
    const input = wrapper.find('input')

    emitChange(input, 123)
    await nextTick()
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(123)
    expect(wrapper.emitted()).toHaveProperty('update:value')
    expect(wrapper.emitted()['update:value'][0]).toEqual([123])
  })

  it('input event', async () => {
    const onInput = vi.fn()
    const wrapper = mount(InputNumber, {
      props: { onInput },
    })
    const input = wrapper.find('input')

    emitInput(input, 123)
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(onInput).toHaveBeenCalled()
  })

  it('invalid value', async () => {
    // const wrapper = mount(InputNumber, {
    //   props: { value: 123 }
    // })
    // await wrapper.setProps({ value: 'abc' as any })
    // expect(getValue(wrapper.find('input'))).toEqual('')
  })
  it('min max value, out range show warning', async () => {
    const onChange = vi.fn()
    const onInput = vi.fn()
    const wrapper = mount(InputNumber, {
      props: {
        min: 10,
        max: 100,
        onChange,
        onInput,
      },
    })

    const inputElm = wrapper.find('input')
    //
    emitChange(inputElm, 1)
    await nextTick()

    expect(onChange).toHaveBeenLastCalledWith(10)

    emitInput(inputElm, 101)
    vi.runOnlyPendingTimers()
    await nextTick()

    expect(onInput).toHaveBeenLastCalledWith(101)
    expect(wrapper.find('.bl-input-number').classes()).toContain('bl-input-number--warning')
  })
  it('change via keys', async () => {
    const wrapper = mount(InputNumber)
    const input = wrapper.find('input')

    await nextTick()
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('1')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')
  })
  it('step', async () => {
    const wrapper = mount(() => <InputNumber step={2} />)
    const input = wrapper.find('input')

    await nextTick()
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(getValue(input)).toEqual('2')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('0')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(getValue(input)).toEqual('-2')
  })
})
