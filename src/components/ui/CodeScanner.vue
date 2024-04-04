<template>
  <div id="qr-code-full-region"></div>
</template>

<script setup>
import { Html5Qrcode } from "html5-qrcode"
import { onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['result']);

let html5QrCode; // No es necesario inicializar html5QrCode aquí

const props = defineProps({
  qrbox: {
    type: Number,
    default: 200
  },
  fps: {
    type: Number,
    default: 30
  }
});

function onScanSuccess(decodedText, decodedResult) {
  emit('result', decodedText, decodedResult);
}

onMounted(() => {
  const config = {
    fps: props.fps,
    qrbox: props.qrbox,
  };

  html5QrCode = new Html5Qrcode('qr-code-full-region');
  html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess);
});

onBeforeUnmount(() => {
  if (html5QrCode) {
    html5QrCode.stop()
    .then(() => {
    
    }).catch((err) => {
  
    });
  }
});
</script>