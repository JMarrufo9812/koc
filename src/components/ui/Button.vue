<template>
  <div>
    <button
      class="my-btn text-uppercase widht100"
      :style="getColor"
      >
      <slot name="button-content">
        <span class="font1-5em text-white">{{ text }}</span>
      </slot>
    </button>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: false
  },
  color: {
    type: String,
    default: 'success'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  styleBtn: {
    type: String,
  }
})

const getColor = computed(() => {
  if (props.disabled) {
    return `${props.styleBtn}; background: var(--gray)`  
  }
  return `${props.styleBtn}; background: var(--${props.color})`
});
</script>

<style scoped>
.widht100 {
  width: 100%;
}

</style>