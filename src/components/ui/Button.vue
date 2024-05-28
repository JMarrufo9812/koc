<template>
  <div>
    <button
      class="my-btn text-uppercase widht100"
      :style="getColor"
      >
      <!-- style="box-shadow: 0 0 0 transparent !important" -->
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
  }
})

const getColor = computed(() => {
  if (props.disabled) {
    return `background: var(--gray)`  
  }
  return `background: var(--${props.color})`
});
</script>

<style scoped>
.widht100 {
  width: 100%;
}

</style>