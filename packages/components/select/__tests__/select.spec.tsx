import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import { Select } from '..'

const OPTIONS = [
  {
    label: '选项1',
    value: 1,
  },
  {
    label: '选项2',
    value: 2,
  },
  {
    label: '选项3',
    value: 3,
  },
  {
    label: '选项4',
    value: 4,
  },
  {
    label: '选项5',
    value: 5,
  },
  {
    label: '选项6',
    value: 6,
  },
  {
    label: '选项7',
    value: 7,
  },
  {
    label: '选项8',
    value: 8,
  },
  {
    label: '选项9',
    value: 9,
  },
]

function emitInput(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
}

// function getValue(wrapper: DOMWrapper<Element>) {
//   return (wrapper.element as HTMLInputElement).value
// }

describe('select', () => {
  it('render', async () => {
    const wrapper = mount(Select, {
      props: {
        options: OPTIONS,
        visible: true,
      },
    })

    expect(wrapper.find('.bl-select')).toBeTruthy()
    expect(wrapper.classes()).toContain('bl-select-vars')
    expect(wrapper.find('.bl-select__selector').exists()).toBe(true)
    expect(wrapper.find('.bl-select__control').exists()).toBe(true)

    expect(wrapper.find('.bl-select__popper').exists()).toBe(true)
    expect(wrapper.findAll('.bl-option').length).toEqual(9)
  })

  it('single option click', async () => {
    const wrapper = mount(Select, {
      props: {
        options: OPTIONS,
        visible: true,
      },
    })

    await wrapper.findAll('.bl-option')[0].trigger('click')
    expect(wrapper.find('.bl-select__popper').exists()).toBe(true)
    expect(wrapper.emitted('update:value')![0]).toEqual([OPTIONS[0].value])
  })

  it('prepend and append slots', async () => {
    const wrapper = mount(Select, {
      props: {
        options: OPTIONS,
        visible: true,
      },
      slots: {
        prepend: () => <div class="prepend"></div>,
        append: () => <div class="append"></div>,
      },
    })

    expect(wrapper.find('.bl-select__popper').exists()).toBe(true)
    expect(wrapper.find('.prepend').exists()).toBe(true)
    expect(wrapper.find('.append').exists()).toBe(true)
  })

  it('filter', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        filterable: true,
        options: OPTIONS,
      },
    })
    const input = wrapper.find('input').element

    emitInput(input, '2')
    await nextTick()
    expect(wrapper.findAll('.bl-option').length).toEqual(1)
    expect(wrapper.findAll('.bl-option')[0].text()).toEqual('选项2')
  })

  it('creatable', async () => {
    // const wrapper = mount(Select, {
    //   props: {
    //     visible: true,
    //     creatable: true,
    //     filterable: true,
    //     defaultFirstOption: true,
    //     options: OPTIONS,
    //   },
    // })
    // const input = wrapper.find('input').element
  })

  it('empty text', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        creatable: true,
        filterable: true,
        defaultFirstOption: true,
        options: OPTIONS,
      },
    })
    const input = wrapper.find('input').element
    emitInput(input, '123123')
    await nextTick()

    expect(wrapper.find('.bl-select--empty').exists()).toBeTruthy()
  })

  it('empty slots', async () => {
    const wrapper = mount(Select, {
      props: {
        visible: true,
        creatable: true,
        filterable: true,
        defaultFirstOption: true,
        options: OPTIONS,
      },
      slots: {
        empty: () => <div class="empty">没有数据哦</div>,
      },
    })
    expect(wrapper.find('.empty').exists()).toBeTruthy()
  })
})
