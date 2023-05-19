<template>
  <div>
    <slot name="trigger" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toolTipProps } from './props'

export default defineComponent({
  name: 'Tooltip',
  props: toolTipProps
})
</script>
