<script setup lang="ts">
import { Repl } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import '@vue/repl/style.css'
</script>

<template>
  <div>
    <Repl :editor="Monaco" />
  </div>
</template>

<style scoped></style>
