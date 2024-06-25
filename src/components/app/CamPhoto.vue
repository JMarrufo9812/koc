<template>
  <div>
    <Camera ref="camera" :resolution="{ width: 375, height: 400 }" autoplay></camera>
    <button @click="snapshot">Create snapshot</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Camera from "simple-vue-camera";

 let camera = ref(null)

const snapshot = async () => {
  console.log(camera.value)
  const blob = await camera.value?.snapshot();
  console.log(blob)
  // // Para mostrar la captura de pantalla con una etiqueta de imagen, crear una URL
  const url = URL.createObjectURL(blob);
  console.log(url)
  // console.log(url); // Puedes usar esta URL para mostrar la imagen en un <img> o hacer otra cosa con ella
}

</script>