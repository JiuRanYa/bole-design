<template>
  <Filter :ruleOptions="ruleOptions" v-model:rules="rules" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rules = ref([])

const ruleOptions = [
  {
    field: 'isResolved',
    label: '是否处理',
    inputType: 'boolean',
    operators: [
      { label: 'is_true', value: 'is-true' },
      { label: 'is_false', value: 'is-false' }
    ]
  },
  {
    field: 'filterText',
    label: '过滤名称',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input'
  },
  {
    field: 'textContent',
    label: '客诉内容',
    operators: [
      { label: '包含', value: 'AND' },
      { label: '包含其中之一', value: 'OR' }
    ],
    inputType: 'multiInput'
  },
  {
    field: 'count',
    label: '数量',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '介于', value: 'BETWEEN', isBetween: true },
      { label: '大于', value: 'GREATER_THAN' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input'
  },
  {
    field: 'dateField',
    label: '时间date字段',
    operators: [
      { label: '大于', value: 'GREATER_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '介于', value: 'BETWEEN', isBetween: true },
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' }
    ],
    inputType: 'date'
  },
  {
    field: 'checkbox',
    label: 'checkbox字段',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'checkbox',
    choices: [
      {
        val: 'android',
        label: 'android'
      },
      {
        val: 'android-tv',
        label: 'android-tv'
      },
      {
        val: 'ios',
        label: 'ios'
      },
      {
        val: 'server',
        label: 'server'
      },
      {
        val: 'windows',
        label: 'windows'
      },
      {
        val: 'af',
        label: 'af'
      },
      {
        val: 'ar',
        label: 'ar'
      },
      {
        val: 'az',
        label: 'az'
      },
      {
        val: 'bg',
        label: 'bg'
      },
      {
        val: 'bs',
        label: 'bs'
      },
      {
        val: 'ca',
        label: 'ca'
      },
      {
        val: 'cs',
        label: 'cs'
      },
      {
        val: 'da',
        label: 'da'
      },
      {
        val: 'de',
        label: 'de'
      },
      {
        val: 'el',
        label: 'el'
      },
      {
        val: 'en',
        label: 'en'
      },
      {
        val: 'es',
        label: 'es'
      },
      {
        val: 'et',
        label: 'et'
      },
      {
        val: 'eu',
        label: 'eu'
      },
      {
        val: 'fa',
        label: 'fa'
      },
      {
        val: 'fi',
        label: 'fi'
      },
      {
        val: 'fr',
        label: 'fr'
      },
      {
        val: 'gl',
        label: 'gl'
      },
      {
        val: 'he',
        label: 'he'
      },
      {
        val: 'hi',
        label: 'hi'
      }
    ]
  },
  {
    field: 'select',
    label: 'select字段',
    operators: [
      { label: '限于', value: 'IN' },
      { label: '不限于', value: 'NOT_IN' }
    ],
    inputType: 'select',
    choices: [
      {
        val: 'android',
        label: 'android'
      },
      {
        val: 'android-tv',
        label: 'android-tv'
      },
      {
        val: 'ios',
        label: 'ios'
      },
      {
        val: 'server',
        label: 'server'
      },
      {
        val: 'windows',
        label: 'windows'
      },
      {
        val: 'af',
        label: 'af'
      },
      {
        val: 'ar',
        label: 'ar'
      },
      {
        val: 'az',
        label: 'az'
      },
      {
        val: 'bg',
        label: 'bg'
      },
      {
        val: 'bs',
        label: 'bs'
      },
      {
        val: 'ca',
        label: 'ca'
      },
      {
        val: 'cs',
        label: 'cs'
      },
      {
        val: 'da',
        label: 'da'
      },
      {
        val: 'de',
        label: 'de'
      },
      {
        val: 'el',
        label: 'el'
      },
      {
        val: 'en',
        label: 'en'
      },
      {
        val: 'es',
        label: 'es'
      },
      {
        val: 'et',
        label: 'et'
      },
      {
        val: 'eu',
        label: 'eu'
      },
      {
        val: 'fa',
        label: 'fa'
      },
      {
        val: 'fi',
        label: 'fi'
      },
      {
        val: 'fr',
        label: 'fr'
      },
      {
        val: 'gl',
        label: 'gl'
      },
      {
        val: 'he',
        label: 'he'
      },
      {
        val: 'hi',
        label: 'hi'
      }
    ]
  }
]
</script>
