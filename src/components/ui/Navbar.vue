<template>
  <header class="background-navbar">
    <div class="flex justify-center pb-10">
      <img @click="handlerHome" src="@/assets/logos/koc_logo.png" alt="" class="cursor-pointer">
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

function handlerHome() {
  if(route.name === 'home') {
    window.location.reload();
  } else {
    router.push({ path: '/' })
  }
}

</script>

<style lang="scss">

.background-navbar {
  background: var(--primary);
}

img {
  height: 50px;
}

</style>