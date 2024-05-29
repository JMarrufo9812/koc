<template>
  <div>
    <span :class="classLabel || 'font1-3em'" :for="name">
      {{ label }}
    </span>
    <div class="flex flex-middle relative">
      <div
        v-if="showAppend"
        class="absolute flex flex-center flex-middle"
        style="left: 0px; width: 35px; height: 100%"
      >
        <slot name="append" />
      </div>
      <input
        v-model="model"
        :name="name"
        type="text"
        class="my-input back-white margin-bottom25 color-black"
        :class="[{ 'margin-top5': label }, { 'border-red': !isValid }]"
        :placeholder="placeholder"
        style="font-size: 1.3em; padding: 13px"
        :style="styles"
      />
      <div
        v-if="showPrepend"
        class="absolute flex flex-center flex-middle"
        style="right: 0px; width: 35px; height: 100%"
      >
        <slot name="prepend" />
      </div>
    </div>
    <p v-if="!isValid" class="color-red font18 py-10">
      {{ noValidMsg }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["input"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  noValidMsg: {
    type: String,
    default: "Este campo es requerido.",
  },
  label: {
    type: String,
    default: null,
  },
  classLabel: {
    type: String,
    default: null,
  },
  showPrepend: {
    type: Boolean,
    default: false,
  },
  showAppend: {
    type: Boolean,
    default: false,
  },
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const styles = computed(() => {
  let styles = "";

  if (props.showPrepend) {
    styles = `${styles} padding-right: 35px;`;
  }
  if (props.showAppend) {
    styles = `${styles} padding-left: 35px;`;
  }

  return styles;
});
</script>
