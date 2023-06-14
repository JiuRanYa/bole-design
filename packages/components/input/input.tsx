import { useNamespace } from '@bole-design/hooks'
import { isNull, useProps } from '@bole-design/common'
import { computed, defineComponent, ref, toRef } from 'vue'
import { inputProps } from './props'
import { debounce, throttle } from '@bole-design/utils'

export default defineComponent({
  name: 'Input',
  props: inputProps,
  emits: ['update:value'],
  setup(_props, { slots, emit }) {
    const ns = useNamespace('input')
    const className = computed(() => {
      return [ns.b(), ns.bs('vars'), ns.bs('wrapper')]
    })
    const inputClass = computed(() => {
      return [ns.bm('control')]
    })
    const props = useProps('input', _props, {
      value: '',
      debounce: false,
      placeholder: null
    })

    const initialValue = isNull(props.value) ? '' : String(props.value)
    const currentValue = ref(initialValue)
    const placeholder = toRef(props, 'placeholder')

    const hasPrefix = computed(() => {
      return !!slots.prefix
    })
    const hasSuffix = computed(() => {
      return !!slots.suffix
    })
    const hasBefore = computed(() => {
      return !!slots.before
    })
    const hasAfter = computed(() => {
      return !!slots.after
    })

    function handleChange(event: Event) {
      const value = (event.target as HTMLInputElement).value
      setValue(value)
    }

    function setValue(value: string) {
      currentValue.value = value
      emit('update:value', value)
    }

    const handleInput = props.debounce ? debounce(handleChange) : throttle(handleChange)

    function renderInput() {
      return (
        <div class={className.value}>
          <input
            class={inputClass.value}
            value={currentValue.value}
            onInput={handleInput}
            placeholder={props.placeholder ? placeholder.value : ''}
          />
        </div>
      )
    }
    function renderPrefix() {
      return slots.prefix && slots.prefix()
    }
    function renderSuffix() {
      return slots.suffix && slots.suffix()
    }

    return () => {
      if (hasPrefix.value) {
        return (
          <div class={ns.bs('wrapper')}>
            {hasPrefix.value ? renderPrefix() : null}
            {renderInput()}
            {hasSuffix.value ?? renderSuffix()}
          </div>
        )
      }

      return renderInput()
    }
  }
})
