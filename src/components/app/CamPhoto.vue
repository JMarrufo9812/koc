<template>
  <div>
    <Camera ref="camera" :resolution="{ width: 375, height: 400 }" autoplay></camera>
    <button @click="snapshot">Create snapshot</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Camera from "simple-vue-camera";

import { blobToFile } from '@/utils'

 let camera = ref(null)

const emit = defineEmits(['charge']);

const snapshot = async () => {
  const blob = await camera.value?.snapshot();
  const url = URL.createObjectURL(blob);
  const file = await blobToFile(blob)

  emit('charge', { file, url, blob })
}

</script>