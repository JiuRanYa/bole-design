import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { Github } from 'lucide-vue-next'
import TimePicker from '../time-picker.vue'

vi.useFakeTimers()

async function runScrollTimers() {
  vi.runOnlyPendingTimers()
  await nextTick()
  vi.runOnlyPendingTimers()
  await nextTick()
}

describe('timePicker', () => {
  it('render', async () => {
    const wrapper = mount(TimePicker, {
      props: { visible: true },
    })

    expect(wrapper.classes()).toContain('bl-time-picker')
    expect(wrapper.classes()).toContain('bl-time-picker-vars')
    expect(wrapper.find('.bl-time-picker__popper').exists()).toBeTruthy()
  })

  it('value', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '19:14:47' },
    })

    await nextTick()

    const units = wrapper.findAll('.bl-time-picker__unit')

    expect(units[0].text()).toEqual('19')
    expect(units[1].text()).toEqual('14')
    expect(units[2].text()).toEqual('47')

    await wrapper.trigger('click')
    await nextTick()
    await runScrollTimers()

    const list = wrapper.find('.bl-time-picker__panels')
    const activeItems = list.findAll('.bl-time-picker__column__cell--active')

    expect(activeItems.length).toEqual(3)
    expect(activeItems[0].text()).toEqual('19')
    expect(activeItems[1].text()).toEqual('14')
    expect(activeItems[2].text()).toEqual('47')
  })

  it('suffix slot', async () => {
    const wrapper = mount(() => (
      <TimePicker suffix={Github}>
        {{
          suffix: () => <span class="suffix"></span>,
        }}
      </TimePicker>
    ))

    expect(wrapper.find('.bl-time-picker__suffix').exists()).toBe(true)
    expect(wrapper.findComponent(Github).exists()).toBe(false)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('labels', async () => {
    const wrapper = mount(() => (
      <TimePicker labels={{ hour: '时', minute: '分', second: '秒' }}></TimePicker>
    ))

    await wrapper.trigger('click')
    expect(expect(wrapper.find('.bl-time-picker__selector').text()).toEqual('--时:--分:--秒'))
  })

  it('click unit', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '09:24:47' },
    })
    const selector = wrapper.find('.bl-time-picker__selector')

    await wrapper.trigger('click')
    const units = wrapper.findAll('.bl-time-picker__unit')

    await units[0].trigger('click')

    await wrapper.trigger('clickoutside')
    await wrapper.trigger('click')
    await units[2].trigger('click')
    expect(selector.find('.bl-time-picker__unit--focused').exists()).toBeTruthy()
  })

  it('step', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '09:24:47', hourStep: 2, minuteStep: 30, visible: true },
    })

    const columns = wrapper.findAll('.bl-time-picker__column')

    expect(columns[0].findAll('.bl-time-picker__column__cell').length).equals(12)
    expect(columns[1].findAll('.bl-time-picker__column__cell').length).equals(2)
  })

  it('change callback', async () => {
    const fn = vi.fn()

    const wrapper = mount(TimePicker, {
      props: { value: '09:24:47', onChange: fn, visible: true },
    })

    const columns = wrapper.findAll('.bl-time-picker__column')

    const firstHourCell = columns[0].find('.bl-time-picker__column__cell')
    await firstHourCell.trigger('click')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(firstHourCell.text()).toEqual('00')

    const firstMinuteCell = columns[1].find('.bl-time-picker__column__cell')
    await firstMinuteCell.trigger('click')

    expect(fn).toHaveBeenCalledTimes(2)
    expect(firstMinuteCell.text()).toEqual('00')
  })

  it('range', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '09:24:47', visible: true, range: true },
    })

    const lists = wrapper.findAll('.bl-time-picker__list')
    const exchange = wrapper.find('.bl-time-picker__exchange')

    expect(lists.length).toBe(2)
    expect(exchange.exists()).toBeTruthy()
  })

  it('key actions', async () => {
    const onInput = vi.fn()
    const onPlus = vi.fn()
    const onMinus = vi.fn()
    const wrapper = mount(TimePicker, {
      props: {
        value: '09:24:47',
        onInput,
        onPlus,
        onMinus,
      },
    })

    await wrapper.trigger('click')
    const input = wrapper.find('.bl-time-picker__input')
    const units = wrapper.findAll('.bl-time-picker__unit')

    await units[0].trigger('click')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(units[0].text()).toEqual('08')
    expect(onMinus).toHaveBeenCalled()
    expect(onMinus).toHaveBeenLastCalledWith('hour', 8)

    await input.trigger('keydown', { key: 'Tab' })
    expect(units[1].classes()).toContain('bl-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(units[1].text()).toEqual('25')
    expect(onPlus).toHaveBeenCalled()
    expect(onPlus).toHaveBeenLastCalledWith('minute', 25)

    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(units[2].classes()).toContain('bl-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(units[0].classes()).toContain('bl-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowLeft' })
    expect(units[2].classes()).toContain('bl-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'ArrowRight' })
    await input.trigger('keydown.shift', { key: 'Tab' })
    expect(units[2].classes()).toContain('bl-time-picker__unit--focused')

    await input.trigger('keydown', { key: 'Digit4' })
    expect(units[2].text()).toEqual('04')
    expect(onInput).toHaveBeenCalled()
    expect(onInput).toHaveBeenLastCalledWith('second', 4)

    await input.trigger('keydown', { key: 'Numpad6' })
    expect(units[2].text()).toEqual('46')

    await input.trigger('keydown', { key: 'Digit0' })
    expect(units[2].text()).toEqual('00')

    await input.trigger('keydown', { key: 'Numpad8' })
    await input.trigger('keydown', { key: 'Numpad8' })
    expect(units[2].text()).toEqual('59')
  })
})
