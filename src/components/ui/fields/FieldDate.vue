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
        :value="model"
        @selected="model = $event"
        :class="[{ 'mt-5': label }, { 'border-red': !isValid}]"
        :placeholder="placeholder"
        :use-utc="true"
        style="font-size: 1.1em;"
        :locale="es"
      ></datepicker>
      <div
        v-if="showPrepend" 
        class="flex align-center justify-center relative" 
        style="right: 20px; height: 40px; pointer-events: none;"
      >
        <slot name="prepend" @click.stop />
      </div>
    </div>
    <p v-if="!isValid" class="color-red font18 py-10">
      {{ noValidMsg }}
    </p>
  </div>
</template>

<script setup>
import Datepicker from 'vue3-datepicker'
import { es } from 'date-fns/locale'
import { computed } from "vue";

const emit = defineEmits(["input"]);

const props = defineProps({
    value: {
      default: ''
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
  
  const model = computed({
    get() {
      return props.value;
    },
    set(value) {
      emit("input", value);
    },
  });

</script>

<style lang="scss" scoped>
:deep(.v3dp__datepicker input) {
  border: 2px solid $gray !important;
  cursor: pointer;
  height: 40px;
}
</style>