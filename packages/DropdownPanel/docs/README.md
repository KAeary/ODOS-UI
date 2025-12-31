<script setup>
import Default from './default.vue'
import TriggerDemo from './trigger.vue'
</script>

# DropdownPanel 下拉面板

根据内容自动调整大小的“下拉面板”，锚定到触发元素附近，无遮罩。支持外部点击关闭，且可通过 v-model 控制显示/隐藏。

## 基础用法

<Preview comp-name="DropdownPanel" demo-name="default">
  <Default />
</Preview>

## 使用触发插槽

当未传入 `triggerEl` 时，可使用 `trigger` 插槽包裹触发元素，组件会自动定位到插槽元素。

<Preview comp-name="DropdownPanel" demo-name="trigger">
  <TriggerDemo />
</Preview>

在插槽模式下可以不传 `v-model`，通过 `trigger="hover|click"` 控制显示与隐藏。

## Props

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| modelValue | 是否显示（v-model） | boolean | false |
| triggerEl | 触发元素（用于定位），支持组件实例（自动取 `$el`） | HTMLElement \| Component \| null | -- |
| placement | 面板位置 | 'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' | bottom-start |
| offsetX | X 轴偏移 | number | 0 |
| offsetY | Y 轴偏移 | number | 4 |
| zIndex | 面板层级 | number | 1000 |
| maxWidth | 面板最大宽度 | string \| number | auto |
| maxHeight | 面板最大高度 | string \| number | 50vh |
| fitWidth | 宽度是否适配触发元素 | boolean | true |
| trigger | 触发方式（仅插槽模式） | 'hover' \| 'click' | click |

## Slots

| 插槽名 | 说明 |
| ---- | ---- |
| default | 面板内容 |
| trigger | 触发元素，未传 `triggerEl` 时可用 |

## Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| update:modelValue | `v-model` 绑定值变化 | boolean |
| close | 面板关闭时触发 | 无 |
