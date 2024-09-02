---
title: FilterGroup
lang: zh-CN
description: 组合筛选器
---

# FilterGroup

## 基础用法

通过`ruleOptions`设置筛选可选项目，通过`v-model:ruleDataGroup`进行双向绑定。`ruleDataGroup`默认为空，此时只有一个筛选器。

:::demo

filter-group/basic

:::

## 只读状态

通过`readonly`可以设置筛选组为只读状态。此时不能新增筛选组规则，也不能触发任何事件。

:::demo

filter-group/readonly

:::

## 多个筛选组

通过`ruleDataGroup`可以给筛选器组合设置默认值，筛选组之间默认为 `或`的关系。

当至少有一个筛选组并且至少包含一个筛选规则时，可以进行`新增`、`复制`和`删除`。

:::demo

filter-group/multi

:::

:::warning
当只有一个筛选组时，不能对它进行删除，只有`新增`和`复制`。
:::

## 自定义筛选组

可以通过 filter 插槽来自定义筛选器，actions 插槽来自定义筛选按钮

:::demo

filter-group/custom

:::

## FilterGroup 参数

| 名称        | 类型           | 说明                     | 默认值 | 始于 |
| ----------- | -------------- | ------------------------ | ------ | ---- |
| ruleDataGroup  | `RuleData` \| `null` | 筛选器组合绑定的值       | -      | -    |
| readonly       | `boolean`   | 筛选器只读属性           | -      | -    |
| ruleOptions | `RuleOption[]` | 需传入的筛选器可选项列表 | []     | -    |

## FilterGroup 事件

| 名称   | 说明                 | 类型                        | 始于 |
| ------ | -------------------- | --------------------------- | ---- |
| change | 绑定值发生改变时触发 | (value: `RuleData` \| `null`) => void | -    |

## 类型

```ts
enum InputType {
  INPUT = 'input',
  MULTIINPUT = 'multiInput',
  INPUTNUMBER = 'inputNumber',
  MULTIINPUTNUMBER = 'MultiInputNumber',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  CUSTOM = 'custom',
  BOOLEAN = 'boolean',
  CASCADER = 'cascader'
}

enum LogicalOperator {
  AND = 'and',
  OR = 'or',
}

interface Operator {
  label: string
  value: string
  isBetween?: boolean
}

interface Choice {
  value: string
  label: string
}

interface RuleDataVal {
  category: Category
  operator: Operator
  val: any
  field: string
  label: string
  inputType: InputType
}

interface RuleData {
  category: Category
  operator: Operator | LogicalOperator
  val: any
  field?: string
  label?: string
  inputType?: InputType
}

type RuleOption = {
  field: string
  label: string
  inputType: InputType
  operators?: Operator[]
  choices?: Choice[]
  options?: RuleOption[]
  parentField?: string
  validationSchema?: any
  optionProps?: Record<string, any>
  cascaderOptions?: CascaderOption[]
} & {
  [key: string]: any
}
```
