import { describe, expect, it, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { Cascader } from '..'

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
]

describe('cascader', () => {
  it('render', () => {
    const wrapper = mount(() => <Cascader options={options}></Cascader>)

    expect(wrapper.find('.bl-cascader').classes()).toContain('bl-cascader-vars')
    expect(wrapper.find('.bl-cascader__control').text()).toEqual('请选择')
  })

  it('disabled', async () => {
    const wrapper = mount(() => <Cascader disabled options={options}></Cascader>)

    expect(wrapper.find('.bl-cascader--disabled')).toBeTruthy()

    const control = wrapper.find('.bl-cascader__control')
    await control.trigger('click')
  })

  it('placeholder', async () => {
    const wrapper = mount(() => (
      <Cascader disabled placeholder="Select" options={options}></Cascader>
    ))

    expect(wrapper.find('.bl-cascader__placeholder').exists()).toBe(true)
    expect(wrapper.find('.bl-cascader__placeholder').text()).toEqual('Select')
  })

  it('toggle visible', async () => {
    const visible = ref(false)
    const wrapper = mount(() => (
      <Cascader v-model:visible={visible.value} placeholder="Select" options={options}></Cascader>
    ))

    await wrapper.find('.bl-cascader__control').trigger('click')

    const selector = wrapper.find('.bl-cascader--selector')

    expect(visible.value).toBeTruthy()
    expect(selector.classes()).toContain('bl-cascader__selector--focused')
  })

  it('toggle event', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(Cascader, {
      props: {
        onToggle,
      },
    })

    await wrapper.find('.bl-cascader__control').trigger('click')

    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenLastCalledWith(true)
    expect(wrapper.emitted()).toHaveProperty('update:visible')
    expect(wrapper.emitted('update:visible')![0]).toEqual([true])

    await wrapper.find('.bl-cascader__control').trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(onToggle).toHaveBeenLastCalledWith(false)
    expect(wrapper.emitted('update:visible')![1]).toEqual([false])

    await wrapper.setProps({ disabled: true })
    await wrapper.find('.bl-cascader__control').trigger('click')
    expect(onToggle).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted('update:visible')!.length).toBe(2)
  })

  it('popper show', async () => {
    // const wrapper = mount(Cascader, {
    //   props: {
    //     options: options
    //   }
    // })
    // expect(wrapper.find('.bl-cascader__popper').attributes('style')).toContain('display: none;')
    //
    // await wrapper.find('.bl-cascader__control').trigger('click')
    // expect(wrapper.find('.bl-cascader__popper').attributes('style')).not.toContain('display: none;')
  })

  it('popper not exits if popperAlive is false', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options,
        popperAlive: false,
      },
    })

    expect(wrapper.find('.bl-cascader__popper').exists()).toBeFalsy()

    await wrapper.find('.bl-cascader__control').trigger('click')
    expect(wrapper.find('.bl-cascader__popper').exists()).toBeTruthy()
  })

  it('clearable', async () => {
    const modelValue = ref(['component', 'form', 'checkbox'])

    const wrapper = mount(() => (
      <Cascader v-model:value={modelValue.value} clearable options={options}></Cascader>
    ))
    const selector = wrapper.find('.bl-cascader--selector')

    await wrapper.find('.bl-cascader__control').trigger('click')
    await selector.trigger('mouseenter')

    const clearIcon = wrapper.find('.bl-cascader__suffix').find('.bl-cascader__clear')
    expect(clearIcon.exists()).toBeTruthy()

    await clearIcon.trigger('click')
    expect(modelValue.value.length).equals(0)
  })
})
