<template>
  <odos-tabs v-model:currentTab="currentTab">
    <odos-tab value="1" tab="tab1" icon="Add">tab1</odos-tab>
    <odos-tab value="2" tab="tab2" :disabled="true">tab2</odos-tab>
  </odos-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTab = ref('1')
</script>
