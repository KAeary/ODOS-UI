<template>
  <div>
    <odos-dropdown-panel v-model="visible" placement="bottom-end" trigger="hover">
      <template #trigger>
        <odos-button type="default">作为触发元素（hover 打开）</odos-button>
      </template>
      <h4>使用触发插槽进行定位</h4>
      <p>未传入 <code>triggerEl</code>，组件定位到 <code>trigger</code> 插槽元素。</p>
    </odos-dropdown-panel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>

<style scoped></style>
