<template>
  <div class="odos-radio" :class="styleClass">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { computed, useSlots } from 'vue'

const props = defineProps<{
  size?: 'small' | 'medium' | 'large'
  value?: string | number
}>()

const emit = defineEmits<{
  (e: 'update:value', data?: string | number): void
}>()

const slots = useSlots()
const randerContent = () => {
  const list = slots.default && slots.default()
  return (
    <>
      {list?.map((it: any) => (
        <div
          class={{
            'odos-radio-item': true,
            'active-alarm': it.props.alarm === '' || it.props.alarm,
            active: it.props.value == props.value
          }}
          onClick={() => {
            if (it.props.value === props.value) {
              emit('update:value', undefined)
            } else {
              emit('update:value', it.props.value)
            }
          }}
        >
          {it.props.label}
        </div>
      ))}
    </>
  )
}

const styleClass = computed(() => {
  return {
    [`odos-radio-size--${props.size}`]: props.size
  }
})
</script>

<style lang="scss">
@import '/styles/radio.scss';
</style>
