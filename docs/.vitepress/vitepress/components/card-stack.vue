<script setup lang="ts">
import { computed, defineComponent, defineEmits, nextTick, onMounted, ref } from 'vue'
import { throttleAndDebounce } from '../utils'

const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
  cardWidth: {
    type: Number,
    default: () => 300,
  },
  cardHeight: {
    type: Number,
    default: () => 400,
  },
  stackWidth: {
    type: [Number, String],
    default: () => null,
  },
  sensitivity: {
    type: Number,
    default: () => 0.25,
  },
  maxVisibleCards: {
    type: Number,
    default: () => 10,
  },
  scaleMultiplier: {
    type: Number,
    default: () => 0.5, // last visible card will be 50% scale
  },
  speed: {
    type: Number,
    default: () => 0.2,
  },
  paddingHorizontal: {
    type: Number,
    default: () => 20,
  },
  paddingVertical: {
    type: Number,
    default: () => 20,
  },
})

const emit = defineEmits(['move'])

defineComponent({
  name: 'CardStackSelector',
})

const container = ref<HTMLDivElement>()

const stack = ref<Array<any>>([])
const width = ref<number>(0)
const activeCardIndex = ref<number>(1)
const isDragging = ref<boolean>(false)
const dragStartX = ref<number>(0)
const dragStartY = ref<number>(0)
const isDraggingRight = ref<boolean>(false)

const _stackWidth = computed(() => {
  if (!props.stackWidth)
    return props.cardWidth + props.paddingHorizontal * 2
  else if (typeof props.stackWidth === 'number')
    return props.stackWidth

  return width.value || container.value!.clientWidth
})
const _maxVisibleCards = computed(() => {
  return props.cards.length > props.maxVisibleCards ? props.maxVisibleCards : props.cards.length - 1
})
const _scaleMultiplier = computed(() => {
  return ((props.scaleMultiplier - 1) * -1) / 10
})
const containerWidth = computed(() => {
  if (!props.stackWidth)
    return `${props.cardWidth + props.paddingHorizontal * 2}px`
  else if (typeof props.stackWidth === 'number')
    return `${props.stackWidth}px`

  return props.stackWidth
})
const elementXPosOffset = computed(() => {
  return container.value!.getBoundingClientRect().x
})
const isTouch = computed(() => {
  return 'ontouchstart' in window
})
const dragEvent = computed(() => {
  return isTouch.value ? 'touchmove' : 'mousemove'
})
const touchStartEvent = computed(() => {
  return isTouch.value ? 'touchstart' : 'mousedown'
})
const touchEndEvent = computed(() => {
  return isTouch.value ? 'touchend' : 'mouseup'
})
const stackRestPoints = computed(() => {
  return props.cards.map((item, index) => {
    const offset = xPosOffset.value * (index - 1)

    if (!index)
      return _stackWidth.value + props.paddingHorizontal
    else if (index === 1)
      return _stackWidth.value - props.cardWidth - props.paddingHorizontal
    else
      return _stackWidth.value - props.cardWidth - offset - props.paddingHorizontal
  })
})
const xPosOffset = computed(() => {
  return (
    (_stackWidth.value - props.paddingHorizontal * 2 - props.cardWidth)
    / (_maxVisibleCards.value - 2)
  )
})
const cardDefaults = computed(() => {
  return props.cards.map((card, index: number) => {
    const scale = index >= 1 ? 1 - _scaleMultiplier.value * (index - 1) : 1
    const xPos = stackRestPoints.value[index]

    return {
      opacity: index > 0 && index < _maxVisibleCards.value ? 1 : 0,
      display: index < _maxVisibleCards.value + 1 ? 'block' : 'none',
      xPos: index < _maxVisibleCards.value ? xPos : xPos + xPosOffset.value,
      yPos: props.paddingVertical,
      scale: scale > 0 ? scale : 0,
      width: props.cardWidth,
      height: props.cardHeight,
      zIndex: props.cards.length - index,
      isDragging: isDragging.value,
    }
  })
})

const originalActiveCardIndex = computed(() => {
  if (stack.value[activeCardIndex.value])
    return stack.value[activeCardIndex.value]._index

  return 0
})

function init() {
  // move bottom card to top of stack (positioned offscreen)
  props.cards.unshift(props.cards.pop())

  stack.value = props.cards.map((card: any, index) => {
    return {
      _id: new Date().getTime() + index,
      _index: index,
      ...card,
      ...cardDefaults.value[index],
    }
  })
}

