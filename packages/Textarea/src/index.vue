<template>
  <Textarea
    class="odos-textarea"
    :placeholder="placeholder || '请输入'"
    :value="value"
    @input="$input($event)"
    :auto-size="autoSize"
    :disabled="disabled"
    :show-count="showCount"
    :maxlength="maxlength"
  />
</template>

<script setup lang="ts">
import { Textarea } from 'ant-design-vue'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
const { value, maxlength, autoSize, showCount, disabled, placeholder } = defineProps<{
  value?: string
  maxlength?: number
  showCount?: boolean
  autoSize?: boolean
  disabled?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:value', data: string): void
}>()
const $input = (e: ChangeEvent) => {
  const target = e.target as HTMLInputElement
  emit('update:value', target.value)
}
</script>

<style lang="scss" scoped>
@import '/styles/textarea.scss';
</style>
