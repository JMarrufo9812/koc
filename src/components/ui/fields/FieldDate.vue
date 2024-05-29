<template>
  <div>
    <span :class="classLabel || 'font1-5em'" :for="name">
      {{ label }}
    </span>
    <div class="flex flex-middle">
      <div
        v-if="showAppend"  
        class="absolute flex align-center justify-center" 
        style="left: 0px; width: 35px; height: 100%;"
      >
        <slot name="append" />
      </div>
      <datepicker
        v-model="model"
        :class="[{ 'mt-5': label }, { 'border-red': !isValid}]"
        :placeholder="placeholder"
        style="font-size: 1.5em;"
        :locale="es"
        :name="name"
        ref="datepicker"
      ></datepicker>
      <div
        v-if="showPrepend" 
        class="flex align-center justify-center relative" 
        style="right: 20px; height: 40px; pointer-events: none;"
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
import { ref, watch, nextTick } from "vue";
import Datepicker from 'vue3-datepicker'
import { es } from 'date-fns/locale'
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: {
      default: "",
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    isValid: {
      type: Boolean,
      default: true
    },
    noValidMsg: {
      type: String,
      default: 'Este campo es requerido.'
    },
    label: {
      type: String,
      default: null
    },
    classLabel: {
      type: String,
      default: null
    },
    showPrepend: {
      type: Boolean,
      default: false
    },
    showAppend: {
      type: Boolean,
      default: false
    }
});

// const datepicker = ref(null);  

const model = computed({
  get() {
    return props.modelValue || null;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

watch(() => props.modelValue, () => {
  nextTick(() => {
    const input = document.querySelector(`input[name="${props.name}"]`);
    console.log(input)
    if (input) {
      input.blur();
    }
  });
});

</script>

<style lang="scss" scoped>
:deep(.v3dp__datepicker input) {
  border: 2px solid $gray !important;
  cursor: pointer;
  height: 40px;
  padding-left: 10px;
}
</style>