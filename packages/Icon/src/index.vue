<template>
  <svg class="icon" :style="{ width: IconSize, height: IconSize, fill: color }" aria-hidden="true">
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<script setup lang="ts">
import './iconfont'
import { computed, ref, toRefs } from 'vue'
const props = defineProps<{
  name?: string
  size?: number | string
  color?: string
}>()
const { name, size, color } = toRefs(props)

const IconName = computed(() => `#icon-${name.value}`)
const IconSize = computed(() => {
  const iconSize = ref('')
  if (typeof size.value === 'number') {
    iconSize.value = `${size.value}px`
  } else if (typeof size.value === 'string') {
    iconSize.value = size.value
  }
  return iconSize.value
})
</script>

<style lang="scss" scoped>
@import '/styles/icon.scss';
</style>
