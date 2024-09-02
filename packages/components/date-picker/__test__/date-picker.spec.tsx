import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DatePicker } from '..'

describe('datePicker', () => {
  it('render', async () => {
    const wrapper = mount(DatePicker, {})

    expect(wrapper.find('.bl-date-picker')).toBeTruthy()
  })
})
