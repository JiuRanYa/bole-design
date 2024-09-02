<script setup lang="ts">
import { ref } from 'vue'
import type { RuleData, RuleOption } from '@panda-ui/components/filter/types'
import { InputType } from '@panda-ui/components/filter/types'

const ruleData = ref<RuleData>()

const ruleOptions: RuleOption[] = [
  {
    field: 'dateFieldFormat',
    label: '时间date字段格式化',
    operators: [
      { label: '大于', value: 'GREATER_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '介于', value: 'BETWEEN', isBetween: true },
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
    ],
    inputType: InputType.DATE,
    optionProps: {
      valueFormat: 'YYYY年MM月DD日',
    },
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
      { label: '不等于', value: 'NOT_EQUALS' },
    ],
    inputType: InputType.INPUTNUMBER,
    optionProps: {
      controlPosition: 'right',
      step: 2,
      max: 100,
      precision: 1,
    },
  },
  {
    field: 'userCount',
    label: '用户数量',
    operators: [
      { label: '包含', value: 'AND' },
      { label: '包含其中之一', value: 'OR' },
    ],
    inputType: InputType.MULTIINPUTNUMBER,
    optionProps: {
      controlPosition: 'right',
      step: 2,
      min: 10,
    },
  },
  {
    field: 'cascader',
    label: 'cascader字段',
    operators: [
      { label: '限于', value: 'IN' },
      { label: '不限于', value: 'NOT_IN' },
    ],
    inputType: InputType.CASCADER,
    cascaderOptions: [
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
    ],
    optionProps: {
      separator: '->',
    },
  },
]
</script>

<template>
  <Filter v-model:ruleData="ruleData" :rule-options="ruleOptions" />
</template>
