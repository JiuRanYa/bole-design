---
title: Filter
lang: zh-CN
description: 筛选器组件
---

# Filter

## 基础用法

通过`ruleOptions`设置筛选可选项目，通过`v-model`进行双向绑定

:::demo

filter/basic

:::

指定`operator`中的`isBetween`, 可以进行范围输入

:::warning

`isBetween` 字段目前只支持`InputType.INPUT`和`InputType.DATE`

:::

## 默认规则

通过`ruleData`可以给筛选器设置默认规则。

:::demo

filter/default

:::

## 只读状态

通过`readonly`可以设置筛选器为只读状态。此时不能新增筛选规则，也不能触发任何事件。

:::demo

filter/readonly

:::

## props透传

在`Filter`组件内置了许多通用组件如`Input`、`Select`

通过`optionProps`字段可以为内置组件配置`props`

:::demo

filter/props

:::

## 规则嵌套

规则嵌套适用于具有`层级关系`的规则

指定`parentField`可以设置可选项的父选项，其中父选项的`inputType`必须为`custom`。

同时，一个`inputType`为`custom`的子选项也可以设置为其他子项的父选项，构成多层嵌套。

:::demo

filter/nested

:::

## 校验规则

在`ruleOptions`中设置`validationSchema`字段可以添加校验规则。

其中`validationSchema`需要符合`yup`的设置规则，可参考：[Yup](https://www.npmjs.com/package/yup)

:::demo

filter/validation

:::

:::warning

校验规则当前仅支持`Input`类型

:::

## 自定义插槽

可以通过 rule 插槽来自定义筛选项目，trigger 插槽来自定义筛选按钮

:::demo

filter/custom

:::

## Filter 参数

| 名称        | 类型           | 说明                     | 默认值 | 始于 |
| ----------- | -------------- | ------------------------ | ------ | ---- |
| ruleData       | `RuleData` \| `null` | 筛选器绑定的值   |  -      | -  |
| readonly       | `boolean`   | 筛选器只读属性           | -      | -    |
| ruleOptions | `RuleOption[]` | 需传入的筛选器可选项列表 | []     | -    |

## Filter 事件

| 名称   | 说明                 | 类型                        | 始于 |
| ------ | -------------------- | --------------------------- | ---- |
| change | 绑定值发生改变时触发 | (value: `RuleData` \| `null`) => void | -    |

## 补充类型

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
  CASCADER = 'cascader',
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
