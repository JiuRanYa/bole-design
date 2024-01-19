---
title: FilterGroup
lang: zh-CN
---

# FilterGroup

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/filter-group/*/*.vue')
</script>

## 基础用法

通过`ruleOptions`设置筛选可选项目，通过`v-model:rulesGroup`进行双向绑定。`rulesGroup`默认为空，此时只有一个筛选器。

:::demo

filter-group/basic

:::

## 多个筛选组

通过`rulesGroup`可以给筛选器组合设置默认值，筛选组之间默认为 `或`的关系。

当至少有一个筛选组并且至少包含一个筛选规则时，可以进行`新增`、`复制`和`删除`。

:::demo

filter-group/multi

:::

**注意：当只有一个筛选组时，不能对它进行删除，只有`新增`和`复制`。**

## 默认打开新增筛选组的筛选面板

通过`visible`可以设置新增的筛选组初次渲染时，筛选面板为可见状态

:::demo

filter-group/visible

:::

## 筛选器只读状态

通过`readonly`可以设置筛选组为只读状态。此时不能新增筛选组规则，也不能触发任何事件。

:::demo

filter-group/readonly

:::
**请注意，当 `readonly=true` 时，即使将 `visible` 属性设置为 `true`，筛选面板也不会打开。**

## 自定义筛选组项目

可以通过 filter 插槽来自定义筛选器，actions 插槽来自定义筛选按钮

:::demo

filter-group/custom

:::

## Filter 参数

| 名称        | 类型           | 说明                     | 默认值 | 始于 |
| ----------- | -------------- | ------------------------ | ------ | ---- |
| rulesGroup  | `RuleData[][]` | 筛选器组合绑定的值       | -      | -    |
| ruleOptions | `RuleOption[]` | 需传入的筛选器可选项列表 | []     | -    |

## 类型

```ts
 enum InputType {
  INPUT = 'input',
  MULTIINPUT = 'multiInput',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  CUSTOM = 'custom',
  BOOLEAN = 'boolean'
}

type Operator = {
  label: string
  value: string
  isBetween?: boolean
}

type Choice = {
  val: string
  label: string
}

type RuleData = {
  field: string
  label: string
  operator: Operator
  value: string | number | boolean | any[]
  inputType: InputType
} & {
  [key: string]: any
}

type RuleOption = {
  field: string
  label: string
  inputType: InputType
  operators?: Operator[]
  choices?: Choice[]
  options?: RuleOption[]
  parentField?: string
} & {
  [key: string]: any
}
```
