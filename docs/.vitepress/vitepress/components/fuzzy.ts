import type { type DirectiveBinding, createApp } from 'vue'

type APP = ReturnType<typeof createApp>

const fuzzy = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.position = 'absolute'
    el.style.top = binding.value.height
    el.style.left = binding.value.width
    el.style.width = binding.value.width
    el.style.height = binding.value.height
    el.style.backgroundImage = `url("${binding.value.url}")`
    el.style.backgroundSize = 'cover'
    el.style.filter = 'blur(200px)'
    el.style.overflow = 'hidden'
    el.style.transform = 'scale(1)'
  },
  install(Vue: APP) {
    Vue.directive('fuzzy', fuzzy)
  },
}

export default fuzzy
