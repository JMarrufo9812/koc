<template>
  <div>
    <div v-if="loading" class="flex justify-center">
      <div style="margin-top: 40%">
        <Spinner style="color: --primary; position: relative; font-size: 2.5em;" />
      </div>
    </div>
    <Camera ref="camera" :resolution="{ width: 375, height: 400 }" autoplay @started="loading = false"></Camera>
    <div class="flex justify-center">
      <Button
        v-show="!loading"
        class="pt-20" 
        @click="snapshot"
      >
        <template #button-content>
          <div class="flex align-center">
            <span
              class="ion-camera text-white pr-5"
              style="font-size: 25px"
            ></span>
            <span class="font1-5em text-white">Capturar</span>
          </div>
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import Spinner from "@/components/ui/Spinner.vue"
import Camera from "simple-vue-camera";
import Button from "@/components/ui/Button.vue";

import { blobToFile } from '@/utils'

let camera = ref(null)

const loading = ref(true)

const emit = defineEmits(['charge']);

const snapshot = async () => {
  const blob = await camera.value?.snapshot();
  const url = URL.createObjectURL(blob);
  const file = await blobToFile(blob)

  emit('charge', { file, url, blob })
}

</script>