function rebuild() {
  nextTick(() => {
    stack.value = stack.value.map((card, index) => {
      return {
        ...card,
        ...cardDefaults.value[index],
      }
    })
  })
}
const handleResize = throttleAndDebounce(() => {
  width.value = container.value!.clientWidth
  rebuild()
}, 250)
function onNext() {
  const cardToMoveToBottomOfStack = stack.value.shift()
  stack.value.push(cardToMoveToBottomOfStack)
  rebuild()
}
function onPrevious() {
  const cardToMoveToTopOfStack = stack.value.pop()
  stack.value.unshift(cardToMoveToTopOfStack)
  rebuild()
}
function updateStack() {
  const activeCard = stack.value[activeCardIndex.value]
  const activeCardRestPoint = stackRestPoints.value[activeCardIndex.value]
  const distanceTravelled = activeCard.xPos - activeCardRestPoint
  const minDistanceToTravel = (props.cardWidth + props.paddingHorizontal) / (1 / props.sensitivity)

  emit('move', 0)

  if (isDraggingRight.value) {
    if (distanceTravelled > minDistanceToTravel)
      onNext()
    else
      rebuild()
  }
  else {
    if (distanceTravelled * -1 > minDistanceToTravel)
      onPrevious()
    else
      rebuild()
  }
}
function moveStack(dragXPos: number) {
  const activeCardOffset = dragXPos - dragStartX.value

  emit('move', activeCardOffset / (props.cardWidth + props.paddingHorizontal))

  if (isDraggingRight.value)
    activeCardIndex.value = 1
  else
    activeCardIndex.value = 0 // first card is positioned offscreen

  stack.value = stack.value.map((card, index) => {
    const isActiveCard = index === activeCardIndex.value
    const xPos = isActiveCard
      ? cardDefaults.value[index].xPos + activeCardOffset
      : cardDefaults.value[index].xPos
      + (xPosOffset.value / (props.cardWidth + props.paddingHorizontal)) * activeCardOffset

    const scale = isActiveCard
      ? cardDefaults.value[index].scale
      : cardDefaults.value[index].scale
      + (_scaleMultiplier.value / (props.cardWidth + props.paddingHorizontal)) * activeCardOffset

    return {
      ...card,
      ...cardDefaults.value[index],
      xPos,
      scale,
      opacity: index === 0 && !isDraggingRight.value ? 1 : cardDefaults.value[index].opacity,
    }
  })
}
function getDragXPos(e: TouchEvent | MouseEvent) {
  return isTouch.value ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
}
function getDragYPos(e: TouchEvent | MouseEvent) {
  return isTouch.value ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
}
function onTouchStart(e: TouchEvent | MouseEvent) {
  isDragging.value = true
  dragStartX.value = getDragXPos(e) - elementXPosOffset.value
  dragStartY.value = getDragYPos(e)

  document.addEventListener(dragEvent.value, onDrag)
}
function onTouchEnd() {
  isDragging.value = false
  dragStartX.value = 0
  dragStartY.value = 0

  document.removeEventListener(dragEvent.value, onDrag)
  updateStack()
}
function onDrag(e: TouchEvent | MouseEvent) {
  const dragXPos = getDragXPos(e) - elementXPosOffset.value

  isDraggingRight.value = dragXPos > dragStartX.value
  moveStack(dragXPos)
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
  container.value!.addEventListener(touchStartEvent.value, onTouchStart)
  document.addEventListener(touchEndEvent.value, onTouchEnd)
})
</script>

<template>
  <div ref="container" class="card-stack__wrapper">
    <div
      class="card-stack__stack"
      :style="{
        height: `${cardHeight + paddingVertical * 2}px`,
        width: containerWidth,
      }"
    >
      <div
        v-for="(card, index) in stack"
        :key="card._id"
        class="card-stack__card"
        :style="{
          opacity: card.opacity,
          display: card.display,
          top: `${card.yPos}px`,
          width: `${card.width}px`,
          height: `${card.height}px`,
          zIndex: card.zIndex,
          transition: `transform ${isDragging ? 0 : speed}s ease, opacity ${speed}s ease`,
          transform: `
            scale(${card.scale}, ${card.scale})
            translate(${card.xPos}px, 0)
          `,
        }"
      >
        <slot :card="{ ...card, $index: index }" name="card" />
      </div>
    </div>
    <slot
      name="nav"
      v-bind="{ activeCardIndex: originalActiveCardIndex, onNext, onPrevious }"
    />
  </div>
</template>

<style scoped>
.card-stack__wrapper {
  position: relative;
}

.card-stack__stack {
  position: relative;
  overflow: hidden;
}

.card-stack__card {
  position: absolute;
  transform-origin: 0 50%;
  cursor: grab;
}
</style>
